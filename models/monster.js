const mongoose = require('mongoose')

const monsterSchema = new mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  }
})

const Monster = mongoose.model('Monster', monsterSchema)

module.exports = Monster