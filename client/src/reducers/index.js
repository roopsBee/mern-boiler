import { combineReducers } from "redux";
import alerts from "./alerts";
import auth from "./auth";
import lists from "./lists";
import currentList from "./currentList";
import app from "./app";

export default combineReducers({ alerts, auth, lists, currentList, app });
