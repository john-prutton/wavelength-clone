import { usePlayerName } from "@/lib/hooks/use-player-name"
import { useGameStore } from "@/lib/stores/game-store"
import { Button } from "../ui/button"

export function PlayersTab() {
  const { players, removePlayer, addPlayer } = useGameStore()
  const { playerName } = usePlayerName()

  return (
    <section className="bg-muted rounded p-4 w-80 space-y-2">
      <h2 className="text-xl font-bold mb-4">Players</h2>
      {players
        .sort((a, b) => b.score - a.score)
        .map((player) => (
          <div
            key={player.name}
            className="flex items-center border border-white/10 p-2 rounded"
          >
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

      {players.findIndex((p) => p.name === playerName) === -1 && (
        <Button onClick={() => addPlayer(playerName)}>Join game</Button>
      )}
    </section>
  )
}
