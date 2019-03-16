const createMonsters = require('../inputs/monsters')
const Monster = require('../models/monster')
const City = require('../models/city')
const playRound = require('./round')

module.exports = async () => {
  await createMonsters()

  for(let round = 0, p = Promise.resolve(); round < 10000; round++) {
    p = p.then(() => new Promise (async (resolve) => {
      await playRound()
      const monsters = await Monster.countDocuments()
      if (monsters === 0) round = 10000
      resolve()
    }))
  }
}