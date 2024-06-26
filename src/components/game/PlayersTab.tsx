import { usePlayerName } from "@/lib/hooks/use-player-name"
import { useGameStore } from "@/lib/stores/game-store"
import { Button } from "../ui/button"

export function PlayersTab() {
  const { players, removePlayer, addPlayer, currentPlayer, startGame } =
    useGameStore()
  const { playerName } = usePlayerName()

  return (
    <section className="bg-muted rounded p-4 w-80 h-svh">
      <h2 className="text-xl font-bold mb-4">Players</h2>

      <div className="space-y-2">
        {[...players]
          .sort((a, b) => b.score - a.score)
          .map((player) => (
            <div
              key={player.name}
              className="flex items-center border border-white/10 p-2 rounded"
            >
              {currentPlayer === player.name && (
                <span className="text-primary-foreground mr-2">🎲</span>
              )}
              <span className="text-lg">{player.name}</span>
              <span className="text-muted-foreground ml-2">
                {player.score} points
              </span>
              <Button
                className="ml-auto"
                onClick={() => removePlayer(player.name)}
                variant="destructive"
                size="sm"
              >
                {player.name === playerName ? "Leave" : "Kick"}
              </Button>
            </div>
          ))}
      </div>

      {players.findIndex((p) => p.name === playerName) === -1 && (
        <Button className="w-full mt-8" onClick={() => addPlayer(playerName)}>
          Join game
        </Button>
      )}

      {players.length > 1 && !currentPlayer && (
        <Button className="w-full mt-8" onClick={startGame}>
          Start game
        </Button>
      )}
    </section>
  )
}
