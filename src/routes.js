import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Form from "./pages/Form";
import Welcome from "./pages/Welcome";
import Enviado from "./pages/Enviado";
import Politics from "./pages/Politics";
import TOS from "./pages/TOS";
import Profile from "./pages/Profile";
import Credentials from "./pages/Credentials";
import Notifications from "./pages/Notifications";
import Dashboard from "./pages/Dashboard"

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/questionario" component={Form} />
        <Route path="/enviado" component={Enviado} />
        <Route path="/politicas-de-privacidade" component={Politics} />
        <Route path="/termos-de-uso" component={TOS} />
        <Route path="/eu" exact component={Profile} />
        <Route path="/eu/credenciais" component={Credentials} />
        <Route path="/eu/notificacoes" component={Notifications} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
