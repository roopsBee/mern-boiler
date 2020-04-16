import { SET_LOADING } from "../actions/types";

const initialState = {
  isLoading: false,
};

const app = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: payload };
    default:
      return state;
  }
};
export default app;
