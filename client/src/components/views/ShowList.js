import React, { useEffect, useState } from "react";
import { Container, Paper, Grid, makeStyles, List } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getList } from "../../actions/lists";
import AddItem from "../lists/AddItem";
import ShowHide from "../auth/ShowHide";
import ListTransition from "../lists/ListTransitionLoader";
import ListName from "../lists/title/ListName";
import ToggleTransition from "../lists/ToggleTransition";
import DraggableListItems from "../lists/draggableList/DraggableListItems";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1, 0, 3),
    padding: theme.spacing(2, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    padding: 0,
  },
  title: {
    paddingLeft: 16,
    paddingRight: 94,
  },
  addItem: {
    paddingRight: 52,
    paddingLeft: 64,
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
      <Container maxWidth="xs" className={classes.container}>
        <ShowHide isShowValue={!isLoadingList} Replace={ListTransition}>
          <Paper elevation={10} className={classes.paper}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12}>
                <ListName
                  className={classes.title}
                  listId={listId}
                  handleDeleteList={handleDeleteList}
                />
              </Grid>
              <Grid item xs={12}>
                <List>
                  <DraggableListItems listId={listId} />
                  <AddItem listId={listId} className={classes.addItem} />
                </List>
              </Grid>
            </Grid>
          </Paper>
        </ShowHide>
      </Container>
    </ToggleTransition>
  );
};

export default ShowList;
