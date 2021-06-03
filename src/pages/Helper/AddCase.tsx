import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, CssBaseline } from "@material-ui/core";
import { User, gender, case_states, test_results } from "./interfaces";
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
      margin: theme.spacing(0, 2, 1.5, 2),
    },
    textField2: {
      width: "90%",
      margin: theme.spacing(0, 2, 1.5, 2),
    },
    btn: {
      width: "72%",
      margin: theme.spacing(3, 2),
    },
  })
);

export const AddCase: React.FC = () => {
  const classes = useStyles();

  const [values, setValues] = useState<User>({
    name: "",
    last_name: "",
    dni: 0,
    birth_date: "",
    sex: "",
    home_address: "",
    job_address: "",
    state: "",
    test_date: "",
    test_result: "",
  });

  const handleChange =
    (prop: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (prop === "birth_date" || prop === "test_date") {
        setValues({
          ...values,
          [prop]: new Date(event.target.value).getTime(),
        });
      } else {
        setValues({ ...values, [prop]: event.target.value });
      }
    };

  const submit = async () => {
    const res = await Post("cases/add", values);
    if (res.data.ok) {
      setValues({
        name: "",
        last_name: "",
        dni: 0,
        birth_date: "",
        sex: "",
        home_address: "",
        job_address: "",
        state: "",
        test_date: "",
        test_result: "",
      });
      alert("Caso Registrado!");
    } else alert("Hubo un Error!");
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
                  <br />
                  <FormControl className={classes.textField2}>
                    <TextField
                      label="Sexo"
                      id="sex"
                      select
                      value={values.sex}
                      onChange={handleChange("sex")}
                    >
                      {gender.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                  <br />
                  <FormControl className={classes.textField2}>
                    <TextField
                      id="birth1"
                      label="Fecha De Nacimiento"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange("birth_date")}
                    />
                  </FormControl>
                </FormControl>
                <FormControl>
                  <FormControl
                    className={clsx(classes.margin, classes.textField2)}
                  >
                    <InputLabel htmlFor="name">Dirección Residencia</InputLabel>
                    <Input
                      id="home_address"
                      type="text"
                      onChange={handleChange("home_address")}
                      value={values.home_address}
                    />
                  </FormControl>
                  <br />
                  <FormControl
                    className={clsx(classes.margin, classes.textField2)}
                  >
                    <InputLabel htmlFor="name">Dirección Trabajo</InputLabel>
                    <Input
                      id="job_address"
                      type="text"
                      onChange={handleChange("job_address")}
                      value={values.job_address}
                    />
                  </FormControl>
                  <br />
                  <FormControl className={classes.textField2}>
                    <TextField
                      label="Resultado Examen"
                      id="test_result"
                      select
                      value={values.test_result}
                      onChange={handleChange("test_result")}
                    >
                      {test_results.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                  <br />
                  <FormControl className={classes.textField2}>
                    <TextField
                      id="test_date"
                      label="Fecha De Examen"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange("test_date")}
                    />
                  </FormControl>
                  <br />
                  <FormControl className={classes.textField2}>
                    <TextField
                      label="Estado del Caso"
                      id="case-state"
                      select
                      value={values.state}
                      onChange={handleChange("state")}
                    >
                      {case_states.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
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
