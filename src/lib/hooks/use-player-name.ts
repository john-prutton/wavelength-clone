import { useState } from "react"

export function usePlayerName() {
  const [playerName, setPlayerName] = useState<Player["name"] | undefined>(
    localStorage.getItem("playerName") ?? undefined
  )

  if (!playerName) {
    const promptPlayerName =
      prompt(`Enter your username:`) ??
      `player@${Date.now().toString(36).substring(0, 5).toUpperCase()}`

    setPlayerName(promptPlayerName)
    localStorage.setItem("playerName", promptPlayerName)
  }

  return { playerName }
}
