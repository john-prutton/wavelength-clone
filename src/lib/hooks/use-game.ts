import { pb } from "@/lib/utils/pb"
import { useGameStore } from "@/lib/stores/game-store"

export function useGame(gameId: string) {
  const { initialize } = useGameStore()

  const updateGameState = (data: GameState) => {
    pb.collection("games").update(gameId!, { state: data })
    initialize(data)
  }

  return { updateGameState }
}
