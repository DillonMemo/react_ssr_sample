const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
dotenv.config();
const dotenvPlugin = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");
const LoadablePlugin = require("@loadable/webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isDevMode = process.env.NODE_ENV !== "production";
const hotMiddlewareScript = `webpack-hot-middleware/client?&path=/__webpack_hmr&timeout=20000&reload=true`;

const getEntryPoint = (target) => {
  if (target === "node") {
    return ["./src/App.tsx"];
  }
  return isDevMode ? [hotMiddlewareScript, "./src/index.tsx"] : ["./src/index.tsx"];
};

const config = (target) => ({
  mode: isDevMode ? "development" : "production",
  name: target,
  target,
  entry: getEntryPoint(target),
  output: {
    path: path.resolve(__dirname, `dist/${target}`),
    filename: "[name].js",
    publicPath: "/web/",
    libraryTarget: target === "node" ? "commonjs2" : undefined,
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
          // {
          //   loader: "ts-loader",
          //   options: {
          //     getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
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
    alias: {
      pages: path.resolve("src/pages/"),
      components: path.resolve("src/components/"),
      actions: path.resolve("src/store/actions/"),
      reducers: path.resolve("src/store/reducers"),
      util: path.resolve("src/lib/utils/"),
    },
  },
  plugins:
    target === "web"
      ? [
          new LoadablePlugin(),
          new dotenvPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new BundleAnalyzerPlugin({ analyzerMode: "static", openAnalyzer: false }),
        ]
      : [new LoadablePlugin(), new dotenvPlugin()],
  externals: target === "node" ? ["@loadable/component", nodeExternals()] : undefined,
});

module.exports = () => {
  console.log("client :", process.env.NODE_ENV, isDevMode);
  return [config("web"), config("node")];
};
