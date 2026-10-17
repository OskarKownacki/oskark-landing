// Języki strony — jedno źródło dla routingu (/pl, /en), Studio (pola tłumaczeń) i słownika UI.
// Nowy język = wpis tutaj + tłumaczenie w DICTIONARY + wartości w Sanity.
// Bez Reacta, bo importuje to też konfiguracja i schematy Sanity.
export const LANGUAGES = [
  { id: "pl", title: "Polski" },
  { id: "en", title: "English" },
] as const;

export type Lang = (typeof LANGUAGES)[number]["id"];

// Fallback, gdy w Sanity brakuje tłumaczenia albo przeglądarka nie prosi o żaden z obsługiwanych języków.
export const DEFAULT_LANG: Lang = "pl";

export function isLang(value: string | undefined): value is Lang {
  return LANGUAGES.some(({ id }) => id === value);
}

// Teksty interfejsu, których nie ma w Sanity (etykiety, aria, szablon maila).
// Treść strony (nagłówki, opisy, projekty) tłumaczy się w Studio.
export const DICTIONARY = {
  pl: {
    sectionIndexLabel: "Na tej stronie",
    languageSwitcherLabel: "Język",
    copied: "Skopiowano",
    copyAddress: (email: string) => `Kopiuj adres ${email}`,
    // indeks + 1 = poziom 1..5; długość tablicy wyznacza liczbę segmentów
    skillLevels: ["Uczę się", "Podstawy", "Pewnie", "Biegle", "Ekspert"],
    skillLevelAria: (label: string, value: number, max: number) => `Poziom: ${label}, ${value} z ${max}`,
    screenshotAlt: (title: string | null) => `Zrzut strony: ${title ?? "projekt"}`,
    repoLink: "Zobacz repozytorium →",
    switchToLightTheme: "Włącz motyw dzienny",
    switchToDarkTheme: "Włącz motyw nocny",
    darkThemeName: "☾ noc",
    lightThemeName: "☀ dzień",
    mailSubject: "Zapytanie ze strony",
    mailBody: ["Cześć,", "", "Co budujemy:", "Do kiedy:", "Orientacyjny budżet:"],
  },
  en: {
    sectionIndexLabel: "On this page",
    languageSwitcherLabel: "Language",
    copied: "Copied",
    copyAddress: (email: string) => `Copy address ${email}`,
    skillLevels: ["Learning", "Basics", "Confident", "Fluent", "Expert"],
    skillLevelAria: (label: string, value: number, max: number) => `Level: ${label}, ${value} of ${max}`,
    screenshotAlt: (title: string | null) => `Screenshot: ${title ?? "project"}`,
    repoLink: "View repository →",
    switchToLightTheme: "Switch to day theme",
    switchToDarkTheme: "Switch to night theme",
    darkThemeName: "☾ night",
    lightThemeName: "☀ day",
    mailSubject: "Inquiry from your website",
    mailBody: ["Hi,", "", "What are we building:", "Deadline:", "Rough budget:"],
  },
} satisfies Record<Lang, unknown>;
