import React, { useEffect, useState } from "react";
import {
  Grid,
  ListItem,
  IconButton,
  TextField,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector, useDispatch } from "react-redux";
import { updateItem, deleteItem } from "../../actions/item";
import { setAlert } from "../../actions/alerts";

function ListItems({ listId }) {
  const list = useSelector((state) => state.currentList);
  const dispatch = useDispatch();
  let [textField, setTextField] = useState({});
  let [done, setDone] = useState({});
  const [focusValue, setFocusValue] = useState("");

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
    if (focusValue !== textField[_id]) {
      if (textField[_id] === "") {
        dispatch(setAlert("List Name cannot be empty", "error"));
        setTextField((state) => ({ ...state, [_id]: focusValue }));
      } else {
        let item = { text: textField[_id], done: done[_id], _id };
        dispatch(updateItem(listId, item));
      }
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

  return list.items.map(({ _id }, index) => {
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
            color="secondary"
            fullWidth
            multiline
            value={textField[_id] || ""}
            onChange={(event) => {
              handleChange(event, _id);
            }}
            onBlur={(event) => {
              handleBlur(event, _id);
            }}
            onFocus={(event) => {
              setFocusValue(event.target.value);
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
}

export default ListItems;
