import React from 'react'

import { renderToString, renderToStaticMarkup } from 'react-dom/server'
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

    routes.some(route => {
      const match = matchPath(req.url, route)
      if (match && route.load) {
        promises.push(route.load(store))
      }
      return match
    })

    await Promise.all(promises)

    const Component = App(store, StaticRouter, { location: req.url, context })

    const page = <Html stats={stats} state={store.getState()} content={renderToString(Component)} />

    res.end(`<!doctype html>${renderToStaticMarkup(page)}`)
  } catch (err) {
    res.status(500).send(err.stack)
  }
}
