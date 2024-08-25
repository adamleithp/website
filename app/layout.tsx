import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Code2Icon, Linkedin } from "lucide-react";
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
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-black font-sans antialiased",
          fontSans.variable
        )}
      >
        <header className="container py-4 text-white ">
          <nav className="flex justify-between -mx-3">
            <ul className="flex gap-1">
              <li>
                <Button asChild variant={"ghost"} size="sm">
                  <Link href="/">home</Link>
                </Button>
              </li>
              <li>
                <Button asChild variant={"ghost"} size="sm">
                  <Link href="/blog">blog</Link>
                </Button>
              </li>
            </ul>
            <ul className="flex gap-1">
              <li>
                <Button asChild variant={"ghost"} size="icon-sm">
                  <Link href="https://github.com/adamleithp" target="_blank">
                    <Code2Icon size={16} strokeWidth={"1"} />
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant={"ghost"} size="icon-sm">
                  <Link
                    href="https://www.linkedin.com/in/adamleithp/"
                    target="_blank"
                  >
                    <Linkedin size={16} strokeWidth={"1"} />
                  </Link>
                </Button>
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
