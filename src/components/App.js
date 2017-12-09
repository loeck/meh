import React from 'react'

import { injectGlobal } from 'styled-components'
import { Switch, Route } from 'react-router'
import { Provider } from 'react-redux'

import routes from 'routes'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * {
    -webkit-font-smoothing: antialiased;
    background: transparent;
    border: none;
    box-sizing: border-box;
    color: inherit;
    font: inherit;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13px;
  }
`

export default (store, Router, routerProps) => (
  <Provider store={store}>
    <Router {...routerProps}>
      <Switch>{routes.map(route => <Route key={route.path} {...route} />)}</Switch>
    </Router>
  </Provider>
)
