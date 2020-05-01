import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import arrayMove from "array-move";
import List from "./List";

function DraggableListItems({ listId }) {
  const list = useSelector((state) => state.currentList);
  const [items, setItems] = useState(list.items);

  const onDragEnd = (result) => {
    // dropped outside droppable or no movement
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }
    setItems(arrayMove(items, result.source.index, result.destination.index));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"list"}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <List list={list} listId={listId} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DraggableListItems;
