import { useGame } from "@/lib/hooks/use-game"
import { usePlayerName } from "@/lib/hooks/use-player-name"

export function Game({ gameId }: { gameId: string }) {
  const { gameState, updateGameState } = useGame(gameId)
  const { playerName } = usePlayerName()

  if (!gameState) {
    return <div>error no game found</div>
  }

  if (!playerName) return <div>setting player name...</div>

  if (!gameState.players.find((p) => p.name === playerName)) {
    updateGameState({
      ...gameState,
      players: [...gameState.players, { name: playerName, score: 0 }],
    })
  }

  return <div></div>
}
