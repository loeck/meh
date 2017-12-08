import { StatsWriterPlugin } from 'webpack-stats-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HappyPack from 'happypack'
import merge from 'webpack-merge'
import webpack from 'webpack'

import loaderOptions from './loaderOptions'
import webpackConfig from './base'

export default merge.strategy({
  entry: 'prepend',
})(webpackConfig, {
  output: {
    filename: '[name]-[chunkhash].js',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: loaderOptions.cssLoader,
            },
            {
              loader: 'postcss-loader',
              options: loaderOptions.postcssLoader,
            },
            {
              loader: 'sass-loader',
              options: loaderOptions.sassLoader,
            },
          ],
        }),
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HappyPack({ loaders: ['babel-loader?sourceMap'], verbose: false }),

    new ExtractTextPlugin('styles-[chunkhash].css'),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: m => /node_modules/.test(m.context),
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),

    new StatsWriterPlugin({
      transform: data =>
        JSON.stringify({
          main: data.assetsByChunkName.main[0],
          styles: data.assetsByChunkName.main[1],
          vendor: data.assetsByChunkName.vendor,
          manifest: data.assetsByChunkName.manifest,
        }),
    }),
  ],

  stats: {
    colors: true,
    reasons: false,
    hash: false,
    version: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false,
  },
})
