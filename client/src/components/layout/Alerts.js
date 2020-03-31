import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { setAlert, deleteAlert } from "../../actions";

const MyAlerts = () => {
  const [open, setOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({ message: "", severity: "" });
  const alerts = useSelector(state => state.alerts);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setAlert("testing alerts", "success"));
    setOpen(true);
  };

  const handleEnter = () => {
    const { message, severity } = alerts[0];
    setNewAlert({ message, severity });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    dispatch(deleteAlert());
    if (alerts.length > 1) {
      setOpen(true);
    }
  };
  console.log("render");

  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>
        Open snackbar
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onEnter={handleEnter}
        onClose={handleClose}
        onExited={handleExited}
      >
        <Alert
          elevation={10}
          variant="filled"
          onClose={handleClose}
          severity={newAlert.severity}
        >
          {newAlert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default MyAlerts;
