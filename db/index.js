const mongoose = require('mongoose')

module.exports = async function () {
  await mongoose.connect('mongodb://localhost/monsters', { useNewUrlParser: true })
}