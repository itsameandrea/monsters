const createMonsters = require('../inputs/monsters')
const Monster = require('../models/monster')
const City = require('../models/city')

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

  console.log('THE END')
}

async function eraseCityFromMap (city) {
  return new Promise(async (resolve, reject) => {
    await City.deleteOne({ _id: city._id })
    const names = city.monsters.map((mon) => mon.name).join(', ')
    console.log(`${city.name}(${city._id}) has been destroyed by ${names}`)

    const cities = await City.find({ $or: [
      { north: city.name },
      { east: city.name },
      { west: city.name },
      { south: city.name }
    ]})

    cities.forEach(async (c) => {
      if (c.north === city.name) {
        c.north = undefined
      } else if (c.east === city.name) {
        c.east = undefined
      } else if (c.west === city.name) {
        c.west = undefined
      } else {
        c.south = undefined
      }
      
      await c.save()

      resolve()
    })
  })
}

async function killMonsters (city) {
  return new Promise(async (resolve, reject) => {    
    city.monsters.forEach(async (monster) => {
      await Monster.deleteOne({_id: monster._id})
      console.log(`${monster.name} has died in the battle`)
    })

    resolve()
  })
}

async function moveMonsters () {
  return new Promise(async (resolve, reject) => {
    const monsters = await Monster.find()

    monsters.forEach(async (monster) => {
      if (monster.city) {
        const directions = []

        
        const exist = await City.countDocuments({_id: monster.city._id})

        if (exist > 0) {
          const currentCity = await City.findById(monster.city._id)
          currentCity.monsters = currentCity.monsters.filter((m) => m._id !== monster._id)
          currentCity.monstersLength -= 1
        }

        if (monster.city.north) directions.push(monster.city.north)
        if (monster.city.east) directions.push(monster.city.east)
        if (monster.city.west) directions.push(monster.city.west)
        if (monster.city.south) directions.push(monster.city.south)

        const random = Math.floor(Math.random() * directions.length)

        if (random) {
          const next = directions[random]

          const city = await City.findOne({ name: next })

          monster.city = {_id: city._id}
          
          await monster.save()
          
          city.monsters.push(monster)
          city.monstersLength+=1

          await city.save()
        }
      }
    })

    resolve()
  })
}

async function playRound () {
  return new Promise(async (resolve, reject) => {
    const cities = await City.find({ monstersLength: { $gt: 1 }}).populate('monsters', 'name')
    const monsters = await Monster.find().populate('city', 'north east west south')
    
    cities.forEach(async (city) => {
      await eraseCityFromMap(city, monsters)
      await killMonsters(city)
    })

    await moveMonsters(monsters)
    resolve()
  })
}