import HappyPack from 'happypack'
import webpack from 'webpack'

import webpackConfig from './base'

export default {
  ...webpackConfig,

  devtool: 'eval',

  entry: ['react-hot-loader/patch', ...webpackConfig.entry, 'webpack-hot-middleware/client'],

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'happypack/loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'autoprefixer-loader'],
      },
    ],
  },

  plugins: [
    ...webpackConfig.plugins,
    new HappyPack({ loaders: ['babel-loader'] }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
