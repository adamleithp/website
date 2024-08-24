import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { P } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Adam Leith",
  description: "The personal website of Adam Leith",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-black font-sans antialiased",
          fontSans.variable
        )}
      >
        <header className="container py-4 text-white ">
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link href="/">home</Link>
              </li>
              <li>
                <Link href="/blog">blog</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Separator className="-mx-4" />

        <main>{children}</main>
      </body>
    </html>
  );
}
