import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import ExploreIcon from "@material-ui/icons/Explore";
import { User } from "../../pages/Helper/interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "90%",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    row: {
      display: "flex",
      gap: "15px",
    },
  })
);

interface CardProps {
  case: User;
  edit?: boolean;
  map?: boolean;
  onEditClick: () => void;
}

export const CaseCard: React.FC<CardProps> = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.case.name.charAt(0)}
          </Avatar>
        }
        action={
          props.edit ? (
            <IconButton
              aria-label="settings"
              onClick={() => props.onEditClick()}
            >
              <EditIcon />
            </IconButton>
          ) : props.map ? (
            <IconButton
              aria-label="settings"
              onClick={() => props.onEditClick()}
            >
              <ExploreIcon />
            </IconButton>
          ) : null
        }
        title={props.case.name + " " + props.case.last_name}
        subheader={new Date(parseInt(props.case.birth_date)).toDateString()}
      />
      <CardContent>
        <div className={classes.row}>
          <Typography variant="body2" color="textPrimary" component="p">
            Cedula: {props.case.dni}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            Sexo: {props.case.sex}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            Estado: {props.case.state}
          </Typography>
        </div>
        <br />
        <div className={classes.row}>
          <Typography variant="body2" color="textPrimary" component="p">
            ID del Caso: {props.case.id}
          </Typography>
        </div>
        <br />
        <div className={classes.row}>
          <Typography variant="body2" color="textPrimary" component="p">
            Direccion Residencia: {props.case.home_address}
          </Typography>
        </div>
        <br />
        <div className={classes.row}>
          <Typography variant="body2" color="textPrimary" component="p">
            Direccion Trabajo: {props.case.job_address}
          </Typography>
        </div>
        <br />
        <div className={classes.row}>
          <Typography variant="body2" color="textPrimary" component="p">
            Ultima Actualizacion:{" "}
            {new Date(parseInt(props.case.test_date)).toDateString()}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            Resultado: {props.case.test_result ? "Positivo" : "Negativo"}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="h6" color="textSecondary" component="p">
          Historial
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {props.case.states
            ? props.case.states.map((c, i) => (
                <div key={c.s_id + "a" + i}>
                  <div className={classes.row}>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                    >
                      Fecha: {new Date(parseInt(c.update_date)).toDateString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                    >
                      Estado: {c.state}
                    </Typography>
                  </div>
                  <br />
                </div>
              ))
            : null}
        </CardContent>
      </Collapse>
    </Card>
  );
};
