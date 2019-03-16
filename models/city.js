const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  north: {
    type: String
  },
  east: {
    type: String
  },
  south: {
    type: String
  },
  west: {
    type: String
  },
  monstersLength: {
    type: Number,
    default: 0
  },
  monsters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Monster'}]
})

citySchema.plugin(uniqueValidator)

const City = mongoose.model('City', citySchema)

module.exports = City