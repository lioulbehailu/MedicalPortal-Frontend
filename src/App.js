import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import Authenticate from "./Authenticate";
import Login from "./Login";
import Doctor from "./component/Doctor";
import Hospital from "./component/Hospital";
import NotFound from "./component/NotFound";

const App = () => (
  <BrowserRouter>
    <main>
      <Switch>
        <Route exact path="/" component={Login} />
        <Authenticate exact path="/doctor/home" component={Doctor} />
        <Authenticate exact path="/hospital/home" component={Hospital} />
        <Authenticate component={NotFound} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default App;
