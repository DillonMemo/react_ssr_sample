const path = require("path");
const dotenv = require("dotenv");
const nodeExternals = require("webpack-node-externals");

const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
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
  dotenv.config();
  console.log("server :", config);
  return config;
};
