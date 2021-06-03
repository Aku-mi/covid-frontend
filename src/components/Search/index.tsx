import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(0, 2),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "20%",
    },
    textField2: {
      width: "60%",
    },
    btn: {
      width: "10%",
      margin: theme.spacing(2, 0),
    },
  })
);

export interface SearchItem {
  txt: string;
  value: string;
}

export interface SearchProps {
  items: SearchItem[];
  submit: (out: string) => void;
}

interface SS {
  output: string;
  name: string;
}

export const Search: React.FC<SearchProps> = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState<SS>({
    output: "",
    name: "",
  });

  const handleChange =
    (prop: keyof SS) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  return (
    <div className={classes.root}>
      <FormControl className={classes.textField}>
        <TextField
          label="Buscar por"
          id="type"
          select
          value={values.name}
          onChange={handleChange("name")}
        >
          {props.items.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.txt}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl className={clsx(classes.margin, classes.textField2)}>
        <InputLabel htmlFor="output">Search</InputLabel>
        <Input
          id="output"
          type="text"
          onChange={handleChange("output")}
          value={values.output}
        />
      </FormControl>
      <IconButton
        className={classes.btn}
        color="secondary"
        aria-label="search"
        onClick={() => props.submit(`/cases/${values.name}/${values.output}`)}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};
