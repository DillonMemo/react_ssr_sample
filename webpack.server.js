const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const nodeExternals = require("webpack-node-externals");

const isDevMode = process.env.NODE_ENV !== "production";

const config = {
  mode: isDevMode ? "development" : "production",
  target: "node",
  node: false,
  entry: {
    server: "./src/server.tsx",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  externals: [nodeExternals()],
};

module.exports = (env) => {
  console.log("server :", process.env.NODE_ENV, isDevMode);
  return config;
};
