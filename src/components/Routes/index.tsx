import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Main } from "../../pages/Main";
import { RouteProps } from "./interfaces";
import Header from "../Header";

export const Routes: React.FC<RouteProps> = (props) => {
  return (
    <BrowserRouter>
      <Header items={props.data} showMenu={props.showMenu} />
      <Switch>
        <Route key={100} exact path="/" component={Main} />
        {props.data.map((p) => (
          <Route key={p.id} exact path={p.href} component={p.component}></Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
};
