import type { Metadata } from "next";
import { Poltawski_Nowy, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { SanityLive } from "@/lib/sanity/live";
import { LANGUAGES } from "@/lib/i18n";

// latin-ext niesie polskie znaki — bez niego „ąęł” dociągają się dopiero po pierwszym renderze
const display = Poltawski_Nowy({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-loaded",
  style: ["normal", "italic"],
});
const body = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-loaded",
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

// /pl i /en budują się statycznie; inny prefiks to 404 (ścieżki bez prefiksu przekierowuje proxy.ts).
export function generateStaticParams() {
  return LANGUAGES.map(({ id }) => ({ lang: id }));
}
export const dynamicParams = false;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      data-theme="dark"
      className={cn("h-full", "antialiased", display.variable, body.variable, mono.variable, "font-sans" )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
