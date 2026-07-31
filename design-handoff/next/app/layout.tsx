import type { Metadata } from "next";
import { Newsreader, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// UWAGA: display serif to Instrument Serif w prototypie. next/font/google
// eksportuje go jako Instrument_Serif — podmień import, jeśli wolisz:
// import { Instrument_Serif } from "next/font/google";
const display = Newsreader({ subsets: ["latin"], variable: "--font-display-loaded", weight: ["400", "500", "600"], style: ["normal", "italic"] });
const body = Manrope({ subsets: ["latin"], variable: "--font-body-loaded", weight: ["400", "500", "600", "700"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono-loaded", weight: ["400", "500"] });

export const metadata: Metadata = { title: "Campfire", description: "Portfolio" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme="dark" to DOMYŚLNY motyw systemu; "light" = wariant dzienny.
    <html lang="pl" data-theme="dark" className={[display.variable, body.variable, mono.variable].join(" ")}>
      <body>{children}</body>
    </html>
  );
}
