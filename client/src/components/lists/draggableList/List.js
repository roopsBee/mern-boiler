import React from "react";
import DraggableListItem from "./DraggableListItem";

const List = ({ items }) => {
  return items.map((item, index) => {
    return <DraggableListItem key={item._id} item={item} index={index} />;
  });
};

export default List;
