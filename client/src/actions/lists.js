import api from "../api/api";
import { setAlert } from "./alerts";
import {
  GET_LISTS,
  GET_LIST,
  SET_LOADING_LIST_FALSE,
  SET_LOADING_LIST_TRUE,
} from "./types";
import { handleError } from "./actionHelpers";

export const getLists = () => (dispatch) => {
  api
    .get("/list")
    .then(({ data }) => {
      const { lists } = data;
      dispatch({ type: GET_LISTS, payload: lists });
    })
    .catch((error) => {
      handleError(error);
    });
};

export const createList = (formData, onComplete) => (dispatch) => {
  let newList = null;
  api
    .post("/list", formData)
    .then(({ data }) => {
      const { message, severity, list } = data;
      newList = list;
      dispatch(getLists());
      dispatch(setAlert(message, severity));
      dispatch(getList(list._id));
    })
    .catch((error) => {
      handleError(error);
    })
    .then(() => {
      onComplete(newList);
    });
};

export const getList = (_id) => (dispatch) => {
  dispatch({ type: SET_LOADING_LIST_TRUE });
  api
    .get(`/list/${_id}`)
    .then(({ data }) => {
      const { list } = data;
      dispatch({ type: GET_LIST, payload: list });
    })
    .catch((error) => {
      handleError(error);
    })
    .finally(() => {
      dispatch({ type: SET_LOADING_LIST_FALSE });
    });
};

export const updateListName = (listId, name) => (dispatch) => {
  api
    .patch(`/list/${listId}`, { name })
    .then(({ data }) => {
      const { list } = data;
      dispatch({ type: GET_LIST, payload: list });
      dispatch(getLists());
    })
    .catch((error) => {
      console.log(error);
    });
};

export const reOrderList = (listId, order) => (dispatch) => {
  api
    .patch(`/list/${listId}/reorder`, order)
    .then(({ data }) => {
      const { list } = data;
      dispatch({ type: GET_LIST, payload: list });
    })
    .catch((error) => {
      handleError(error);
    });
};

export const deleteList = (listId, onSuccess) => (dispatch) => {
  api
    .delete(`/list/${listId}`)
    .then(({ data }) => {
      const { message, severity } = data;
      dispatch(getLists());
      dispatch(setAlert(message, severity));
      onSuccess();
    })
    .catch((error) => {
      handleError(error);
    });
};
