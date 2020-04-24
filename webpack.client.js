const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

const hotMiddlewareScript = `webpack-hot-middleware/client?&path=/__webpack_hmr&timeout=20000&reload=true`;

const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: [hotMiddlewareScript, "./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          // {
          //   loader: "babel-loader",
          //   options: {
          //     presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          //   },
          // },
          "babel-loader",
          "ts-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = () => {
  dotenv.config();
  console.log("client :", config);
  return config;
};
