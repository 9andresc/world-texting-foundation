import routesList from 'express-routes-catalogue'

import app from './app'

function listen(port: number) {
  return new Promise((resolve, reject) => {
    app.listen(port).once('listening', resolve).once('error', reject)
  })
}

async function startServer() {
  try {
    const port = process.env.PORT || 3000
    await listen(Number(port))
    console.log(`Server listening at 127.0.0.1:${port}`)
    routesList.terminal(app)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

process.on('uncaughtException', (error) => {
  console.error(error)
})
process.on('unhandledRejection', (error) => {
  console.error(error)
})

startServer()
