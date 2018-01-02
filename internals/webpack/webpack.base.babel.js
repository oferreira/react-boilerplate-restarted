/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path')
const webpack = require('webpack')
const { SITE_NAME } = require('../utils/site')

// Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
// 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
// see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
// in the next major version of loader-utils.'
process.noDeprecation = true

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  externals: {
    config: 'config',
  },
  module: {
    rules: [
      {
        test: /\.ya?ml$/,
        use: {
          loader: 'yaml-import-loader',
          // Note: The options below are the default options
          options: {
            // Allows !import <file> without key. When using this the
            // targets file content will be inserted at the import location.
            importRoot: false,
            // Allows !import <file> with key. Set this and importRoot to
            // false for a regular yaml-loader.
            importNested: true,
            // The import keyword: `!${importKeyword} <file>` for yaml/json
            // contents
            importKeyword: 'import',
            // The import-raw keyword: `!${importRawKeyword} <file>` for raw
            // file contents
            importRawKeyword: 'import-raw',
            // Output type. Can be 'object', 'json', or 'yaml'
            // 'object' -> exported js object
            // 'json'   -> stringified json
            // 'yaml'   -> stringified yaml
            output: 'object',
            // The options below are passed to js-yaml.
            parser: {
              // Allows adding custom types, details below.
              types: [],
              // Base schema to extend, can be an array of schemas.
              schema: require('js-yaml').SAFE_SCHEMA,
              // Allows a duplicate key. The old value in a duplicate key
              // will be overwritten (json option in js-yaml).
              allowDuplicate: true,
              // function to call on warning messages. Parser will throw on
              // warnings if this function is not provided.
              onWarning: undefined,
            },
          },
        },
      },
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
  ]),
  resolve: {
    modules: [path.resolve(process.cwd(), 'config'), path.resolve(process.cwd(), 'src'), path.resolve(process.cwd(), 'node_modules'), path.resolve(process.cwd(), `sites/${SITE_NAME}`)],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
})
