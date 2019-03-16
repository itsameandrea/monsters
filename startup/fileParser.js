const fs = require('fs')

module.exports = () => {
  return new Promise((resolve, reject) => {
    let lines = fs.readFileSync('./maps/world_map_small.txt', 'utf8').split('\n')
    
    lines = lines.filter((line) => line.trim() !== '')

    const cities = lines.map((line) => {
      if (line.trim() !== '') {
        const cityDetails = line.split(' ')
        
        const city = {
          name: cityDetails.shift()
        }

        cityDetails.forEach(chunk => {
          const directions = chunk.split('=')
          city[directions[0]] = directions[1]
        })
  
        return city
      }
    })
    resolve(cities)
  })
}