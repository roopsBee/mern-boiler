import { v4 as uuid } from "uuid";
import { SET_ALERT, DELETE_ALERT } from "./types";

// Alerts
export const setAlert = (message, severity) => {
  const id = uuid();
  return {
    type: SET_ALERT,
    payload: { id, message, severity }
  };
};

export const deleteAlert = () => {
  return {
    type: DELETE_ALERT
  };
};
