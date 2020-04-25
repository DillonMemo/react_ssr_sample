import path from "path";
import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import cors from "cors";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { ChunkExtractor } from "@loadable/server";

import webpackConfig from "../webpack.client";

const app = express();
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  const config: webpack.Configuration[] = (webpackConfig() as webpack.Configuration[]).map(
    (config) => {
      if (config.output) {
        config.output.path =
          config.output.path &&
          config.output.path.replace("dist\\dist\\", "dist\\").replace("dist/dist/", "dist/");
      }
      return config;
    }
  );

  if (config) {
    const compiler: webpack.MultiCompiler = webpack(config);

    let path = "/";
    if (config[0].output) {
      path = config[0].output.publicPath ? config[0].output.publicPath : path;
    }

    app.use(
      webpackDevMiddleware(compiler, {
        logLevel: "silent",
        publicPath: path,
      })
    );

    app.use(webpackHotMiddleware(compiler));
  }
}

app.use(express.static(path.resolve(__dirname)));

app.get("*", (req, res) => {
  const nodeStats = path.resolve(__dirname, "./node/loadable-stats.json");
  const webStats = path.resolve(__dirname, "./web/loadable-stats.json");
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const { default: App } = nodeExtractor.requireEntrypoint();

  const context = {};

  const jsx = webExtractor.collectChunks(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const html = renderToString(jsx);
  const helmet = Helmet.renderStatic();

  res.set("content-type", "text/html");
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, user-scalable=no">
            <meta name="google" content="notranslate">
            ${helmet.title.toString()}
            ${webExtractor.getLinkTags()}
            ${webExtractor.getStyleTags()}
        </head>
        <body>
            <div id="root">${html}</div>
            ${webExtractor.getScriptTags()}
        </body>
        </html>
    `);
});

app.listen(3003, () => console.log("Server started http://localhost:3003"));
