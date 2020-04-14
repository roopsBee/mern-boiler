import React, { Fragment, useState, useRef } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Popper, Button, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteList } from "../actions/lists";

function DeleteListButton({ listId }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();
  const dispatch = useDispatch();
  let history = useHistory();

  const handleDeleteClick = () => {
    setOpen(!open);
    dispatch(
      deleteList(listId, () => {
        history.push("/");
      })
    );
  };

  return (
    <Fragment>
      <IconButton
        ref={buttonRef}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Popper open={open} anchorEl={buttonRef.current} placement="top">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteClick}
        >
          Delete List
        </Button>
      </Popper>
    </Fragment>
  );
}

export default DeleteListButton;
