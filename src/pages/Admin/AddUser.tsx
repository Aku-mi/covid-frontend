import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, CssBaseline } from "@material-ui/core";
import { IUser, roles } from "./interfaces";
import { Post } from "../../services";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "75%",
      margin: theme.spacing(1.5, 2),
    },
    textField2: {
      width: "90%",
      margin: theme.spacing(1.5, 2),
    },
    btn: {
      width: "68%",
      margin: theme.spacing(5, 2),
    },
  })
);

export const AddUser: React.FC = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState<IUser>({
    name: "",
    last_name: "",
    dni: 0,
    user_name: "",
    password: "",
    role: "",
  });

  const submit = async () => {
    const res = await Post("auth/sign-up", values);
    if (res.data.ok) {
      setValues({
        name: "",
        last_name: "",
        dni: 0,
        user_name: "",
        password: "",
        role: "",
      });
      alert("Usuario Registrado!");
    } else alert("Hubo un Error!");
  };

  const handleChange =
    (prop: keyof IUser) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Grid container spacing={1}>
          <Grid item xs={1} sm={2} lg={4}></Grid>
          <Grid item xs={10} sm={9} lg={6}>
            <div className={classes.root}>
              <form autoComplete="off">
                <FormControl>
                  <FormControl
                    className={clsx(classes.margin, classes.textField2)}
                  >
                    <InputLabel htmlFor="name">Nombre</InputLabel>
                    <Input
                      id="name"
                      type="text"
                      onChange={handleChange("name")}
                      value={values.name}
                    />
                  </FormControl>
                  <br />
                  <FormControl
                    className={clsx(classes.margin, classes.textField2)}
                  >
                    <InputLabel htmlFor="last_name">Apellido</InputLabel>
                    <Input
                      id="last_name"
                      type="text"
                      onChange={handleChange("last_name")}
                      value={values.last_name}
                    />
                  </FormControl>
                  <br />
                  <FormControl
                    className={clsx(classes.margin, classes.textField2)}
                  >
                    <InputLabel htmlFor="dni">Cedula</InputLabel>
                    <Input
                      id="dni"
                      type="number"
                      onChange={handleChange("dni")}
                      value={values.dni}
                    />
                  </FormControl>
                </FormControl>
                <FormControl>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                  >
                    <InputLabel htmlFor="user_name">Usuario</InputLabel>
                    <Input
                      id="user_name"
                      type="text"
                      onChange={handleChange("user_name")}
                      value={values.user_name}
                    />
                  </FormControl>
                  <br />
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                  >
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
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
                  <br />
                  <FormControl>
                    <TextField
                      className={classes.textField}
                      label="Rol"
                      id="role"
                      select
                      value={values.role}
                      onChange={handleChange("role")}
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </FormControl>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.btn}
                  onClick={() => {
                    submit();
                  }}
                >
                  Registrar
                </Button>
              </form>
            </div>
          </Grid>
          <Grid item xs={1} sm={1} lg={2}></Grid>
        </Grid>
      </Container>
    </>
  );
};
