export function usePlayerName() {
  let playerName = localStorage.getItem("playerName") ?? undefined

  if (!playerName) {
    playerName =
      prompt(`Enter your username:`) ??
      `player@${Date.now().toString(36).substring(0, 5).toUpperCase()}`

    localStorage.setItem("playerName", playerName)
  }

  return { playerName }
}
