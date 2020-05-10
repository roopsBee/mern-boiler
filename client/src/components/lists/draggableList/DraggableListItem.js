import React, { useEffect } from "react";
import {
  Grid,
  ListItem,
  IconButton,
  TextField,
  makeStyles,
  Portal,
  Checkbox,
} from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteIcon from "@material-ui/icons/Delete";
import { Draggable } from "react-beautiful-dnd";
import { useSpring, animated } from "react-spring";
import { useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core";
import { GET_LIST } from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: { paddingRight: 0 },
  dragIcon: {
    padding: "10px 14px",
  },
}));

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
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const _id = id;
  const complete = theme.palette.success.main;
  const uncomplete = theme.palette.secondary.main;

  const AnimatedDeleteIcon = animated(DeleteIcon);
  const AnimatedDragIcon = animated(DragIndicatorIcon);
  const AnimatedCheckBox = animated(Checkbox);

  const SVGIconColor = useSpring({
    color: done ? complete : uncomplete,
    config: { tension: 300 },
  });

  const [transitionStyles, set] = useSpring(() => ({
    from: { opacity: 0, height: "0px" },
    to: { opacity: 1, height: "56px" },
  }));

  useEffect(() => {
    if (deleteTransition[_id] && deleteTransition[_id].deleted) {
      set({
        to: [
          { opacity: 0, config: { tension: 400, clamp: true } },
          {
            height: "0px",
            onRest: () => {
              dispatch({ type: GET_LIST, payload: deleteTransition[_id].list });
            },
          },
        ],
      });
    } // eslint-disable-next-line
  }, [deleteTransition]);

  return (
    <Draggable draggableId={_id} index={index}>
      {(provided, snapshot) => (
        <Portal disablePortal={!snapshot.isDragging}>
          <animated.div
            style={{
              ...transitionStyles,
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
                  <AnimatedDeleteIcon color="secondary" style={SVGIconColor} />
                </IconButton>
              </Grid>
              <Grid item xs>
                <TextField
                  autoComplete="off"
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
                <AnimatedCheckBox
                  style={SVGIconColor}
                  checked={done || false}
                  onClick={(event) => {
                    handleClickCheckBox(event, _id);
                  }}
                />
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.dragIcon}
                  {...provided.dragHandleProps}
                >
                  <AnimatedDragIcon color="secondary" style={SVGIconColor} />
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
