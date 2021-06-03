import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { NavItems } from "./interfaces";
import UserMenu from "../UserMenu";
import { storage } from "../../services/storage";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header: React.FC<RouteComponentProps & NavItems> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.title}>
            <Button
              color="inherit"
              disableFocusRipple
              onClick={() => props.history.push("/")}
            >
              <Typography variant="h6">Covid Tracker</Typography>
            </Button>
          </div>
          {props.items.map(
            (item) =>
              item.visible && (
                <Button
                  key={item.id}
                  color="inherit"
                  onClick={() => props.history.push(item.href)}
                >
                  {item.txt}
                </Button>
              )
          )}
          {props.showMenu && (
            <UserMenu
              items={[
                // { href: "/home", title: "Profile", onClick: () => {} },
                {
                  href: "/",
                  title: "Log Out",
                  onClick: () => {
                    storage.clear();
                  },
                },
              ]}
            />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
