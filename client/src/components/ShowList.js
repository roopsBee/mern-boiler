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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "../actions/lists";
import { handleError } from "../actions/actionHelpers";

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

  useEffect(() => {
    dispatch(getList(listId));
  }, [listId, dispatch]);

  useEffect(() => {
    list.items.forEach(({ text, id }) => {
      setTextField((state) => ({ ...state, [id]: text }));
    });
  }, [list]);

  const handleChange = (event, id) => {
    setTextField({ ...textField, [id]: event.target.value });
  };

  const handleBlur = (event, id) => {
    console.log("blur");
  };

  let items = list.items.map(({ id, text, done }, index) => {
    return (
      <ListItem key={id || index}>
        <Grid item>
          <IconButton>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            multiline
            value={textField[id] || ""}
            onChange={(event) => {
              handleChange(event, id);
            }}
            onBlur={(event) => {
              handleBlur(event, id);
            }}
          />
        </Grid>
        <Grid item>
          <IconButton>
            <CheckBoxIcon className={classes.icon} fontSize="large" />
          </IconButton>
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
            <List>{items}</List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ShowList;
