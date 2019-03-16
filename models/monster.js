const mongoose = require('mongoose')

const monsterSchema = new mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  },
  name: {
    type: String
  }
})

const Monster = mongoose.model('Monster', monsterSchema)

module.exports = Monster