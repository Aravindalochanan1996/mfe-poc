const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? false : 'eval-source-map',
  entry: './src/index',
  output: {
    publicPath: 'http://localhost:3001/',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 3001,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'financeMfe',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
        './navConfig': './src/navConfig',
      },
      shared: {
        react: { singleton: true, requiredVersion: false, eager: false },
        'react-dom': { singleton: true, requiredVersion: false, eager: false },
        'react-router-dom': { singleton: true, requiredVersion: false, eager: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/config.js', to: 'config.js' }],
    }),
  ],
};
