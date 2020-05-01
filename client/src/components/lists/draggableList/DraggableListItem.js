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

function DraggableListItem({ item: { text, done, _id }, index }) {
  const classes = useStyles();
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
              <IconButton>
                <DeleteIcon color="secondary" />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="none"
                color="secondary"
                fullWidth
                value={text || ""}
              />
            </Grid>
            <Grid item>
              <Checkbox checked={done} />
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
