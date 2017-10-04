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
        use: 'happypack/loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'autoprefixer-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    ...webpackConfig.plugins,
    new HappyPack({ loaders: ['babel-loader'], verbose: false }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
