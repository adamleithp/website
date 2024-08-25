"use client";
import { EyeIcon, EyeOff, SearchIcon, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function InputSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [value]);

  const clearSearch = () => {
    setValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <label htmlFor="search" className="block dark space-y-1">
      <Label htmlFor="search">Search</Label>
      <div className="relative">
        <Input
          type={"text"}
          value={value}
          id="search"
          onChange={(event) => setValue(event.target.value)}
          ref={inputRef}
          className="pr-10"
        />
        {value === "" ? (
          <Button
            className="absolute inset-0 left-auto h-full"
            size="icon"
            variant={"ghost"}
            disabled
          >
            <SearchIcon color="white" strokeWidth="1" size={16} />
          </Button>
        ) : (
          <Button
            className="absolute inset-0 left-auto h-full"
            onClick={clearSearch}
            aria-label="Clear search"
            size="icon"
            variant={"ghost"}
          >
            <XCircle color="white" strokeWidth="1" size={16} />
          </Button>
        )}
      </div>
    </label>
  );
}
