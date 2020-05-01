import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DraggableListItem from "./DraggableListItem";
import { setAlert } from "../../../actions/alerts";
import { updateItem, deleteItem } from "../../../actions/item";

const List = ({ list, listId }) => {
  const dispatch = useDispatch();
  let [textField, setTextField] = useState({});
  let [done, setDone] = useState({});
  const [focusValue, setFocusValue] = useState("");

  useEffect(() => {
    list.items.forEach(({ text, _id, done }) => {
      setTextField((state) => ({ ...state, [_id]: text }));
      setDone((state) => ({ ...state, [_id]: done }));
    });
  }, [list]);

  const handleChange = (event, id) => {
    setTextField({ ...textField, [id]: event.target.value });
  };

  const handleBlur = (event, _id) => {
    if (focusValue !== textField[_id]) {
      if (textField[_id] === "") {
        dispatch(setAlert("List Name cannot be empty", "error"));
        setTextField((state) => ({ ...state, [_id]: focusValue }));
      } else {
        let item = { text: textField[_id], done: done[_id], _id };
        dispatch(updateItem(listId, item));
      }
    }
  };

  const handleClickDelete = (event, id) => {
    dispatch(deleteItem(listId, id));
  };

  const handleClickCheckBox = (event, _id) => {
    setDone((state) => ({ ...state, [_id]: !done[_id] }));
    let item = { text: textField[_id], done: !done[_id], _id };
    dispatch(updateItem(listId, item));
  };

  const handleFocus = (event) => {
    setFocusValue(event.target.value);
  };

  return list.items.map((item, index) => {
    const _id = item._id;
    return (
      <DraggableListItem
        key={_id}
        id={_id}
        textField={textField[_id]}
        done={done[_id]}
        index={index}
        handleClickCheckBox={handleClickCheckBox}
        handleClickDelete={handleClickDelete}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleFocus={handleFocus}
      />
    );
  });
};

export default List;
