import React from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import News from "./pages/news/News";

export interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <>
      <Helmet>
        <title>TItle | App</title>
      </Helmet>
      <Route path="/" render={() => <Header />} />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/news" render={() => <News />} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
