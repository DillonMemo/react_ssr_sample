import { hydrate } from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/core";

import App from "./App";

const rootElement = document.getElementById("root");

/** emotion */
const cache = createCache();

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   rootElement
// );

loadableReady(() =>
  hydrate(
    <BrowserRouter>
      <CacheProvider value={cache}>
        <App />
      </CacheProvider>
    </BrowserRouter>,
    rootElement
  )
);

if (module.hot) {
  module.hot.accept();
}
