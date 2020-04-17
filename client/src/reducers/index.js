import { combineReducers } from "redux";
import alerts from "./alerts";
import auth from "./auth";
import lists from "./lists";
import currentList from "./currentList";

export default combineReducers({ alerts, auth, lists, currentList });
