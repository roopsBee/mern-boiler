import { LOGIN, LOGOUT, AUTHENTICATE, DEAUTHENTICATE } from "./types";
import api from "../api/api";
import { setAlert } from "./alerts";
import { handleError } from "./actionHelpers";

export const logIn = (userFormData, onComplete) => (dispatch) => {
  let isLoggedin = false;
  api
    .post("auth/login", userFormData)
    .then(({ data }) => {
      const { message, severity, user } = data;
      dispatch(setAlert(message, severity));
      dispatch({ type: LOGIN, payload: user });
      isLoggedin = true;
    })
    .catch((error) => {
      handleError(error);
      const { user } = error.response.data;
      if (user) {
        dispatch({ type: LOGIN, payload: user });
      }
    })
    .then(() => {
      if (!isLoggedin) {
        onComplete();
      }
    });
};

export const logOut = () => (dispatch) => {
  api
    .delete("auth/logout")
    .then(({ data }) => {
      const { message, severity } = data;
      dispatch(setAlert(message, severity));
      dispatch({ type: LOGOUT });
    })
    .catch((error) => {
      handleError(error);
    });
};

export const isAuthenticated = () => (dispatch) => {
  api
    .get("/auth/isauth")
    .then((res) => {
      if (res.data.isAuthenticated) {
        const { user } = res.data;
        dispatch({ type: AUTHENTICATE, payload: user });
      } else {
        dispatch({ type: DEAUTHENTICATE });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
