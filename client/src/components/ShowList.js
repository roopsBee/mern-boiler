import React from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1, 0, 3),
    padding: theme.spacing(2, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    color: "green",
  },
}));

const ShowList = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <Paper elevation={5} className={classes.paper}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography align="center" variant="h5">
              My List
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ShowList;
