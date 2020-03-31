import { combineReducers } from "redux";
import { SET_ALERT, DELETE_ALERT } from "../actions/types";

const alerts = (state = [], { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case DELETE_ALERT:
      return state.filter((alert, index) => 0 !== index);
    default:
      return state;
  }
};

export default combineReducers({ alerts });
