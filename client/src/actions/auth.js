import axios from "axios";
import { LOGIN, LOGOUT } from "./types";
import api from "../api/api";

export const logIn = ({ name, email }) => {
  return {
    type: LOGIN,
    payload: { name, email }
  };
};

export const logOut = () => {
  api.delete("auth/logout").then(() => {
    return {
      type: LOGOUT
    };
  });
};
