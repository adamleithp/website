"use client";

import { pricingData } from "./pricing-data";
import { RadioGroup } from "./radio-group";
import { RadioGroupItem } from "./radio-group-item";

export function PricingForm() {
  return (
    <form
      onSubmit={() => {
        // handle submit
      }}
      className="flex flex-col gap-6"
    >
      <RadioGroup className="flex gap-12">
        <ul className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-[400px] lg:max-w-none">
          {pricingData.map((option, i) => (
            <label
              htmlFor={option.value + "card"}
              key={option.value}
              className="cursor-pointer space-y-2"
            >
              <RadioGroupItem value={option.value} id={option.value + "card"} />

              {/* Add in your custom card component here */}
              <div className="border border-gray-300 p-4 rounded">
                <h1>${option.price}</h1> {option.value}
              </div>
            </label>
          ))}
        </ul>
      </RadioGroup>
    </form>
  );
}
