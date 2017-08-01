import webpack from 'webpack'
import path from 'path'

import * as globals from '../src/globals'

export default {
  entry: ['babel-polyfill', './src/client'],

  resolve: {
    modules: ['../src', '../node_modules'].map(p => path.resolve(__dirname, p)),
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },

  plugins: [
    new webpack.DefinePlugin({
      ...globals,
      __BROWSER__: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify(globals.__ENV__),
    }),
  ],
}
