export type PricingValueT = "BEGINNER" | "AMATEUR" | "PRO";

export const pricingData: {
  value: PricingValueT;
  price: number;
}[] = [
  {
    value: "BEGINNER",
    price: 10,
  },
  {
    value: "AMATEUR",
    price: 20,
  },
  {
    value: "PRO",
    price: 30,
  },
];
