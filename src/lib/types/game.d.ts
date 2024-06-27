type GameState = {
  players: Player[]
  currentPlayer: string | undefined
  card: Card | undefined
}

type Player = {
  name: string
  score: number
}

type Card = {
  left: string
  right: string
}
