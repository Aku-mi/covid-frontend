import React, { useState } from "react";
import { Search } from "../../components/Search";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Map } from "../../components/Map";
import { mapOptions } from "../../components/Map/options";
import { CaseCard } from "../../components/CaseCard";
import { User } from "../Helper/interfaces";
import { Get } from "../../services";
import Geocode from "react-geocode";
import { Coord } from "../../components/Map/interfaces";

Geocode.setApiKey("GEOCODING_API_KEY");

Geocode.setLanguage("es");

Geocode.setRegion("es");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root1: {
      flexGrow: 1,
      marginLeft: theme.spacing(1),
    },
  })
);

export const SearchCase: React.FC = () => {
  const classes = useStyles();
  const [showCards, setShowCards] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [cases, setCases] = useState<User[]>([]);

  const [address, setAddress] = useState<Coord[]>([]);

  const getCases = async (url: string) => {
    const res = await Get(url);

    if (res.data.ok) {
      setCases(res.data.cases);
      setShowCards(true);
      setShowMap(false);

      let marks: any[] = [];

      Geocode.fromAddress(res.data.cases[0].home_address).then(
        (response) => {
          marks.push({
            ...response.results[0].geometry.location,
            icon: "/images/verde.png",
            inf: "Residencia",
          });
        },
        (error) => {
          console.error(error);
        }
      );

      Geocode.fromAddress(res.data.cases[0].job_address).then(
        (response) => {
          marks.push({
            ...response.results[0].geometry.location,
            icon: "/images/naranja.png",
            inf: "Trabajo",
          });
        },
        (error) => {
          console.error(error);
        }
      );

      setAddress(marks);
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
                  getCases(out);
                }}
                items={[
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
                cases.map((c, i) => (
                  <div key={(c.id || i + "") + i}>
                    <CaseCard
                      map
                      case={c}
                      onEditClick={() => {
                        setShowMap(true);
                      }}
                    />
                    <br />
                  </div>
                ))}
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              {showMap ? (
                <Map mapOptions={mapOptions} coordsM={address} />
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
