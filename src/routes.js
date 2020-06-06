import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Form from "./pages/Form";
import Welcome from "./pages/Welcome";
import Enviado from "./pages/Enviado";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/questionario" component={Form} />
        <Route path="/enviado" component={Enviado} />
      </Switch>
    </BrowserRouter>
  );
}
