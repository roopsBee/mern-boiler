import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  makeStyles,
  ListItem,
  IconButton,
  TextField,
  List,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "../actions/lists";
import AddItem from "./AddItem";
import { updateItem, deleteItem } from "../actions/item";

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
  let [textField, setTextField] = useState({});
  let [done, setDone] = useState({});
  let onFocusValue = "";

  useEffect(() => {
    dispatch(getList(listId));
  }, [listId, dispatch]);

  useEffect(() => {
    list.items.forEach(({ text, _id, done }) => {
      setTextField((state) => ({ ...state, [_id]: text }));
      setDone((state) => ({ ...state, [_id]: done }));
    });
  }, [list]);

  const handleChange = (event, id) => {
    setTextField({ ...textField, [id]: event.target.value });
  };

  const handleBlur = (event, _id) => {
    if (onFocusValue !== textField[_id]) {
      let item = { text: textField[_id], done: done[_id], _id };
      dispatch(updateItem(listId, item));
    }
  };

  const handleClickDelete = (event, id) => {
    dispatch(deleteItem(listId, id));
  };

  const handleClickCheckBox = (event, _id) => {
    setDone((state) => ({ ...state, [_id]: !done[_id] }));
    let item = { text: textField[_id], done: !done[_id], _id };
    dispatch(updateItem(listId, item));
  };

  let items = list.items.map(({ _id }, index) => {
    return (
      <ListItem dense key={_id || index}>
        <Grid item>
          <IconButton
            onClick={(event) => {
              handleClickDelete(event, _id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <TextField
            margin="none"
            fullWidth
            multiline
            value={textField[_id] || ""}
            onChange={(event) => {
              handleChange(event, _id);
            }}
            onBlur={(event) => {
              handleBlur(event, _id);
            }}
            onFocus={(e) => {
              onFocusValue = e.target.value;
            }}
          />
        </Grid>
        <Grid item>
          <Checkbox
            checked={done[_id] || false}
            onClick={(event) => {
              handleClickCheckBox(event, _id);
            }}
          />
        </Grid>
      </ListItem>
    );
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={5} className={classes.paper}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography align="center" variant="h5">
              {list.name}
            </Typography>
            <List>
              {items}
              <AddItem listId={listId} />
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ShowList;
