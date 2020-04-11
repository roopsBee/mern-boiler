import { GET_LISTS, LOGOUT } from "../actions/types";

const initialState = [
  {
    name: "",
    _id: null,
  },
];

const lists = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LISTS:
      return [...payload];
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default lists;
