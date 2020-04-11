import store from "../store";
import { setAlert } from "./alerts";

export const handleError = (error) => {
  console.log(error);
  const { message, severity } = error.response.data;
  store.dispatch(setAlert(message, severity));
};
