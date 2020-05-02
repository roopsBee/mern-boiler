import React from "react";
import { Formik, Form } from "formik";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { IconButton, ListItem } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

import FormikValidationTextField from "../forms/FormikValidationTextField";
import { addItem } from "../../actions/item";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    paddingLeft: "30px",
    paddingRight: "0px",
    width: "300px",
  },
}));

const validationSchema = yup.object().shape({
  text: yup.string().trim().max(40).required("Cannot be empty"),
});

const AddItem = ({ listId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        text: "",
      }}
      onSubmit={(formData, { setSubmitting, resetForm }) => {
        dispatch(
          addItem(listId, formData, () => {
            setSubmitting(false);
            resetForm();
          })
        );
      }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form>
          <Grid container justify="center" alignItems="center">
            <ListItem className={classes.root}>
              <Grid item xs={10}>
                <FormikValidationTextField
                  isSuccessStyle={false}
                  fullWidth
                  color="secondary"
                  id="text"
                  label="New Item"
                  name="text"
                  variant="standard"
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <IconButton disabled={isSubmitting} type="submit">
                  <AddBoxIcon color="secondary" />
                </IconButton>
              </Grid>
            </ListItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default AddItem;
