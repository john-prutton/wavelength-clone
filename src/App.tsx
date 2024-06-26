import { Game } from "@/components/game"
import { useEffect } from "react"
import { useGameStore } from "./lib/stores/game-store"

export default function App() {
  const { initialize } = useGameStore()

  const gameId =
    new URLSearchParams(window.location.search).get("game-id") ?? undefined

  useEffect(() => {
    if (!gameId) return

    initialize(gameId)
  }, [initialize, gameId])

  if (!gameId) {
    return <div>error no game id found</div>
  }

  return <Game />
}
