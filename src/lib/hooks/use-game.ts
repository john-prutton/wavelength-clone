import { pb } from "@/lib/utils/pb"
import { useEffect, useState } from "react"

export function useGame(gameId: string | undefined) {
  const [gameState, setGameState] = useState<GameState | undefined>(undefined)

  const onGameStateChange = (data: GameState) => setGameState(data)
  const updateGameState = (data: GameState) => {
    pb.collection("games").update(gameId!, { state: data })
  }

  useEffect(() => {
    if (!gameId) return setGameState(undefined)

    pb.collection("games").subscribe(gameId, ({ action, record }) => {
      if (action === "update") {
        onGameStateChange(record.state)
      } else if (action === "delete") {
        setGameState(undefined)
      }
    })

    pb.collection("games")
      .getOne(gameId)
      .then(({ state }) => setGameState(state))
      .catch((e) => {
        console.log(e)
        setGameState(undefined)
      })
  }, [gameId])

  return { gameState, updateGameState }
}
