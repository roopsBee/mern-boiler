import React, { useEffect, useState } from "react";
import { Container, Paper, Grid, makeStyles, List } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getList } from "../../actions/lists";
import AddItem from "../lists/AddItem";
import ListItems from "../lists/ListItems";
import ShowHide from "../auth/ShowHide";
import ListTransition from "../lists/ListTransitionLoader";
import ListName from "../lists/ListName";
import ToggleTransition from "../lists/ToggleTransition";

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
  const history = useHistory();

  let isLoadingList = useSelector((state) => state.currentList.isLoadingList);
  const [deleteTransition, setDeleteTransition] = useState(false);
  const deleteTransitionDuration = 200;

  useEffect(() => {
    dispatch(getList(listId));
  }, [listId, dispatch]);

  const transitionStyles = {
    from: {
      opacity: 0,
      transform: "translate3d(0px,0px,0px)",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0px,0px,0px)",
      immediate: true,
    },
    leave: {
      opacity: 0,
      transform: "translate3d(0px,50px,0)",
      config: { duration: deleteTransitionDuration },
    },
  };

  const handleDeleteList = () => {
    setDeleteTransition(true);
    setTimeout(() => {
      history.push("/");
    }, deleteTransitionDuration);
  };

  return (
    <ToggleTransition
      toggle={!deleteTransition}
      transitionStyles={transitionStyles}
    >
      <Container maxWidth="xs">
        <ShowHide isShowValue={!isLoadingList} Replace={ListTransition}>
          <Paper elevation={10} className={classes.paper}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={10}>
                <ListName listId={listId} handleDeleteList={handleDeleteList} />
              </Grid>
              <List>
                <ListItems listId={listId} />
                <AddItem listId={listId} />
              </List>
            </Grid>
          </Paper>
        </ShowHide>
      </Container>
    </ToggleTransition>
  );
};

export default ShowList;
