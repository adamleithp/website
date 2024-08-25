"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  // get actuve route
  const pathname = usePathname();

  return (
    <Button
      asChild
      variant={"ghost"}
      size="sm"
      className={pathname === href ? "underline" : ""}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
