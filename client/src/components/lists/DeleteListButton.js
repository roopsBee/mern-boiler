import React, { Fragment, useState, useRef } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Popper, Button, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ClickAwayListener } from "@material-ui/core";
import { deleteList } from "../../actions/lists";
import ToggleTransition from "./ToggleTransition";

function DeleteListButton({ listId }) {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const buttonRef = useRef();
  const dispatch = useDispatch();
  let history = useHistory();

  const handleDeleteClick = () => {
    dispatch(
      deleteList(listId, () => {
        history.push("/");
      })
    );
  };

  const handleClickAway = () => {
    setToggle(false);
  };

  const handleIconClick = () => {
    setToggle(!toggle);
    setOpen(true);
  };

  const transitionStyles = {
    from: {
      position: "static",
      opacity: 0,
      transform: "translate3d(0,-30px,0)",
    },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: {
      opacity: 0,
      transform: "translate3d(0,-20px,0)",
      config: { duration: 100 },
    },
    unique: true,
  };

  return (
    <Fragment>
      <IconButton ref={buttonRef} onClick={handleIconClick}>
        <DeleteIcon />
      </IconButton>
      <Popper open={open} anchorEl={buttonRef.current} placement="left">
        <ToggleTransition toggle={toggle} transitionStyles={transitionStyles}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteClick}
            >
              Delete List
            </Button>
          </ClickAwayListener>
        </ToggleTransition>
      </Popper>
    </Fragment>
  );
}

export default DeleteListButton;
