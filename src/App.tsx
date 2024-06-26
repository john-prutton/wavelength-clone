import { Game } from "./components/Game"

function App() {
  const searchParams = new URLSearchParams(window.location.search)
  const gameId = searchParams.get("game-id") ?? undefined

  if (!gameId) {
    return <div>error no game id found</div>
  }

  return <Game gameId={gameId} />
}

export default App
