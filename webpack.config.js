const path = require('path')
const { DefinePlugin, EnvironmentPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development'
  const target = env.TARGET
  const apiUrl = (devMode ? 'http://api.tempos.local/graphql' : 
    'https://api.tempos.shop/graphql')

  const config = {
    mode: argv.mode,
    entry: {
      'temposkit': './src/index.js',
      'showcase': './src/showcase/index.js',
      'components/show': './src/components/show/index.js',
    },
    output: {
      library: 'temposkit',
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].min.js',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'tempos',
        chunks: ['showcase'],
        template: 'src/showcase/index.html'
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
          test: /\.(png|jpg|gif)$/,
          type: 'asset/resource'
        },
        {
          test: /\.svg/,
          type: 'asset/inline'
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[ext]',
          }
        }
      ]
    },
    resolve: {
      alias: {
        common: path.resolve(__dirname, 'src/common/'),
        base: 'componark/src/base/',
        components: 'componark/src/components/'
      }
    }
  }

  if (devMode) {
    config.devServer = {
      contentBase: './dist',
      historyApiFallback: true,
      port: 7788
    }
  }

  return config
}
