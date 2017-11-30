import express from 'express'
import compression from 'compression'
import path from 'path'

import config from 'config'
import render from 'server/render'

const { PORT } = process.env

const server = express()

const stats = __ENV__ === 'production' ? require(path.join(config.distFolder, 'stats.json')) : {}

if (__ENV__ === 'development') {
  require('./webpack')(server)
}

if (__ENV__ === 'production') {
  server.use(compression())
  server.use('/dist', express.static(config.distFolder))
}

server.use('/assets', express.static(config.assetsFolder))
server.use(render(stats))

server.listen(PORT, () => {
  console.log(`> http://localhost:${PORT} - ${__ENV__}`) // eslint-disable-line
})
