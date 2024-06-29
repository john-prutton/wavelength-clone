import { useEffect } from "react"
import { Board } from "./Board"
import { PlayersTab } from "./PlayersTab"
import { pb } from "@/lib/utils/pb"
import { useGameStore } from "@/lib/stores/game-store"
import { RecordModel } from "pocketbase"

export function Game() {
  const { id, handleUpdate } = useGameStore()
  useEffect(() => {
    if (!id) return

    const unsubscribe = pb
      .collection<RecordModel & { state: Omit<GameState, "id"> }>("games")
      .subscribe(id, (update) => {
        if (update.action !== "update") return

        handleUpdate(update.record.state)
      })

    return () => {
      unsubscribe.then((res) => res())
    }
  })
  return (
    <main className="flex flex-row">
      <PlayersTab />
      <Board />
    </main>
  )
}
