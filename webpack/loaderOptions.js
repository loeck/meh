import fs from 'fs'

import paths from './paths'

import * as globals from '../src/globals'
import config from '../src/config'

// Load global functions, variables in SASS files
const sassFiles = config.globalSassFiles
  .map(p => fs.readFileSync(`${paths.styles}/${p}`).toString())
  .join('\n')

const postcssPlugins = [
  require('autoprefixer')({ browsers: ['last 4 versions'] }),
  require('postcss-pxtorem'),
]

if (globals.__ENV__ === 'production') {
  postcssPlugins.push(require('cssnano')())
}

export default {
  cssLoader: {
    modules: true,
    importLoaders: 2,
  },
  sassLoader: {
    data: `
      $env: '${globals.__ENV__}';
      $images-folder: '${config.imagesFolder}';
      $fonts-folder: '${config.fontsFolder}';

      ${sassFiles}
    `,
    includePaths: [paths.styles],
  },
  postcssLoader: {
    plugins: postcssPlugins,
  },
}
