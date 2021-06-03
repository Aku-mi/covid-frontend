import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { Post } from "../services";
import { storage } from "../services/storage";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(3, 2),
        width: "90%",
      },
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    card: {
      margin: theme.spacing(3, 2), // 16:9
    },
    textField: {
      width: "80%",
      margin: theme.spacing(1.5, 2),
    },
    btn: {
      width: "80%",
      margin: theme.spacing(4, 2),
    },
  })
);

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [user_name, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    console.log(user_name, password);

    try {
      const res = await Post("auth/sign-in", {
        user_name,
        password,
      });

      if (res && res.data) {
        if (res.data.ok) {
          storage.saveUser({
            userName: res.data.user.user_name as string,
            id: res.data.user.id as string,
            role: res.data.user.role as string,
            accessToken: res.data.accessToken as string,
          });
          history.push("/home");
        } else {
          alert("Wrong!");
        }
      } else {
        alert("Wrong!");
      }
    } catch (err) {
      alert("Wrong!");
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="./images/testr.jpg"
              title="people"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <form className={classes.root} noValidate autoComplete="off">
            <FormControl>
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="user_name">Usuario</InputLabel>
                <Input
                  id="user_name"
                  type="text"
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                  value={user_name}
                />
              </FormControl>
              <br />
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword((c) => !c);
                        }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className={classes.btn}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => submit()}
                >
                  Sign In
                </Button>
              </FormControl>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
