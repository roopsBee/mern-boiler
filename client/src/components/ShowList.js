import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  makeStyles,
  List,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "../actions/lists";
import AddItem from "./AddItem";
import ListItems from "./ListItems";

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

const ShowList = (props) => {
  const listId = props.match.params.id;
  const dispatch = useDispatch();
  const classes = useStyles();
  const list = useSelector((state) => state.currentList);

  useEffect(() => {
    dispatch(getList(listId));
  }, [listId, dispatch]);

  return (
    <Container maxWidth="xs">
      <Paper elevation={5} className={classes.paper}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography align="center" variant="h5">
              {list.name}
            </Typography>
            <List>
              <ListItems listId={listId} />
              <AddItem listId={listId} />
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ShowList;
