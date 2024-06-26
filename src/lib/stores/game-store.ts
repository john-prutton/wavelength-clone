import { create } from "zustand"
import { pb } from "../utils/pb"
import { RecordModel } from "pocketbase"

type GameStore = GameState & {
  id: string | undefined
  initialize: (gameId: string | undefined) => Promise<void>
  addPlayer: (playerName: Player["name"]) => Promise<void>
  removePlayer: (playerName: Player["name"]) => Promise<void>
}

const gameCollection = pb.collection<RecordModel & { state: GameState }>(
  "games"
)

export const useGameStore = create<GameStore>()((set, get) => ({
  id: undefined,
  players: [],

  initialize: async (gameId) => {
    if (!gameId) return set({ id: undefined, players: [] })

    const game = await gameCollection.getOne(gameId).catch(() => undefined)
    if (!game) return set({ id: undefined, players: [] })

    set({ id: game.id, players: game.state.players })
  },

  addPlayer: async (playerName) => {
    const { players, id } = get()
    if (!id || players.findIndex((p) => p.name === playerName) !== -1) return

    const newState: GameState = {
      players: [...players, { name: playerName, score: 0 }],
    }

    await gameCollection.update(id, { state: newState })

    set(() => {
      return newState
    })
  },

  removePlayer: async (playerName) => {
    const { players, id } = get()
    if (!id || players.findIndex((p) => p.name === playerName) === -1) return

    const newState: GameState = {
      players: players.filter((p) => p.name !== playerName),
    }

    await gameCollection.update(id, { state: newState })

    set(() => {
      return newState
    })
  },
}))
