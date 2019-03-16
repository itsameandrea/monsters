module.exports = () => {
  process.on('uncaughtException', (error) => {
    console.log(error.message)
    process.exit(1)
  })
  
  process.on('unhandledRejection', function(error){
    console.log(error.message)
    process.exit(1)
  })
}