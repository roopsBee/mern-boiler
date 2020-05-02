import React from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import arrayMove from "array-move";
import { useDispatch } from "react-redux";
import List from "./List";
import { REORDER_LIST } from "../../../actions/types";
import { reOrderList } from "../../../actions/lists";

function DraggableListItems({ listId }) {
  const list = useSelector((state) => state.currentList);
  const dispatch = useDispatch();

  const onDragEnd = ({ destination, source }) => {
    // dropped outside droppable or no movement
    if (!destination || destination.index === source.index) {
      return;
    }

    const order = { from: source.index, to: destination.index };
    const newOrderedList = arrayMove(list.items, order.from, order.to);

    //update local state for ux then update backend
    dispatch({ type: REORDER_LIST, payload: newOrderedList });
    dispatch(reOrderList(listId, order));
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
