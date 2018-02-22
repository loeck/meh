import React from 'react'
import { renderToString, renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { StaticRouter } from 'react-router'
import { matchPath } from 'react-router-dom'

import routes from 'routes'
import createStore from 'store'

import Html from 'components/Html'
import App from 'components/App'

export default stats => async (req, res) => {
  try {
    const store = createStore()

    const context = {}
    const promises = []

    const sheet = new ServerStyleSheet()

    routes.some(route => {
      const match = matchPath(req.url, route)
      if (match && route.load) {
        promises.push(route.load(store))
      }
      return match
    })

    await Promise.all(promises)

    const Component = App(store, StaticRouter, { location: req.url, context })

    const content = renderToString(sheet.collectStyles(Component))
    const styles = __DEV__ ? '' : sheet.getStyleElement()
    const page = <Html stats={stats} state={store.getState()} styles={styles} content={content} />

    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(page))

    res.write('<!doctype html>')

    stream.pipe(res, { end: false })
    stream.on('end', () => res.end())
  } catch (err) {
    res.status(500).send(err.stack)
  }
}
