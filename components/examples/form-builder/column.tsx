import React from "react";
import { useDrop } from "react-dnd";
import Item from "./item";
import { ItemElementType, ItemType } from ".";

interface ColumnProps {
  title: string;
  items: ItemType[];
  onItemDrop: (itemId: number) => void;
  onRemoveItem: (item: ItemType) => void;
  onInputChange: (id: number, value: string) => void; // Function to handle input changes
}

const Column: React.FC<ColumnProps> = ({
  title,
  items,
  onItemDrop,
  onRemoveItem,
  onInputChange,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: (item: ItemType) => {
      onItemDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      style={{
        flex: 1,
        padding: "20px",
        margin: "10px",
        border: "1px solid black",
        backgroundColor: isOver ? "#f0f0f0" : "white",
      }}
    >
      <h3>{title}</h3>
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          value={item.value || item.defaultValue || ""}
          name={item.name}
          type={item.type}
          onRemove={() => onRemoveItem(item)}
          onInputChange={(value) => onInputChange(item.id, value)} // Pass the input change handler
        />
      ))}
    </div>
  );
};

export default Column;
