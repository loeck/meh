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
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'autoprefixer-loader'],
      },
    ],
  },

  plugins: [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
