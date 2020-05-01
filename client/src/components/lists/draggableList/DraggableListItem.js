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
import DeleteIcon from "@material-ui/icons/Delete";
import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles({
  root: {
    width: "330px",
    paddingLeft: 0,
    paddingRight: 0,
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
            classes={classes}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
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
          </ListItem>
        </Portal>
      )}
    </Draggable>
  );
}

export default DraggableListItem;
