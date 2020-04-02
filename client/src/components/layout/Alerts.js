import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { deleteAlert } from "../../actions/alerts";

const MyAlerts = () => {
  const [open, setOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState({
    message: "",
    severity: "success"
  });
  const alerts = useSelector(state => state.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alerts !== null && alerts.length > 0) {
      setOpen(true);
    }
  }, [alerts]);

  const handleEnter = () => {
    const { message, severity } = alerts[0];
    setCurrentAlert({ message, severity });
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

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onEnter={handleEnter}
        onClose={handleClose}
        onExited={handleExited}
      >
        <Alert
          elevation={10}
          variant="filled"
          onClose={handleClose}
          severity={currentAlert.severity}
        >
          {currentAlert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default MyAlerts;
