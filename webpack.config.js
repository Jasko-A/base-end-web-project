const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const outputDirectory = 'dist';

console.log(__dirname);
module.exports = {
  entry: {
    'bundle.js': [
      path.resolve(__dirname, 'src/client/index.jsx'),
      'webpack/hot/dev-server'
    ]
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
  },
  // entry: ['babel-polyfill', './src/client/index.js'],
  // output: {
  //   path: path.join(__dirname, outputDirectory),
  //   filename: 'bundle.js'
  // },

  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  
  devServer: {
    port: 3000,
    open: true,
    inline: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    },
    contentBase: path.join(__dirname, "dist"),
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()  
  ]
};