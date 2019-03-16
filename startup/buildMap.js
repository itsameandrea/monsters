const City = require('../models/city')

module.exports = async (cities) => {
  try {
    const result = await City.insertMany(cities)
    await City.updateMany({}, { monsters: [], monstersLength: 0})
  } catch (error) {
    // console.log(error)
  }
}