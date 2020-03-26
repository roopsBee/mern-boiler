import React from "react";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  FormHelperText
} from "@material-ui/core";
import { Formik, Field, Form, useField, useFormikContext } from "formik";
import * as yup from "yup";

const MyTextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  const helperText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      {...props}
      error={!!helperText}
      helperText={helperText}
    />
  );
};

const Register = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
      onSubmit={data => {
        console.log(JSON.stringify(data));
      }}
    >
      <Form>
        <MyTextField name="name" variant="outlined" label="name" />
        <MyTextField
          name="email"
          variant="outlined"
          label="email"
          type="email"
        />
        <MyTextField
          name="password"
          variant="outlined"
          label="password"
          type="password"
        />
        <MyTextField
          name="confirmPassword"
          variant="outlined"
          label="Confirm Password"
          type="password"
        />
      </Form>
    </Formik>
  );
};

export default Register;
