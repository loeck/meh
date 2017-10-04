import { StatsWriterPlugin } from 'webpack-stats-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HappyPack from 'happypack'
import webpack from 'webpack'

import webpackConfig from './base'

export default {
  ...webpackConfig,

  output: {
    ...webpackConfig.output,
    filename: 'bundle-[hash].js',
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
          use: ['css-loader', 'sass-loader', 'autoprefixer-loader'],
        }),
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    ...webpackConfig.plugins,

    new HappyPack({ loaders: ['babel-loader?sourceMap'], verbose: false }),

    new ExtractTextPlugin('styles-[hash].css'),

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
}
