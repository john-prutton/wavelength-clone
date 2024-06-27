import { create } from "zustand"
import { pb } from "../utils/pb"
import { RecordModel } from "pocketbase"

type GameStore = GameState & {
  id: string | undefined
  initialize: (gameId: string | undefined) => Promise<void>
  addPlayer: (playerName: Player["name"]) => Promise<void>
  removePlayer: (playerName: Player["name"]) => Promise<void>
  startGame: () => Promise<void>
}

const gameCollection = pb.collection<RecordModel & { state: GameState }>(
  "games"
)

export const useGameStore = create<GameStore>()((set, get) => ({
  id: undefined,
  players: [],
  currentPlayer: undefined,
  card: undefined,

  initialize: async (gameId) => {
    if (!gameId)
      return set({
        id: undefined,
        players: [],
        currentPlayer: undefined,
        card: undefined,
      })

    const game = await gameCollection.getOne(gameId).catch(() => undefined)
    if (!game) return set({ id: undefined, players: [] })

    set({ id: game.id, ...game.state })
  },

  addPlayer: async (playerName) => {
    const gameState = get()
    if (
      !gameState.id ||
      gameState.players.findIndex((p) => p.name === playerName) !== -1
    )
      return

    const newState: GameState = {
      ...gameState,
      players: [...gameState.players, { name: playerName, score: 0 }],
    }

    await gameCollection.update(gameState.id, { state: newState })

    set(newState)
  },

  removePlayer: async (playerName) => {
    const gameState = get()
    if (
      !gameState.id ||
      gameState.players.findIndex((p) => p.name === playerName) === -1
    )
      return

    if (gameState.currentPlayer === playerName)
      return alert(`${playerName} can't leave the game while it's their turn`)

    const newState: GameState = {
      ...gameState,
      players: gameState.players.filter((p) => p.name !== playerName),
    }

    await gameCollection.update(gameState.id, { state: newState })

    set(newState)
  },

  startGame: async () => {
    const gameState = get()
    if (!gameState.id || gameState.players.length < 2)
      return alert("You need at least 2 players to start the game")

    const cards = await pb.collection<RecordModel & Card>("cards").getFullList()
    const randomIndex = Math.floor(Math.random() * cards.length)
    const { left, right } = cards[randomIndex]

    const newState: GameState = {
      ...gameState,
      currentPlayer: gameState.players[0].name,
      card: { left, right },
    }

    await gameCollection.update(gameState.id, { state: newState })

    set(newState)
  },
}))
