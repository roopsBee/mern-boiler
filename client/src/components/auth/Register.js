import React from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Paper,
  Container,
  Typography,
  Avatar
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";

import FormikValidationTextField from "../forms/FormikValidationTextField";
import { setAlert } from "../../actions/alerts";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1, 0, 1),
    padding: theme.spacing(0, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: "center"
  },
  submit: {
    margin: theme.spacing(3, 0, 3, 0)
  }
}));

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(4, "name must be at least 4 characters long")
    .max(20)
    .required(),
  email: yup
    .string()
    .trim()
    .max(40)
    .required("Required!")
    .email("Enter a valid Email"),
  password: yup
    .string()
    .min(6, "Password must be atleast 6 characters long")
    .max(20)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password")
});

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className="Register">
      <Container maxWidth="xs">
        <Paper elevation={5} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
            onSubmit={({ name, email, password }, { setSubmitting }) => {
              const newUser = { name, email, password };
              const config = {
                headers: {
                  "Content-Type": "application/json"
                }
              };
              axios
                .post("http://localhost:5000/user", newUser, config)
                .then(({ data }) => {
                  dispatch(setAlert(data.message, data.severity));
                })
                .catch(error => {
                  const { message, severity } = error.response.data;
                  dispatch(setAlert(message, severity));
                })
                .then(() => {
                  setSubmitting(false);
                });
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form className={classes.form}>
                <Typography component="h1" variant="h5">
                  Register
                </Typography>
                <FormikValidationTextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                />
                <FormikValidationTextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                />
                <FormikValidationTextField
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                />
                <FormikValidationTextField
                  margin="normal"
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
                <Button
                  className={classes.submit}
                  disabled={isSubmitting}
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </div>
  );
}
