import React, { useState, useEffect } from "react";
import { Map } from "../../components/Map";
import { mapOptions } from "../../components/Map/options";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Coord } from "../../components/Map/interfaces";
import { Get } from "../../services";
import { State, User } from "../Helper/interfaces";
import Geocode from "react-geocode";

Geocode.setApiKey("GEOCODING_API_KEY");

Geocode.setLanguage("es");

Geocode.setRegion("es");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      "z-index": 10,
      top: "25px",
    },
  })
);

const getIcon = (state: string, result: boolean) => {
  if (!result) return "/images/verde.png";
  if (result && state === State.DEAD) return "/images/rojo.png";
  if (result && state === State.ICU) return "/images/naranja.png";
  if (result && state === State.HOME_TREATMENT) return "/images/amarillo.png";
  if (result && state === State.HOSPITAL_TREATMENT)
    return "/images/amarillo.png";
  if (result && state === State.CURED) return "/images/rosa.png";

  return "";
};

export const CaseMap: React.FC = () => {
  const classes = useStyles();
  const [markers, setMarkers] = useState<Coord[]>([]);
  const [, setInit] = useState(0);

  const getData = async () => {
    const res = await Get("/cases/all");
    let marks: Coord[] = [];

    res.data.cases.map((c: User) => {
      Geocode.fromAddress(c.home_address).then(
        (response) => {
          marks.push({
            ...response.results[0].geometry.location,
            icon: getIcon(c.state, c.test_result as any),
            inf: `Nombre: ${c.name} ${c.last_name}`,
            inf1: `Cedula: ${c.dni}`,
            inf2: `Estado: ${c.state}`,
          });
        },
        (error) => {
          console.error(error);
        }
      );
      return 0;
    });
    setMarkers(marks);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Button
        className={classes.root}
        variant="outlined"
        color="primary"
        onClick={() => setInit((c) => c + 1)}
      >
        Ver Casos
      </Button>
      <Map mapOptions={mapOptions} coordsM={markers} />
    </>
  );
};
