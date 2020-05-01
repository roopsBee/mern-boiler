import api from "../api/api";
import { GET_LIST } from "./types";

export const addItem = (listId, formData, onComplete) => (dispatch) => {
  api
    .post(`list/${listId}/item`, formData)
    .then(({ data }) => {
      const { list } = data;
      dispatch({ type: GET_LIST, payload: list });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      onComplete();
    });
};

export const updateItem = (listId, item) => (dispatch) => {
  api
    .patch(`/list/${listId}/item/${item._id}`, item)
    .then(({ data }) => {
      const { list } = data;
      dispatch({ type: GET_LIST, payload: list });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteItem = (listId, itemId, onDeleteList) => (dispatch) => {
  api
    .delete(`/list/${listId}/item/${itemId}`)
    .then(({ data }) => {
      const { list } = data;
      onDeleteList(list);
    })
    .catch((error) => {
      console.log(error);
    });
};
