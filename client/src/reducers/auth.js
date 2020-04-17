import {
  LOGOUT,
  LOGIN,
  AUTHENTICATE,
  DEAUTHENTICATE,
  SET_AUTHENTICATING_FALSE,
  SET_AUTHENTICATING_TRUE,
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  user: {
    name: "",
    email: "",
  },
  isAuthenticating: false,
};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
    case AUTHENTICATE:
      const user = payload;
      return { ...state, isLoggedIn: true, user };
    case LOGOUT:
    case DEAUTHENTICATE:
      return { ...state, isLoggedIn: false, user: null };
    case SET_AUTHENTICATING_TRUE:
      return { ...state, isAuthenticating: true };
    case SET_AUTHENTICATING_FALSE:
      return { ...state, isAuthenticating: false };
    default:
      return state;
  }
};

export default auth;
