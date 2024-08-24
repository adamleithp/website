"use client";
import { EyeIcon, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function InputPassword() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label htmlFor="password" className="block dark space-y-1">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          defaultValue={"some-super-password"}
          id="password"
          className="pr-10"
          name="username"
        />
        <Button
          className="absolute inset-0 left-auto  h-full"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          aria-label="Toggle password visibility"
          aria-pressed={showPassword}
          aria-controls="password"
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
