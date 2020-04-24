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

import webpackConfig from "../webpack.client";
import App from "./App";

const app = express();
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  const config: webpack.Configuration = webpackConfig() as webpack.Configuration;

  if (config) {
    const compiler: webpack.Compiler = webpack(config);

    let path = "/";
    if (config.output) {
      path = config.output.publicPath ? config.output.publicPath : path;
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
  const context = {};

  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();

  res.set("content-type", "text/html");
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, user-scalable=no">
            <meta name="google" content="notranslate">
            ${helmet.title.toString()}
        </head>
        <body>
            <div id="root">${html}</div>
            <script type="text/javascript" src="main.js"></script>
        </body>
        </html>
    `);
});

app.listen(3003, () => console.log("Server started http://localhost:3003"));
