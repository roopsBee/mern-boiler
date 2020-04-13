import React, { useEffect } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import { updateListName } from "../actions/lists";
import { setAlert } from "../actions/alerts";

const ListName = ({ listId }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.currentList);
  let [listName, setListName] = useState("");
  let [focusValue, setFocusValue] = useState("");

  useEffect(() => {
    setListName(list.name);
  }, [list]);

  const handleChange = (event) => {
    setListName(event.target.value);
  };

  const handleBlur = (event) => {
    if (focusValue !== listName) {
      if (listName === "") {
        dispatch(setAlert("List Name cannot be empty", "error"));
        setListName(focusValue);
      } else {
        dispatch(updateListName(listId, listName));
      }
    }
  };

  return (
    <Fragment>
      <Grid item>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid item xs={9}>
        <TextField
          margin="none"
          fullWidth
          value={listName || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={(event) => {
            setFocusValue(event.target.value);
          }}
        />
      </Grid>
    </Fragment>
  );
};

export default ListName;