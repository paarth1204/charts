// components/DraggableList.tsx
"use client";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"; // Updated import

interface Item {
  id: string;
  title: string; // Corrected typo from "tile" to "title"
  emoji: string;
}

const initialItems: Item[] = [
  { id: "1", title: "cricket", emoji: "🏏" },
  { id: "2", title: "football", emoji: "⚽" },
  { id: "3", title: "basketball", emoji: "🏀" },
  { id: "4", title: "tennis", emoji: "🎾" },
  { id: "5", title: "archery", emoji: "🏹" },
];

const DraggableList: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    const reorderedItems = [...items]; // Spread operator for immutability
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ padding: "16px", width: "250px" }} // Basic styling for clarity
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: "none",
                      padding: "16px",
                      margin: "0 0 8px 0",
                      minHeight: "50px",
                      backgroundColor: "#ffffff",
                      color: "black",
                      border: "1px solid lightgrey", // Border for better visibility
                      borderRadius: "4px",
                      ...provided.draggableProps.style,
                    }}
                  >
                    {item.emoji} {item.title}{" "}
                    {/* Corrected typo from "tile" to "title" */}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
