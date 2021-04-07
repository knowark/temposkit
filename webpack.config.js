const path = require('path')
const { DefinePlugin, EnvironmentPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development'
  const target = env.TARGET

  const config = {
    mode: argv.mode,
    entry: {
      'index': './src/index.js',
      'lib/show': './src/components/show/index.js',
      'showcase/index': './src/showcase/index.js',
    },
    optimization: {
      runtimeChunk: 'single',
      moduleIds: 'deterministic'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'tempos'
      }),
      new DefinePlugin({
        PRODUCTION: !devMode,
        VERSION: JSON.stringify(require('./package.json').version),
        TARGET: JSON.stringify(target)
      }),
      new EnvironmentPlugin({
        ARK_DESIGN: 'material'
      })
    ],
    module: {
      rules: [
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        base: 'componark/src/base/',
        components: 'componark/src/components/'
      }
    }
  }

  if (devMode) {
    config.devServer = {
      contentBase: './dist',
      historyApiFallback: true,
      port: 7890
    }
  }

  return config
}
