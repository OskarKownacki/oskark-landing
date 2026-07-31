"use client";

import { useEffect, useState } from "react";

/** Przełącznik motywu: ustawia data-theme na <html>, zapisuje wybór.
 *  Domyślny motyw systemu to "dark". */
export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = window.localStorage.getItem("campfire-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("campfire-theme", theme);
  }, [theme]);
  return { theme, setTheme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Włącz motyw dzienny" : "Włącz motyw nocny"}
      className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-pill)] px-4 py-2 transition-colors hover:border-[var(--color-accent-alt)]"
    >
      {theme === "dark" ? "☾ noc" : "☀ dzień"}
    </button>
  );
}
