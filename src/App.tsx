import React, { useState, useEffect } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Routes } from "./components/Routes";
import { RouteProp } from "./components/Routes/interfaces";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { storage } from "./services/storage";

const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
  },
});

export const App: React.FC = () => {
  const [pass, setPass] = useState(false);
  const routes: RouteProp[] = [
    {
      href: "/login",
      txt: "Sign In",
      id: 0,
      component: Login as React.FC,
      visible: !pass,
    },
    {
      href: "/home",
      txt: "Home",
      id: 1,
      component: Home as React.FC,
      visible: pass,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPass(storage.token() ? true : false);
    }, 100);
    return () => clearInterval(interval);
  }, [pass]);

  return (
    <>
      <MuiThemeProvider theme={themeLight}>
        <CssBaseline />
        <Routes data={routes} showMenu={pass} />
      </MuiThemeProvider>
    </>
  );
};

export default App;
