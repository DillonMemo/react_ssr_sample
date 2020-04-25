const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const nodeExternals = require("webpack-node-externals");
const LoadablePlugin = require("@loadable/webpack-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;

const isDevMode = process.env.NODE_ENV !== "production";
const styledComponentsTransformer = createStyledComponentsTransformer();
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
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
            },
          },
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
      ? [new LoadablePlugin(), new webpack.HotModuleReplacementPlugin()]
      : [new LoadablePlugin()],
  externals: target === "node" ? ["@loadable/component", nodeExternals()] : undefined,
});

module.exports = () => {
  dotenv.config();
  console.log("client :", config("web"), config("node"));
  return [config("web"), config("node")];
};
