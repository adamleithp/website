"use client";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./column";

export type ItemElementType = "text" | "input";
export interface ItemType {
  id: number;
  name: string;
  type: ItemElementType;
  defaultValue?: string;
  value?: string;
}

const initialLeftColumn: ItemType[] = [
  { id: 1, name: "Item 1", type: "text" },
  {
    id: 2,
    name: "Item 2",
    type: "input",
    defaultValue: "Item 2 default value",
  },
  { id: 3, name: "Item 3", type: "text" },
];

const initialRightColumn: ItemType[] = [
  { id: 4, name: "Item 4", type: "text" },
  { id: 5, name: "Item 5", type: "text" },
  {
    id: 6,
    name: "Item 6",
    type: "input",
    defaultValue: "Item 6 default value",
  },
];

const FormBuilder: React.FC = () => {
  const [leftColumn, setLeftColumn] = useState<ItemType[]>(initialLeftColumn);
  const [rightColumn, setRightColumn] =
    useState<ItemType[]>(initialRightColumn);

  // Handle input changes by updating the correct item in its column
  const handleInputChange = (
    id: number,
    newValue: string,
    column: "left" | "right"
  ) => {
    if (column === "left") {
      setLeftColumn((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, value: newValue } : item
        )
      );
    } else {
      setRightColumn((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, value: newValue } : item
        )
      );
    }
  };

  // Move item between columns using item.id to look it up
  const moveItem = (id: number, targetColumn: "left" | "right") => {
    let itemToMove: ItemType | undefined;

    // Moving from right to left
    if (targetColumn === "left") {
      itemToMove = rightColumn.find((i) => i.id === id);
      if (itemToMove) {
        setRightColumn((prev) => prev.filter((i) => i.id !== id));
        setLeftColumn((prev) => {
          const newColumn = [...prev, itemToMove as ItemType]; // Ensure itemToMove is of type ItemType
          return newColumn;
        });
      }
    }
    // Moving from left to right
    else {
      itemToMove = leftColumn.find((i) => i.id === id);
      if (itemToMove) {
        setLeftColumn((prev) => prev.filter((i) => i.id !== id));
        setRightColumn((prev) => {
          const newColumn = [...prev, itemToMove as ItemType]; // Ensure itemToMove is of type ItemType
          return newColumn;
        });
      }
    }
  };

  const removeItem = (item: ItemType) => {
    setLeftColumn((prev) => prev.filter((i) => i.id !== item.id));
    setRightColumn((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Column
          title="Left Column"
          items={leftColumn}
          onItemDrop={(id) => moveItem(id, "left")}
          onRemoveItem={removeItem}
          onInputChange={(id, value) => handleInputChange(id, value, "left")}
        />
        <Column
          title="Right Column"
          items={rightColumn}
          onItemDrop={(id) => moveItem(id, "right")}
          onRemoveItem={removeItem}
          onInputChange={(id, value) => handleInputChange(id, value, "right")}
        />
      </div>
    </DndProvider>
  );
};

export default FormBuilder;
