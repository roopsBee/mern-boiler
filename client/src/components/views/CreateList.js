import React from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Paper,
  Container,
  Typography,
  Avatar,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import FormikValidationTextField from "../forms/FormikValidationTextField";
import { createList } from "../../actions/lists";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1, 0, 1),
    padding: theme.spacing(0, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 3, 0),
  },
}));

const validationSchema = yup.object().shape({
  name: yup.string().trim().max(40).required("Required!"),
});

export default function CreateList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  return (
    <Container maxWidth="xs">
      <Paper elevation={5} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New List
        </Typography>
        <Formik
          initialValues={{
            name: "",
          }}
          onSubmit={(formData, { setSubmitting }) => {
            dispatch(
              createList(formData, (newList) => {
                setSubmitting(false);
                if (newList) {
                  history.push(`/list/${newList._id}`);
                }
              })
            );
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <FormikValidationTextField
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                color="secondary"
                name="name"
              />
              <Button
                className={classes.submit}
                disabled={isSubmitting}
                color="secondary"
                variant="contained"
                type="submit"
                fullWidth
              >
                Create List
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}
