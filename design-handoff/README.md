# Handoff: Campfire — design system (Next.js + Tailwind)

## Overview

Campfire to dark-first system dla strony-wizytówki / portfolio developera. Cel emocjonalny: użytkownik ma poczucie „jestem u siebie" — obóz pod nocnym niebem w górach, ciepłe światło latarni, relacja partnerska, nie transakcja. Motyw nocny jest domyślny; motyw dzienny („świt") to ten sam układ na ciepłym pergaminie. Zmiana motywu odtwarza wschód/zachód ciał niebieskich.

## About the design files

Pliki w tej paczce to **referencje projektowe stworzone w HTML/CSS** — prototyp pokazujący docelowy wygląd i zachowanie, nie kod produkcyjny do skopiowania 1:1. Zadanie polega na **odtworzeniu tego designu w docelowym repo (Next.js App Router + Tailwind)** zgodnie z jego konwencjami. Wyjątki, które można wziąć dosłownie:

- `tokens/*.css` — tokeny są docelowym źródłem prawdy, przenieś je bez zmian wartości,
- `next/components/MountainScene.tsx` — gotowa scena hero (ścieżki SVG grani obrysowane ze zdjęcia; przepisywanie ich ręcznie nie ma sensu).

## Fidelity

**High-fidelity.** Kolory, typografia, skala odstępów, cienie i czasy animacji są finalne i przeliczone pod WCAG AA. Odtwarzaj wiernie; jeśli coś musi się zmienić, zmieniaj wartość tokenu, nie wartość w komponencie.

## Target stack & install

Zakładam Next.js (App Router) + Tailwind v4 + TypeScript.

1. Skopiuj `tokens/colors.css`, `tokens/typography.css`, `tokens/layout.css` do `app/styles/` jako `campfire-colors.css`, `campfire-typography.css`, `campfire-layout.css`.
2. Podmień `app/globals.css` na `next/app/globals.css` z tej paczki (zawiera `@import "tailwindcss"`, importy tokenów, `@theme inline` mapujące tokeny na utility Tailwinda, warstwę `base` i keyframes `twinkle` / `drift-right`).
3. `app/layout.tsx` → `next/app/layout.tsx`. Fonty przez `next/font/google`; **usuń `tokens/fonts.css`** (import z Google Fonts) po przejściu na `next/font`, żeby nie ładować ich dwa razy. Display serif w prototypie to **Instrument Serif** — w `next/font/google` jest jako `Instrument_Serif`; szablon ma tam Newsreader jako fallback, podmień na Instrument Serif jeśli dostępny w wersji Twojego `next`.
4. `data-theme="dark"` na `<html>` to domyślny motyw. Przełączanie: `next/components/ThemeToggle.tsx` (hook `useTheme` + zapis do `localStorage`). Jeśli chcesz uniknąć FOUC, dodaj inline script czytający `localStorage` przed hydracją.
5. Wrzuć `MountainScene` do layoutu strony głównej **przed** treścią; treść owiń w `position: relative; z-index: 1`.

### Jak stylować komponenty

Tailwind v4 dostaje tokeny przez `@theme inline`, więc działa `bg-surface`, `text-accent`, `rounded-lg`, `shadow-glow`, `font-display`, `text-xl`, `p-c5`. Dla tokenów, których nie mapowałem, używaj arbitrary values: `text-[var(--color-text-muted)]`, `bg-[var(--color-accent-subtle)]`. **Nigdy nie wpisuj hexów w komponentach** — wszystko przez tokeny, inaczej motyw dzienny się rozjedzie.

## Design tokens

### Kolory — motyw nocny (`:root`, `[data-theme="dark"]`)

Skale bazowe: `--night-1000 #080A1C`, `--night-900 #10142E`, `--night-800 #171C3C`, `--night-700 #1F254B`, `--night-600 #2A3160`, `--night-500 #232A54`; `--lantern-300 #FFD199`, `--lantern-400 #FFB35C`, `--lantern-600 #A34A0E`, `--lantern-700 #7E3608`; `--dusk-300 #E0D6FF`, `--dusk-400 #C6B6FF`, `--dusk-700 #5B3FA6`.

| token | wartość | rola | kontrast |
|---|---|---|---|
| `--color-bg` | `#10142E` | tło strony | — |
| `--color-bg-deep` | `#080A1C` | hero, stopka | — |
| `--color-surface` | `#171C3C` | karty, panele | — |
| `--color-surface-subtle` | `#1F254B` | hover, blok kodu | — |
| `--color-border` | `#2A3160` | obramowania | — |
| `--color-border-subtle` | `#232A54` | separatory | — |
| `--color-text-primary` | `#F5EFE4` | nagłówki, tekst główny | 16.7:1 |
| `--color-text-secondary` | `#C8CAE4` | leady, opisy | 10.5:1 |
| `--color-text-muted` | `#9095B8` | metadane, captiony | 5.4:1 |
| `--color-accent` | `#FFB35C` | CTA, linki, focus | 10.1:1 |
| `--color-accent-hover` | `#FFD199` | hover CTA/linku | — |
| `--color-accent-subtle` | `#33220F` | tło badge akcentu | — |
| `--color-on-accent` | `#10142E` | tekst na akcencie | 10.1:1 |
| `--color-accent-alt` | `#C6B6FF` | eyebrow, numeracja, podkreślenia | 9.8:1 |
| `--color-accent-alt-subtle` | `#1E1836` | tło pod fioletem | — |
| `--color-success` | `#7BE0A8` | status pozytywny | 12.1:1 |
| `--color-warning` | `#FFC65C` | work in progress | 11.7:1 |
| `--color-error` | `#FF8B7A` | błąd | 7.7:1 |

Scenografia: `--ridge-far #1B2246`, `--ridge-mid #141A38`, `--ridge-near #0A0D22`, `--disc-color #FFF6E2` (księżyc), `--sun-color #FFC96B`, `--cloud-color rgba(126,146,214,.20)`, `--color-star rgba(245,239,228,.55)`, `--color-glow rgba(255,179,92,.28)`.

### Kolory — motyw dzienny (`[data-theme="light"]`)

`--color-bg #FAF4EA`, `--color-bg-deep #F2E9DA`, `--color-surface #FFFCF6`, `--color-surface-subtle #F3EADC`, `--color-border #DFD2BF`, `--color-border-subtle #EBE0CF`; tekst `#191C3A` (15.0:1) / `#3A3A5C` (9.9:1) / `#6A6480` (5.1:1); akcent `#A34A0E` (5.4:1), hover `#7E3608`, subtle `#F8E5D2`, on-accent `#FFFCF6`; alt `#5B3FA6` (7.0:1), alt-subtle `#EFEAFB`; success `#1F6B45`, warning `#8A5300`, error `#B3261E`. Granie w dzień są **jaśniejsze od tekstu**: `#EAE1D2 / #DCCFBB / #C3B49C`.

### Typografia

| token | wartość |
|---|---|
| `--font-display` | Instrument Serif, Georgia, serif (400 + italic) |
| `--font-body` | Manrope, Helvetica Neue, sans-serif (400/500/600/700) |
| `--font-mono` | IBM Plex Mono, ui-monospace (400/500) |
| `--text-xs … --text-3xl` | 12 / 13 / 17 / 20 / 26 / 40 / 60 / 92 px |
| `--leading-display / heading / snug / body` | 0.98 / 1.06 / 1.35 / 1.7 |
| `--tracking-display / heading / mono / label` | −0.02em / −0.01em / 0.02em / 0.14em |
| `--measure-prose / lead / display` | 60ch / 44ch / 22ch |

Zasady: H1–H3 serifem (`--font-display`, waga 400, `--tracking-heading`); **jeden `<em>` italic w akcencie na sekcję** — to gest emocjonalny, nie ozdoba; eyebrow = mono uppercase `--text-xs` + `--tracking-label` w `--color-accent-alt`; akapity ograniczone do `--measure-prose`.

### Odstępy, promienie, cienie, ruch

`--space-1…12`: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 72 / 112 px. `--radius-sm 4`, `--radius-md 10`, `--radius-lg 16`, `--radius-pill 999`. `--border-width 1px` (jedna grubość w całym systemie). Cienie: `--shadow-sm`, `--shadow-md`, `--shadow-glow: 0 8px 28px var(--color-glow)` (blask latarni pod CTA). Ruch: `--ease cubic-bezier(.2,.8,.3,1)`, `--duration-fast 140ms`, `--duration-base 260ms`, `--duration-celestial 1600ms`. Kontenery: `--container 1120px`, `--container-narrow 700px`.

## Screens / views

Prototyp to jedna strona-galeria (`reference/Campfire Design System.dc.html`) — nie odtwarzaj jej jako podstrony produktu, ale odtwórz z niej **komponenty**.

### Hero

Layout: `padding: var(--space-12) var(--space-8)`, kolumna `max-width: var(--container)`, `display: flex; flex-direction: column; gap: var(--space-6)`, `position: relative; z-index: 1`. Za nim `MountainScene` (fixed, z-index 0).

Elementy w kolejności:
1. **Eyebrow** — flex row, `gap: var(--space-3)`: tekst mono uppercase (`--text-xs`, `--tracking-label`, `--color-accent-alt`), kreska 40×1 px w `--color-accent-alt` przy `opacity .6`, drugi tekst mono.
2. **H1** — `--font-display`, `--text-3xl` (92px), `--leading-display`, `max-width: var(--measure-display)`, `text-wrap: pretty`; jedna fraza w `<em>` italic w `--color-accent`.
3. **Lead** — `--text-md`, `--leading-snug`, `--color-text-secondary`, `max-width: var(--measure-lead)`.
4. **CTA row** — flex, `gap: var(--space-3)`, `flex-wrap: wrap`.

### Komponenty

**Button primary**: `background --color-accent`, `color --color-on-accent`, `border 1px solid --color-accent`, `radius --radius-md`, `padding var(--space-3) var(--space-5)`, `--text-base`, waga 600, `transition background/box-shadow var(--duration-fast) var(--ease)`. Hover: tło `--color-accent-hover` + `box-shadow: var(--shadow-glow)`. Focus-visible: `outline: 2px solid var(--color-focus-ring); outline-offset: 3px`.

**Button secondary**: `background --color-surface` (**wymagane** — element nad graniami musi mieć własne tło, inaczej nie przechodzi AA), `border 1px solid --color-border`, `color --color-text-primary`, waga 500. Hover: tło `--color-surface-subtle`, `border-color --color-accent-alt`.

**Button ghost**: przezroczysty, `color --color-accent-alt`, hover tło `--color-accent-alt-subtle`. Tylko poza obszarem grani.

**Chip / status pill**: `radius --radius-pill`, `padding var(--space-2) var(--space-4)`, mono `--text-sm`, `--tracking-mono`, para kolor + tło: success/`--color-success-subtle`, warning/`--color-warning-subtle`, error/`--color-error-subtle`; chip stacku: `--color-text-secondary` na `--color-surface-subtle` z `1px solid --color-border-subtle`. Kropka `●` przed tekstem statusu.

**Card (projekt)**: `background --color-surface`, `border 1px solid --color-border`, `radius --radius-lg`, `padding var(--space-5)`, `box-shadow --shadow-sm`, flex column `gap var(--space-3)`. Zawartość: eyebrow mono (`01 — case study`, `--color-accent-alt`), H3 (`--font-display`, `--text-lg`, `--leading-snug`), akapit `--color-text-secondary`, rząd tagów mono `--color-text-muted` rozdzielonych `·`, link `Zobacz repozytorium →`. Hover: `box-shadow --shadow-md`, `transform translateY(-3px)`, `border-color --color-accent`, `transition ... var(--duration-base) var(--ease)`.

**Input**: `background --color-bg`, `border 1px solid --color-border`, `radius --radius-md`, `padding var(--space-3) var(--space-4)`, `--text-base`. Focus: `outline 2px solid var(--color-focus-ring)`, `outline-offset 2px`, `border-color --color-accent`. Label nad polem: `--text-sm`, waga 600, `--color-text-secondary`.

**Code block**: `<pre>`, mono `--text-sm`, `line-height 1.65`, `background --color-surface-subtle`, `border 1px solid --color-border-subtle`, `radius --radius-lg`, `padding var(--space-4)`, `overflow-x auto`; komentarze w `--color-accent-alt`.

**Grid sekcji**: `repeat(auto-fit, minmax(320px, 1fr))`, `gap var(--space-5)`. Sekcje: flex column `gap var(--space-5)`, między sekcjami `gap var(--space-10)`.

## Interactions & behavior

- **Paralaksa** (`MountainScene`): jeden `scroll` listener (passive) + `requestAnimationFrame`, `translate3d` na 6 warstwach. Mnożniki: gwiazdy 0.10, chmury 0.16, tarcza 0.06, granie −0.05 / −0.11 / −0.20. Ujemne wartości = plany wysuwają się w górę przy scrollu, więc granie „ciągną się" poniżej foldu.
- **Zmiana motywu**: `data-theme` na `<html>`. Księżyc jedzie `translate(46px,150px) scale(.82)` + opacity→0, słońce z `translate(-52px,160px) scale(.82)` → `none` + opacity→1, oba `--duration-celestial` (1600 ms) `cubic-bezier(.45,0,.55,1)`. Gwiazdy fade 900 ms; chmury zostają w obu motywach (zmienia się tylko `--cloud-color`).
- **Animacje tła**: `twinkle` 7 s i 11 s (dwie warstwy gwiazd), `drift-right` 92/140/118/168 s z ujemnymi delay. Wszystko wyłączone przy `prefers-reduced-motion: reduce`.
- **Treść pod hero**: wrapper z `background: linear-gradient(180deg, transparent 0%, var(--color-bg) 34%)` — scena rozpuszcza się bez twardej krawędzi.
- Hover/focus: patrz opisy komponentów. Każdy element interaktywny ma `:focus-visible` z `--color-focus-ring`.

## State management

Minimalny: `theme: "dark" | "light"` (domyślnie `dark`, persystencja w `localStorage` pod `campfire-theme`, zapis na `document.documentElement.dataset.theme`). Paralaksa trzyma się w refach — bez state, bez re-renderów. Brak fetchowania danych.

## Accessibility

- Wszystkie pary tekst/tło ≥ 4.5:1, tekst główny ≥ 14:1, w obu motywach. Kontrasty są w komentarzach `tokens/colors.css` — **przy każdej zmianie odcienia przelicz i zaktualizuj komentarz**.
- Reguła scenerii: w nocy granie są ciemniejsze od tekstu, w dzień jaśniejsze. Każdy element interaktywny leżący nad graniami musi mieć własne tło.
- Warstwa sceny: `aria-hidden`, `pointer-events: none`.
- `prefers-reduced-motion` wyłącza migotanie gwiazd i dryf chmur; ruch wschodu/zachodu też warto wtedy skrócić do fade.

## Copy & tone

Piszemy jak do kogoś przy tym samym ogniu: „siadaj przy ogniu", „jak Cię zawołać?", „razem". Pierwsza osoba, krótkie zdania, zero „rozwiązań klasy enterprise" i „synergii". Partnerstwo, nie oferta.

## Assets

Brak plików graficznych. Grań górska to trzy ścieżki SVG obrysowane ze zdjęcia Tatr dostarczonego przez klienta (skan sylwety kolumna po kolumnie na trzech progach jasności, filtr medianowy, wyostrzenie szczytów). Gwiazdy, chmury, księżyc i słońce to CSS (gradienty, `border-radius`, `blur`). Fonty: Google Fonts (Instrument Serif, Manrope, IBM Plex Mono) — w Next.js przez `next/font`.

## Files w tej paczce

```
tokens/            — źródło prawdy: colors.css, typography.css, layout.css, fonts.css, styles.css
next/app/          — globals.css (Tailwind v4 + @theme inline), layout.tsx (next/font, data-theme)
next/components/   — MountainScene.tsx (scena hero + paralaksa), ThemeToggle.tsx (useTheme)
reference/         — prototyp HTML (Campfire Design System.dc.html + support.js) i readme systemu
```

Prototyp otwiera się bezpośrednio w przeglądarce — trzymaj go obok podczas implementacji i porównuj.
