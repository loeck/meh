import HappyPack from 'happypack'
import webpack from 'webpack'
import merge from 'webpack-merge'

import webpackConfig from './base'

export default merge(webpackConfig, {
  devtool: 'eval',

  entry: {
    app: ['react-hot-loader/patch', ...webpackConfig.entry, 'webpack-hot-middleware/client'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'happypack/loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HappyPack({ loaders: ['babel-loader'], verbose: false }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
})
