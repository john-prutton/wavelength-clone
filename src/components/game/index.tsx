import { Board } from "./Board"
import { PlayersTab } from "./PlayersTab"

export function Game() {
  return (
    <main className="flex flex-row">
      <PlayersTab />
      <Board />
    </main>
  )
}
