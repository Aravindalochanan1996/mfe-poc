const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index",
  output: {
    publicPath: "http://localhost:3000/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        financeMfe: "financeMfe@http://localhost:3001/remoteEntry.js",
        recruitmentMfe: "recruitmentMfe@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: false, eager: false },
        "react-dom": { singleton: true, requiredVersion: false, eager: false },
        "react-router-dom": { singleton: true, requiredVersion: false, eager: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public/config.js", to: "config.js" }],
    }),
  ],
};
