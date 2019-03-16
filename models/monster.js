const mongoose = require('mongoose')

const monsterSchema = new mongoose.Schema({
  city: {
    type: Object
  }
})

const Monster = mongoose.model('Monster', monsterSchema)

module.exports = Monster