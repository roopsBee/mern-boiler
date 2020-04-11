import { GET_LIST } from "../actions/types";

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
};

const currentList = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LIST:
      return { ...payload };
    default:
      return state;
  }
};

export default currentList;
