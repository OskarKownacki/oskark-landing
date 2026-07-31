import type { Metadata } from "next";
import { Instrument_Serif, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  weight: ["400"],
  style: ["normal", "italic"],
});
const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  weight: ["400", "500", "600", "700"],
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Campfire",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      data-theme="dark"
      className={cn("h-full", "antialiased", display.variable, body.variable, mono.variable, "font-sans" )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
