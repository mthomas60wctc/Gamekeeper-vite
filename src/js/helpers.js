// Find a player record or create it, return player.

export function addAndGetPlayer(records, playerName) {
  let p = records.find(r => r.name === playerName)
  if (!p) {
    p = { name: playerName, wins: {}, plays: {} }
    records.push(p)
  }
  return p
}

//Ensure the per-game keys exist and return the per-game objects.
export function addGameStats(player, game) {
  if (!player.wins) player.wins = {}
  if (!Object.prototype.hasOwnProperty.call(player.wins, game)) player.wins[game] = 0
  if (!player.plays) player.plays = {}
  if (!Object.prototype.hasOwnProperty.call(player.plays, game)) player.plays[game] = 0
}

//Increment plays for player/game. Optionally pass count (default 1).

export function addPlays(records, playerName, game, count = 1) {
  const player = addAndGetPlayer(records, playerName)
  addGameStats(player, game)
  player.plays[game] = (Number(player.plays[game]) || 0) + count
}

//Increment wins for player/game. Optionally pass count (default 1).

export function addWins(records, playerName, game, count = 1) {
  const player = addAndGetPlayer(records, playerName)
  addGameStats(player, game)
  player.wins[game] = (Number(player.wins[game]) || 0) + count
}