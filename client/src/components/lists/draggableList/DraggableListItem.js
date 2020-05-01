import React from "react";
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
}) {
  const classes = useStyles();
  const _id = id;
  return (
    <Draggable draggableId={_id} index={index}>
      {(provided, snapshot) => (
        <Portal disablePortal={!snapshot.isDragging}>
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
        </Portal>
      )}
    </Draggable>
  );
}

export default DraggableListItem;
