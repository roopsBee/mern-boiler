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

import FormikValidationTextField from "../forms/FormikValidationTextField";

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
    .required("Password is required")
});

export default function Login() {
  const classes = useStyles();

  return (
    <div className="Login">
      <Container maxWidth="xs">
        <Paper elevation={5} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={async ({ email, password }) => {
              const user = { email, password };
              const config = {
                headers: {
                  "Content-Type": "application/json"
                }
              };
              const res = await axios
                .post("http://localhost:5000/auth/login", user, config)
                .then(res => console.log(res.data))
                .catch(e => console.log(e));
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form className={classes.form}>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>

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

                <Button
                  className={classes.submit}
                  disabled={isSubmitting}
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </div>
  );
}
