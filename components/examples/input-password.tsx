"use client";
import { EyeIcon, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <label htmlFor={id} className="block dark space-y-1">
        {label && <Label>{label}</Label>}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id={id}
            className={cn("pr-10", className)}
            ref={ref}
            {...props}
          />
          <Button
            className="absolute inset-0 left-auto  h-full"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            aria-label="Toggle password visibility"
            aria-pressed={showPassword}
            aria-controls={id}
            size="icon"
            variant={"ghost"}
          >
            {showPassword ? (
              <EyeOff color="white" strokeWidth="1" size={16} />
            ) : (
              <EyeIcon color="white" strokeWidth="1" size={16} />
            )}
          </Button>
        </div>
      </label>
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
