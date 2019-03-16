const LineByLineReader = require('line-by-line')
const readerStream = new LineByLineReader('./maps/world_map_small.txt')

module.exports = () => {
  return new Promise((resolve, reject) => {
    const cities = []

    readerStream
      .on('error', (err) => reject(err))
      .on('line', async (line) => {
          const cityDetails = line.split(' ')

          const city = {
            name: cityDetails.shift()
          }

          cityDetails.forEach(chunk => {
            const directions = chunk.split('=')
            city[directions[0]] = directions[1]
          })

          cities.push(city)
      })
      .on('end', () => {
        resolve(cities)
      })
  })
}