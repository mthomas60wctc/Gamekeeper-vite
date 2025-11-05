export function Game(name, minPlayers, maxPlayers) {
  this.name = name
  this.minPlayers = minPlayers
  this.maxPlayers = maxPlayers
}

export function Player(name) {
  this.name = name
  this.wins = {}
  this.plays = {}
}

export function Instance(game, players) {
  this.game = game
  this.players = players // array of Player objects
  this.date = new Date()
}

export const GamesList = [
    new Game('Chess', 2, 2),
    new Game('Monopoly', 2, 6),
    new Game('Catan', 3, 4),
    new Game('Poker', 2, 10),
    new Game('Uno', 2, 10),
    new Game('Scrabble', 2, 4),
    new Game('Ticket to Ride', 2, 5),
    new Game('Dominion', 2, 4),
    new Game('Risk', 2, 6),
    new Game('Pandemic', 2, 4),
]

export const PlayersList = [
    new Player('Alice'),
    new Player('Bob'),
    new Player('Charlie'),
    new Player('Diana'),
    new Player('Evan'),
    new Player('Fiona'),
    new Player('George'),
    new Player('Hannah'),
    new Player('Ian'),
    new Player('Julia'),
]

// Helper to create a player record suitable for table rows
export function createPlayerRecord(name) {
  const p = new Player(name)
  // gameplay-specific fields used by the tables
  p.scores = []
  p.currentRound = 0
  p.total = 0
  return p
}

// Helper to create an Instance from a game name and an array of player names
export function createInstanceFromNames(gameName, playerNames = []) {
  const game = GamesList.find(g => g.name === gameName) || new Game(gameName, 0, 999)
  const players = playerNames.map(n => createPlayerRecord(n))
  return new Instance(game, players)
}