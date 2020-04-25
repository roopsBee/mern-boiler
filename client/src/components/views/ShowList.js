import React, { useEffect } from "react";
import { Container, Paper, Grid, makeStyles, List } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getList } from "../../actions/lists";
import AddItem from "../lists/AddItem";
import ListItems from "../lists/ListItems";
import ShowHide from "../auth/ShowHide";
import ListTransition from "../lists/ListTransitionLoader";
import AnimatedListName from "../lists/AnimatedListName";
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
  let isLoadingList = useSelector((state) => state.currentList.isLoadingList);

  useEffect(() => {
    dispatch(getList(listId));
  }, [listId, dispatch]);

  return (
    <Container maxWidth="xs">
      <ShowHide isShowValue={!isLoadingList} Replace={ListTransition}>
        <Paper elevation={10} className={classes.paper}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={10}>
              <ListName listId={listId} />
            </Grid>
            <List>
              <ListItems listId={listId} />
              <AddItem listId={listId} />
            </List>
          </Grid>
        </Paper>
      </ShowHide>
    </Container>
  );
};

export default ShowList;
