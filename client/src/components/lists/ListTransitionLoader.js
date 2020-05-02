import React from "react";
import { ClipLoader } from "react-spinners";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1, 0, 1),
    padding: theme.spacing(2, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "159px",
  },
}));

function ListTransition() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container maxWidth="xs">
      <Paper elevation={5} className={classes.paper}>
        <ClipLoader size={50} color={theme.palette.secondary.main} />
      </Paper>
    </Container>
  );
}

export default ListTransition;
