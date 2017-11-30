import React from 'react'
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript'

import webpackConfig from '../../webpack/base'

const Html = ({
  content,
  lang,
  state,
  stats: { styles, main = webpackConfig.output.filename },
  title,
}) => (
  <html lang={lang}>
    <head>
      <title>{title}</title>

      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

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

Html.defaultProps = {
  lang: 'en',
  title: 'Meh',
  content: '',
  state: {},
  stats: {},
}

Html.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  state: PropTypes.object,
  stats: PropTypes.shape({
    main: PropTypes.string,
    styles: PropTypes.string,
  }),
}

export default Html
