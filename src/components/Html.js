import React from 'react'
import serialize from 'serialize-javascript'

const Html = ({ content, state, stats: { styles, main = 'bundle.js' } }) => (
  <html lang="en">
    <head>
      <title>meh</title>

      <meta charSet="utf-8" />
      <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />

      {styles && <link href={`/dist/${styles}`} rel="stylesheet" />}

      <script
        dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${serialize(state)}` }} // eslint-disable-line react/no-danger
      />
    </head>
    <body>
      <div
        id="root"
        dangerouslySetInnerHTML={{ __html: content }} // eslint-disable-line react/no-danger
      />
      <script src={`/dist/${main}`} />
    </body>
  </html>
)

export default Html
