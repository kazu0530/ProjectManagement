const path = require("path");
const cleanPlugin = require("clean-webpack-plugin")
 
module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "dist"),
      },
      {
        directory: __dirname,
      },
    ],
  },
  devtool: "false",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins:[
    new cleanPlugin.CleanWebpackPlugin(),
  ]
};