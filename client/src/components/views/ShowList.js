import React, { useEffect } from "react";
import { Container, Paper, Grid, makeStyles, List } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getList } from "../../actions/lists";
import AddItem from "./AddItem";
import ListItems from "../lists/ListItems";
import ListName from "../lists/ListName";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1, 0, 3),
    padding: theme.spacing(2, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ShowList = (props) => {
  const listId = props.match.params.id;
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getList(listId));
  }, [listId, dispatch]);

  return (
    <Container maxWidth="xs">
      <Paper elevation={5} className={classes.paper}>
        <Grid container justify="center" alignItems="center">
          <ListName listId={listId} />
          <List>
            <ListItems listId={listId} />
            <AddItem listId={listId} />
          </List>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ShowList;
