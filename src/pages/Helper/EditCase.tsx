import React, { useState } from "react";
import { Search } from "../../components/Search";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, CssBaseline } from "@material-ui/core";
import { CaseCard } from "../../components/CaseCard";
import { case_states, gender, State, test_results, User } from "./interfaces";
import { Get, Post } from "../../services";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root1: {
      flexGrow: 1,
      marginLeft: theme.spacing(2),
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
      marginLeft: theme.spacing(4),
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
      width: "75%",
      margin: theme.spacing(3, 2),
    },
  })
);

export const EditCase: React.FC = () => {
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

  const [cases, setCases] = useState<User[]>([]);

  const [showCards, setShowCards] = useState(false);
  const [edit, setEdit] = useState(false);

  const [bd, setBd] = useState("");
  const [td, setTd] = useState("");

  const [uid, setUid] = useState("");
  const [alive, setAlive] = useState(false);

  const getCases = async (url: string) => {
    const res = await Get(url);

    if (res.data.ok) {
      setCases(res.data.cases);
      setShowCards(true);
    }
  };

  const submitEdit = async () => {
    const res = await Post(`cases/update/${uid}`, values);
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
      alert("Caso Actualizado!");
      setShowCards(false);
      setEdit(false);
    } else alert("Hubo un Error!");
  };

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
  return (
    <>
      <CssBaseline />
      <Grid container className={classes.root1} spacing={1}>
        <Grid item xs={12} sm={12} lg={12}>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={12} sm={12} lg={6}>
              <Search
                submit={(out: string) => {
                  setEdit(false);
                  getCases(out);
                }}
                items={[
                  {
                    txt: "Nombre",
                    value: "name",
                  },
                  {
                    txt: "ID",
                    value: "id",
                  },
                  {
                    txt: "Cedula",
                    value: "dni",
                  },
                ]}
              />
              {showCards &&
                cases.map((c) => (
                  <div key={c.id}>
                    <CaseCard
                      edit
                      case={c}
                      onEditClick={() => {
                        setEdit(true);
                        const bbd = new Date(parseInt(c.birth_date));
                        const ttd = new Date(parseInt(c.test_date));
                        const k = bbd.getMonth() + 1;
                        const l = ttd.getMonth() + 1;

                        setBd(
                          `${bbd.getFullYear()}-${
                            k < 10 ? "0" + k : k
                          }-${bbd.getDate()}`
                        );

                        setTd(
                          `${ttd.getFullYear()}-${
                            l < 10 ? "0" + l : l
                          }-${ttd.getDate()}`
                        );

                        setValues(c);
                        setUid(c.id || "");
                        setAlive(c.state === State.DEAD);
                      }}
                    />
                    <br />
                  </div>
                ))}
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              {edit && (
                <div className={classes.root}>
                  <form autoComplete="off">
                    <FormControl>
                      <FormControl
                        className={clsx(classes.margin, classes.textField2)}
                      >
                        <InputLabel htmlFor="name">Nombre</InputLabel>
                        <Input
                          disabled={alive}
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
                          disabled={alive}
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
                          disabled={alive}
                          id="dni"
                          type="number"
                          onChange={handleChange("dni")}
                          value={values.dni}
                        />
                      </FormControl>
                      <br />
                      <FormControl className={classes.textField2}>
                        <TextField
                          disabled={alive}
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
                          disabled={alive}
                          id="birth"
                          label="Fecha De Nacimiento"
                          type="date"
                          defaultValue={bd}
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
                        <InputLabel htmlFor="name">
                          Dirección Residencia
                        </InputLabel>
                        <Input
                          disabled={alive}
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
                        <InputLabel htmlFor="name">
                          Dirección Trabajo
                        </InputLabel>
                        <Input
                          disabled={alive}
                          id="job_address"
                          type="text"
                          onChange={handleChange("job_address")}
                          value={values.job_address}
                        />
                      </FormControl>
                      <br />
                      <FormControl className={classes.textField2}>
                        <TextField
                          disabled={alive}
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
                          disabled={alive}
                          id="birth1"
                          label="Fecha De Examen"
                          type="date"
                          defaultValue={td}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleChange("test_date")}
                        />
                      </FormControl>
                      <br />
                      <FormControl className={classes.textField2}>
                        <TextField
                          disabled={alive}
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
                        if (!alive) submitEdit();
                      }}
                    >
                      Enviar
                    </Button>
                  </form>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
