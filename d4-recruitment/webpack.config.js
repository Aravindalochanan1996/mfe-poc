const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index',
  output: {
    publicPath: 'http://localhost:3002/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
  devServer: {
    port: 3002,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'recruitmentMfe',
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
