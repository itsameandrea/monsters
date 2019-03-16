const initializeDb = require ('./db')
const parseFile = require('./startup/fileParser')
const buildMap = require('./startup/buildMap')
const startGame = require('./game/start')
const errorHandling = require('./errors')

async function init () {
  errorHandling()
  await initializeDb()
  const cities = await parseFile()
  await buildMap(cities)
  await startGame()
}

init()