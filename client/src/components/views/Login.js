import React from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Paper,
  Container,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  Modal,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import FormikValidationTextField from "../common/FormikValidationTextField";
import { logIn } from "../../actions/auth";
import GoogleButton from "../common/googleButton/GoogleButton";
import GithubButton from "../common/githubButton/GithubButton";
import { GITHUB_AUTH_ROUTE, GOOGLE_AUTH_ROUTE } from "../../config";
import { useState } from "react";

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
  container: {
    padding: 0,
  },
  loader: {
    margin: "auto",
    "&:focus": {
      outline: "none",
    },
  },
  modal: {
    display: "flex",
  },
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
    .required("Password is required"),
});

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAuthButtonClick = () => {
    setIsButtonDisabled(true);
  };

  return (
    <div className="Login">
      <Container maxWidth="xs" className={classes.container}>
        <Paper elevation={10} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={({ email, password }) => {
              setIsButtonDisabled(true);
              const user = { email, password };
              dispatch(
                logIn(user, () => {
                  setIsButtonDisabled(false);
                })
              );
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form className={classes.form}>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>

                <FormikValidationTextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                />
                <FormikValidationTextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                />

                <Button
                  className={classes.submit}
                  disabled={isButtonDisabled}
                  color="secondary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid container item justify="center">
              <GoogleButton
                href={GOOGLE_AUTH_ROUTE}
                disabled={isButtonDisabled}
                onClick={handleAuthButtonClick}
              >
                Google
              </GoogleButton>
              <GithubButton
                href={GITHUB_AUTH_ROUTE}
                disabled={isButtonDisabled}
                onClick={handleAuthButtonClick}
              >
                Github
              </GithubButton>
            </Grid>
          </Grid>
        </Paper>

        <Modal open={isButtonDisabled} className={classes.modal}>
          <CircularProgress
            size={70}
            color="secondary"
            className={classes.loader}
          />
        </Modal>
      </Container>
    </div>
  );
}
