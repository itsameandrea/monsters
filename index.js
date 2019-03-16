const initializeDb = require ('./db')
const parseFile = require('./startup/fileParser')
const buildMap = require('./startup/buildMap')
const createMonsters = require('./inputs/monsters')
const startGame = require('./game/start')

async function init () {
  await initializeDb()
  const cities = await parseFile()
  await buildMap(cities)
  await createMonsters()
  await startGame()
}

init()