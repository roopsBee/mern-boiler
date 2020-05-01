import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import arrayMove from "array-move";
import List from "./List";

function DraggableListItems() {
  const currentItems = useSelector((state) => state.currentList.items);
  const [items, setItems] = useState(currentItems);

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
            <List items={items} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DraggableListItems;
