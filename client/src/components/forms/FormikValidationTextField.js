import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const successStyle = makeStyles({
  success: {
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "green"
      },
      "&:hover fieldset": {
        borderColor: "green"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      }
    }
  }
});

const FormikValidationTextField = ({ ...props }) => {
  const classes = successStyle();
  let classNames;
  const [field, meta] = useField(props);
  const helperText = meta.error && meta.touched ? meta.error : "";
  if (!meta.error && meta.touched) {
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
      variant="outlined"
    />
  );
};

export default FormikValidationTextField;
