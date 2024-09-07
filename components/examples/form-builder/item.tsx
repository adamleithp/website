import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemType } from ".";
import { Input } from "@/components/ui/input";

interface ItemProps extends ItemType {
  onInputChange: (value: string) => void;
  onRemove: () => void; // Add onRemove prop to remove the item
}

const Item: React.FC<ItemProps> = ({
  id,
  name,
  type,
  value,
  defaultValue,
  onInputChange,
  onRemove,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { id, name, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
      className={cn("flex-1 p-4 m-2 border-2", {
        "bg-gray-900": isDragging,
        "bg-black": !isDragging,
      })}
    >
      {type === "text" && <p className="text-white">{name}</p>}
      {type === "input" && (
        <Input
          type="text"
          value={value || defaultValue || ""}
          className="w-full p-2 "
          onChange={(e) => onInputChange(e.target.value)}
        />
      )}

      <button onClick={onRemove} style={{ marginLeft: "10px" }}>
        Remove
      </button>
    </div>
  );
};

export default Item;
