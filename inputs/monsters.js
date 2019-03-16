let readline = require('readline')
const Monster = require('../models/monster')
const City = require('../models/city')

module.exports = () => {
  readline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  const question = 'Hello my lord. How many monster do you want to unleash today?'
  readline.question(question, async (monsters) => {
    console.log(`${monsters} monsters will be unleashed.`)
    
    readline.close()

    await createMonsters(monsters)

    return Promise.resolve()
  })
}

const createMonsters = async (monsters) => {
  console.log('Creating monsters...')

  const count = await City.countDocuments()
  let loop = 0

  while (loop < monsters) {
    const random = Math.floor(Math.random() * count)

    let city = await City.findOne().skip(random)

    const monster = await new Monster({ city }).save()
    
    city.monsters.push(monster)
    city.monstersLength+=1

    city = await city.save()
 
    loop++
  }
}