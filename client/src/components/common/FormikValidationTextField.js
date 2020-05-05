import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { lightGreen } from "@material-ui/core/colors";

const successColor = lightGreen["A400"];

const successStyle = makeStyles({
  success: {
    "& label": {
      color: successColor,
    },
    "& label.Mui-focused": {
      color: successColor,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: successColor,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: successColor,
      },
      "&:hover fieldset": {
        borderColor: successColor,
      },
      "&.Mui-focused fieldset": {
        borderColor: successColor,
      },
    },
  },
});

const FormikValidationTextField = ({ isSuccessStyle = true, ...props }) => {
  const classes = successStyle();
  let classNames;
  const [field, meta] = useField(props);
  const helperText = meta.error && meta.touched ? meta.error : "";
  if (!meta.error && meta.touched && isSuccessStyle) {
    classNames = classes.success;
  } else {
    classNames = "";
  }
  return (
    <TextField
      {...field}
      {...props}
      error={!!helperText}
      helperText={helperText}
      className={classNames}
      variant={props.variant || "outlined"}
    />
  );
};

export default FormikValidationTextField;
