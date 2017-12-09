import React from 'react'

import PropTypes from 'prop-types'
import serialize from 'serialize-javascript'

import defaultStyles from 'helpers/defaultStyles'

import webpackConfig from '../../webpack/base'

const Html = ({
  content,
  lang,
  state,
  styles,
  stats: { main = webpackConfig.output.filename, vendor, manifest },
  title,
}) => (
  <html lang={lang}>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
      <style
        dangerouslySetInnerHTML={{ __html: defaultStyles }} // eslint-disable-line react/no-danger
      />
      {styles}
      <script
        dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${serialize(state)}` }} // eslint-disable-line react/no-danger
      />
    </head>
    <body>
      <div
        id="root"
        dangerouslySetInnerHTML={{ __html: content }} // eslint-disable-line react/no-danger
      />
      {manifest && <script src={`/dist/${manifest}`} />}
      {vendor && <script src={`/dist/${vendor}`} />}
      <script src={`/dist/${main}`} />
    </body>
  </html>
)

Html.defaultProps = {
  content: '',
  lang: 'en',
  state: {},
  stats: {},
  styles: null,
  title: 'Meh',
}

Html.propTypes = {
  content: PropTypes.string,
  lang: PropTypes.string,
  state: PropTypes.object,
  stats: PropTypes.shape({
    main: PropTypes.string,
    vendor: PropTypes.string,
    manifest: PropTypes.string,
  }),
  styles: PropTypes.element,
  title: PropTypes.string,
}

export default Html
