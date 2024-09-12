import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps",
  description: "Playground for different apps",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container py-32 ">{children}</div>;
}
