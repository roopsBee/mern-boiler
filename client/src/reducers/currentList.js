import {
  GET_LIST,
  SET_LOADING_LIST_FALSE,
  SET_LOADING_LIST_TRUE,
  REORDER_LIST,
} from "../actions/types";

const initialState = {
  name: null,
  _id: null,
  items: [
    {
      _id: null,
      text: null,
      done: false,
    },
  ],
  isLoadingList: false,
};

const currentList = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LIST:
      return { ...state, ...payload };
    case REORDER_LIST:
      return { ...state, items: payload };
    case SET_LOADING_LIST_TRUE:
      return { ...state, isLoadingList: true };
    case SET_LOADING_LIST_FALSE:
      return { ...state, isLoadingList: false };
    default:
      return state;
  }
};

export default currentList;
