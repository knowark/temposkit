const path = require('path')
const { DefinePlugin, EnvironmentPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development'
  const target = env.TARGET
  const apiUrl = (devMode ? 'https://api.tempos.local/graphql' : 
    'https://api.tempos.local/graphql')

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
        TARGET: JSON.stringify(target),
        API_URL: JSON.stringify(apiUrl)
      }),
      new EnvironmentPlugin({
        ARK_DESIGN: 'ark'
      })
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  outputStyle: devMode ? 'expanded': 'compressed',
                  includePaths: ['./node_modules']
                }
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        },
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
        common: 'componark/src/common/',
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
