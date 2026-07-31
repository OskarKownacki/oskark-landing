# Campfire — design system

Dark-first system dla strony-wizytówki developera, która ma dawać poczucie „jesteś u siebie”. Nastrój: obóz pod nocnym niebem w górach — granatowy kosmos, ciepłe światło latarni, zorza nad graniami. Ton relacji: partnerstwo, nie transakcja.

## Podłączenie

```html
<link rel="stylesheet" href="campfire/styles.css">
<html>                      <!-- domyślnie NOC -->
<html data-theme="light">   <!-- ŚWIT — wariant dzienny -->
```

| plik | zawartość |
|---|---|
| `tokens/fonts.css` | import Google Fonts (Instrument Serif, Manrope, IBM Plex Mono) |
| `tokens/colors.css` | skale bazowe + tokeny semantyczne dla nocy i świtu |
| `tokens/typography.css` | rodziny, wagi, skala stopni, interlinie, szerokości kolumn |
| `tokens/layout.css` | odstępy, promienie, ciepłe cienie, tła gwiazd, ruch |

## Kolor

Trzy skale bazowe: **noc** (`--night-*`, granat od `#080A1C` do `#2A3160`), **latarnia** (`--lantern-*`, ciepły amber `#FFB35C`), **fiolet zmierzchu** (`--dusk-*`, `#C6B6FF`).

- Noc niesie cały interfejs — nie ma szarości, wszystko ma podkład granatu.
- **Latarnia = działanie**: CTA, linki, stan aktywny, focus ring, poświata w hoverze.
- **Fiolet = orientacja**: eyebrow, numeracja, podkreślenia, dane liczbowe. Nigdy jako przycisk główny.
- Cienie zawsze ciepłe lub granatowe, nigdy neutralnie szare. `--shadow-glow` to blask latarni pod CTA.
- `--bg-starfield` daje gwiazdy bez grafiki; `--sky-wash` to gradient nieba, `--ridge-far/mid/near` to trzy plany grani, `--disc-color`/`--disc-glow` to księżyc (noc) lub słońce (dzień) — te same tokeny, inne wartości w motywie.
- Kolory semantyczne tylko dla statusu.
- Kontrast: wszystkie pary tekst/tło ≥ 4.5:1, tekst główny ≥ 14:1 w obu motywach. Wartości w komentarzach `tokens/colors.css` — przy zmianie odcienia przelicz.

## Typografia

- **Instrument Serif** (400 + italic) — hero, H1–H3, cytaty. Wysoki kontrast kresek, wyraźny charakter; italic to gest emocjonalny, używaj go na jedną frazę w nagłówku, nie na całość.
- **Manrope** (400/500/600/700) — akapity i UI. Geometryczny, ale ciepły; przy `--leading-body: 1.7` czyta się bez wysiłku.
- **IBM Plex Mono** (400/500) — kod, stack, daty, eyebrow uppercase z `--tracking-label`.

Zasady: hero w `--text-3xl` z `--leading-display` (blok tekstu, nie linia); akapity do `--measure-prose`; mono uppercase tylko w `--text-xs`/`--text-sm`; jeden serif italic na sekcję.

## Copy

Piszemy jak do kogoś przy tym samym ogniu: „siadaj”, „razem”, „jak Cię zawołać”. Bez „rozwiązań klasy enterprise”, bez „synergii”. Pierwsza osoba, krótkie zdania, żadnego marketingowego dystansu.

## Sceneria hero

Kontur gór jest CSS-owy (`clip-path`, żadnych zdjęć) i siedzi w warstwie `position: fixed` za treścią, więc granie przedłużają się poniżej foldu. Paralaksa: gwiazdy/chmury 0.10–0.16×, tarcza 0.06×, granie −0.05/−0.11/−0.20× (dalsze plany wolniej, pierwszy plan wysuwa się w górę). Treść pod hero ma gradient `transparent → --color-bg`, żeby scena rozpuszczała się bez twardej krawędzi.

Ruch w tle: dwie warstwy gwiazd (`--bg-starfield`, `--bg-starfield-bright`) migają w tempie 7 s i 11 s, cztery chmury dryfują w prawo w 92–168 s. Chmury są w OBU motywach — różni je tylko `--cloud-color` (sine smugi w nocy, białe w dzień). Zmiana motywu odtwarza wschód i zachód: księżyc schodzi po łuku w prawo, słońce wchodzi z lewej (`--duration-celestial`, 1600 ms). Wszystkie animacje tła respektują `prefers-reduced-motion`.

Reguła kontrastu w scenerii: w nocy granie są ciemniejsze od tekstu, w dzień **jaśniejsze** (`--ridge-near` #C3B49C trzyma ≥ 4.8:1 wobec tekstu drugorzędnego). Każdy element interaktywny leżący nad graniami musi mieć własne tło (`--color-surface` lub akcent) — przezroczysty przycisk nad graniami nie przejdzie AA.

## Komponenty

`Campfire Design System.dc.html` — żywa galeria: hero ze scenerią gór, skala kolorów, skala typograficzna, trzy warianty przycisku, chipy statusu i stacku, karta projektu, pole formularza, blok kodu. Motyw przełączasz w Tweaks.

## Czego system nie obejmuje

Nawigacji, siatki podstron, ilustracji i ikon — dodaj je w projekcie docelowym, korzystając z tokenów `--space-*`, `--radius-*`, `--duration-*`. Zdjęcia gór/nieba trzymaj przygaszone (nakładka `--color-bg-deep` przy 40–60%), żeby tekst zachował kontrast.
