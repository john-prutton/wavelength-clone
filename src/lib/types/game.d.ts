type GameState = {
  players: Player[]
  currentPlayer: string | undefined
}

type Player = {
  name: string
  score: number
}
