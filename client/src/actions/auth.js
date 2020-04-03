import { LOGIN, LOGOUT, AUTHENTICATE, DEAUTHENTICATE } from "./types";
import api from "../api/api";
import { setAlert } from "./alerts";

export const logIn = ({ name, email }) => {
  return {
    type: LOGIN,
    payload: { name, email }
  };
};

export const logOut = () => dispatch => {
  api
    .delete("auth/logout")
    .then(({ data }) => {
      const { message, severity } = data;
      dispatch(setAlert(message, severity));
      dispatch({
        type: LOGOUT
      });
    })
    .catch(error => {
      console.log(error);
      const { message, severity } = error.response.data;
      dispatch(setAlert(message, severity));
    });
};

export const isAuthenticated = () => dispatch => {
  api.get("/auth/isauth").then(res => {
    if (res.data.isAuthenticated) {
      const { user } = res.data;
      dispatch({ type: AUTHENTICATE, payload: user });
    } else {
      dispatch({ type: DEAUTHENTICATE });
    }
  });
};
