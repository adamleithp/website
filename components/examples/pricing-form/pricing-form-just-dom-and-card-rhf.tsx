"use client";

import { cn } from "@/lib/utils";
import { pricingData, PricingValueT } from "./pricing-data";
import { RadioGroup } from "./radio-group";
import { RadioGroupItem } from "./radio-group-item";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/ui/button";

// Define the form values
type FormValues = {
  choice: PricingValueT;
};

export function PricingForm() {
  // Create a schema for yup
  const schema = yup.object({
    choice: yup
      .string()
      .oneOf(
        pricingData.map((option) => option.value),
        "Please select a plan."
      )
      .required(),
  });

  // Create a form with react-hook-form
  const { handleSubmit, control, watch } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      // Set the default value to the first option
      choice: "BEGINNER",
    },
  });

  // Allows us to get the selected value
  const selected = watch("choice");

  // Handle the form submission
  const onSubmit = ({ choice }: FormValues) => {
    console.log("Submitted", choice);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Control our inputs */}
        <Controller
          control={control}
          name="choice"
          render={({ field }) => (
            <RadioGroup
              className="flex gap-12"
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <ul className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-[400px] lg:max-w-none">
                {/* Loop over the pricing data and create a card for each option */}
                {pricingData.map((option, i) => (
                  <label
                    htmlFor={option.value + "rhf"}
                    key={option.value}
                    className="cursor-pointer focus-element"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value + "rhf"}
                      hidden
                    />

                    {/* Add in your custom card component here */}
                    <div
                      className={cn("border border-gray-300 p-4 rounded", {
                        "bg-gray-900": selected === option.value, // if pending is true apply padding
                      })}
                    >
                      <h1>${option.price}</h1> {option.value}
                    </div>
                  </label>
                ))}
              </ul>
            </RadioGroup>
          )}
        />
        <Button type="submit" variant={"outline"}>
          Submit
        </Button>
      </form>
      <p>Selected: {selected}</p>
    </>
  );
}
