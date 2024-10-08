import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Code2Icon, Linkedin } from "lucide-react";
import Link from "next/link";
import { NavLink } from "@/components/sections/nav-link";
import { META_DATA_DEFAULTS, VIEWPORT_DEFAULTS } from "@/lib/seo";
import { CSPostHogProvider } from "./providers";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = META_DATA_DEFAULTS;
export const viewport = VIEWPORT_DEFAULTS;

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <CSPostHogProvider>
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
                  <NavLink href="/">home</NavLink>
                </li>
                <li>
                  <NavLink href="/blog">blog</NavLink>
                </li>
                <li>
                  <NavLink href="/apps">apps</NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <Separator />

          <main>{children}</main>
          <Analytics />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
