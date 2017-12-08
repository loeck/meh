import HappyPack from 'happypack'
import webpack from 'webpack'
import merge from 'webpack-merge'

import paths from './paths'
import loaderOptions from './loaderOptions'
import webpackConfig from './base'

export default merge.strategy({
  entry: 'prepend',
})(webpackConfig, {
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
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: loaderOptions.cssLoader,
          },
          {
            loader: 'sass-loader',
            options: loaderOptions.sassLoader,
          },
          {
            loader: 'postcss-loader',
            options: loaderOptions.postcssLoader,
          },
        ],
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
