import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PieChart, LineChart } from "../components/Charts";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Get } from "../services";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root1: {
      flexGrow: 1,
      marginLeft: theme.spacing(2),
    },
    line: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    subline: {
      width: "85%",
    },

    thowpie: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    pie1: {
      width: "90%",
    },
    pie2: {
      width: "90%",
    },
    pie3: {
      width: "50%",
    },
  })
);

export const Main: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  const [pie1, setPie1] = useState([0, 0, 0]);
  const [pie2, setPie2] = useState([0, 0, 0, 0]);
  const [pie3, setPie3] = useState([0, 0]);
  const [casesL, setCasesL] = useState([]);
  const [datesL, setDatesL] = useState([]);
  const [deathsL, setDeathsL] = useState([]);
  const [init, setInit] = useState(0);

  useEffect(() => {
    if (init < 1) {
      const interval = setInterval(() => {
        (async () => {
          const res = await Get("cases/data");
          setPie1(res.data.pie1);
          setPie2(res.data.pie2);
          setPie3(res.data.pie3);
          setCasesL(res.data.line.cases);
          setDatesL(res.data.line.dates);
          setDeathsL(res.data.line.deaths);
        })();
        setInit((c) => c + 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [init]);

  return (
    <Container fixed>
      <br />
      <Grid container className={classes.root1} spacing={1}>
        <Grid item xs={12} sm={12} lg={12}>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={12} sm={12} lg={12}>
              <div className={classes.line}>
                <Typography variant="h6" color="textPrimary" component="p">
                  Casos Registrados Por Dia
                </Typography>
                <div className={classes.subline}>
                  <LineChart
                    labels={datesL}
                    sets={[
                      {
                        data: deathsL,
                        backgroundColor: "red",
                        borderColor: "red",
                        label: "Muertes",
                      },
                      {
                        data: casesL,
                        backgroundColor: "blue",
                        borderColor: "blue",
                        label: "Casos",
                      },
                    ]}
                  />
                </div>
              </div>
              <br />
              <br />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={12} sm={12} lg={6}>
              <div className={classes.thowpie}>
                <Typography variant="h6" color="textPrimary" component="p">
                  Casos Totales
                </Typography>
                <div className={classes.pie1}>
                  <PieChart
                    data={pie1}
                    labels={["Infectados", "Curados", "Muertos"]}
                    colors={["#333ffa", "#fa33be", "red"]}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <div className={classes.thowpie}>
                <Typography variant="h6" color="textPrimary" component="p">
                  Infectados
                </Typography>
                <div className={classes.pie2}>
                  <PieChart
                    data={pie2}
                    labels={[
                      "Tratamiento En Casa",
                      "Tratamiento En Hospital",
                      "UCI",
                      "Muertos",
                    ]}
                    colors={["#333ffa", "#fa33be", "red", "green"]}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
      <div className={classes.thowpie}>
        <Typography variant="h6" color="textPrimary" component="p">
          Resultado Pruebas
        </Typography>
        <div className={classes.pie3}>
          <PieChart
            data={pie3}
            labels={["Positivos", "Negativos"]}
            colors={["#333ffa", "#fa33be"]}
          />
        </div>
      </div>
    </Container>
  );
};
