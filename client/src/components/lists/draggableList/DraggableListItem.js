import React, { useEffect } from "react";
import {
  Grid,
  ListItem,
  IconButton,
  TextField,
  Checkbox,
  makeStyles,
  Portal,
} from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteIcon from "@material-ui/icons/Delete";
import { Draggable } from "react-beautiful-dnd";
import { useSpring, animated } from "react-spring";
import { useDispatch } from "react-redux";
import { GET_LIST } from "../../../actions/types";

const useStyles = makeStyles({
  root: {
    width: "360px",
    paddingLeft: "15px",
    paddingRight: 0,
  },
  dragHandle: {
    padding: "6px",
  },
});

function DraggableListItem({
  id,
  index,
  handleClickCheckBox,
  handleClickDelete,
  handleBlur,
  handleChange,
  handleFocus,
  done,
  textField,
  deleteTransition,
}) {
  const classes = useStyles();
  const _id = id;
  const dispatch = useDispatch();

  const [props, set] = useSpring(() => ({
    from: { opacity: 0, height: "0px", transform: "translate3d(0,0px,0)" },
    to: { opacity: 1, height: "56px" },
  }));

  useEffect(() => {
    if (deleteTransition[_id] && deleteTransition[_id].deleted) {
      set({
        to: { opacity: 0, height: "0px", transform: "translate3d(0,-20px,0)" },
        config: { tension: 230 },
        onRest: () => {
          dispatch({ type: GET_LIST, payload: deleteTransition[_id].list });
        },
      });
    } // eslint-disable-next-line
  }, [deleteTransition]);

  return (
    <Draggable draggableId={_id} index={index}>
      {(provided, snapshot) => (
        <Portal disablePortal={!snapshot.isDragging}>
          <animated.div
            style={{
              ...props,
              position: snapshot.isDragging ? "absolute" : "",
            }}
          >
            <ListItem
              dense
              className={classes.root}
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <Grid item>
                <IconButton
                  onClick={(event) => {
                    handleClickDelete(event, _id);
                  }}
                >
                  <DeleteIcon color="secondary" />
                </IconButton>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  margin="none"
                  color="secondary"
                  fullWidth
                  value={textField || ""}
                  onChange={(event) => {
                    handleChange(event, _id);
                  }}
                  onBlur={(event) => {
                    handleBlur(event, _id);
                  }}
                  onFocus={(event) => {
                    handleFocus(event);
                  }}
                />
              </Grid>
              <Grid item>
                <Checkbox
                  checked={done || false}
                  onClick={(event) => {
                    handleClickCheckBox(event, _id);
                  }}
                />
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.dragHandle}
                  {...provided.dragHandleProps}
                >
                  <DragIndicatorIcon color="secondary" />
                </IconButton>
              </Grid>
            </ListItem>
          </animated.div>
        </Portal>
      )}
    </Draggable>
  );
}

export default DraggableListItem;
