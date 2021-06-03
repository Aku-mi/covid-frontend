import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Helper } from "./Helper";
import { Admin } from "./Admin";
import { Doctor } from "./Doctor";
import { storage } from "../services/storage";
import { Auth } from "../services/auth";

export const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    Auth(setAuth, history);
  }, [auth, history]);

  if (auth) {
    if (storage.user().role === "admin") {
      return <Admin />;
    } else if (storage.user().role === "doctor") {
      return <Doctor />;
    } else if (storage.user().role === "helper") {
      return <Helper />;
    } else {
      return <div>401</div>;
    }
  } else {
    return <div>401</div>;
  }
};
