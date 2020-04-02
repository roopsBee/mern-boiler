import { LOGOUT, LOGIN } from "../actions/types";

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
      const user = payload;
      return { ...state, isLoggedIn: true, user };
    case LOGOUT:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};

export default auth;
