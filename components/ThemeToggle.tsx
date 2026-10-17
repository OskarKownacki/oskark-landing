"use client";

import { useEffect, useState } from "react";
import { DICTIONARY, type Lang } from "@/lib/i18n";

/** Przełącznik motywu: ustawia data-theme na <html>, zapisuje wybór.
 *  Domyślny motyw systemu to "dark". */
export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = window.localStorage.getItem("campfire-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading persisted theme after mount, avoids SSR/client mismatch
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("campfire-theme", theme);
  }, [theme]);
  return { theme, setTheme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

export function ThemeToggle({ lang }: { lang: Lang }) {
  const { theme, toggle } = useTheme();
  const t = DICTIONARY[lang];
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? t.switchToLightTheme : t.switchToDarkTheme}
      className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-pill)] px-4 py-2 transition-colors hover:border-[var(--color-accent-alt)]"
    >
      {theme === "dark" ? t.darkThemeName : t.lightThemeName}
    </button>
  );
}
