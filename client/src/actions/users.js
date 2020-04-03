import api from "../api/api";
import { setAlert } from "./alerts";

export const registerUser = (newUser, onComplete) => dispatch => {
  api
    .post("/user", newUser)
    .then(({ data }) => {
      dispatch(setAlert(data.message, data.severity));
    })
    .catch(error => {
      const { message, severity } = error.response.data;
      dispatch(setAlert(message, severity));
    })
    .then(() => {
      onComplete();
    });
};
