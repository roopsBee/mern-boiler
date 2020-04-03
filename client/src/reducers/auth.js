import { LOGOUT, LOGIN, AUTHENTICATE, DEAUTHENTICATE } from "../actions/types";

const initialState = {
  isLoggedIn: false,
  user: {
    name: "",
    email: ""
  }
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
    default:
      return state;
  }
};

export default auth;
