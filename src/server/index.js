import express from 'express'
import compression from 'compression'
import path from 'path'

import config from 'config'
import render from 'server/render'

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

server.listen(config.port, 'localhost', () => {
  console.log(`> http://localhost:${config.port} - ${__ENV__}`) // eslint-disable-line
})
