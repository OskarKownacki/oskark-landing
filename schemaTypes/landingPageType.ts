import { defineArrayMember, defineField, defineType } from "sanity";
import { DICTIONARY } from "../lib/i18n";

// Studio jest po polsku, więc etykiety poziomów w radiu też.
const SKILL_LEVEL_LABELS = DICTIONARY.pl.skillLevels;

// Sekcje to obiekty w tablicy `sections` — kolejność w Studio = kolejność na stronie.
// Każda sekcja: krótki `title` (etykieta mono nad sekcją, też kotwica w spisie pod hero)
// + `heading` — pełne zdanie, które prowadzi czytającego dalej, zamiast samej etykiety.
// Teksty są tłumaczone (internationalizedArray*, patrz sanity.config.ts); zdjęcia, linki
// i poziomy są wspólne dla języków. Nowy egzemplarz istniejącego rodzaju sekcji dodaje się
// w Studio; nowy rodzaj wymaga typu tutaj i rendera w components/LandingSections.tsx.
const titleField = defineField({ name: "title", title: "Etykieta (krótko, np. „Projekty”)", type: "internationalizedArrayString" });
const headingField = defineField({ name: "heading", title: "Nagłówek (pełne zdanie)", type: "internationalizedArrayString" });
// pole tłumaczeń to tablica — podgląd bierze pierwszy język (Studio trzyma kolejność z LANGUAGES)
const sectionPreview = { select: { title: "title.0.value", subtitle: "heading.0.value" } };

const portfolioSection = defineArrayMember({
  name: "portfolioSection",
  title: "Portfolio (karty projektów)",
  type: "object",
  preview: sectionPreview,
  fields: [
    titleField,
    headingField,
    // kolejność na liście = kolejność kart na stronie; projekt spoza listy jest ukryty
    defineField({
      name: "projects",
      title: "Projekty (przeciągnij, by zmienić kolejność)",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "snapshot" }] })],
      validation: (rule) => rule.unique(),
    }),
  ],
});

const aboutSection = defineArrayMember({
  name: "aboutSection",
  title: "O mnie (zdjęcie + tekst)",
  type: "object",
  preview: sectionPreview,
  fields: [
    titleField,
    defineField({ name: "heading", title: "Napis nachodzący na zdjęcie", type: "internationalizedArrayString" }),
    defineField({ name: "image", title: "Zdjęcie", type: "image" }),
    defineField({ name: "text", title: "Tekst", type: "internationalizedArrayText" }),
  ],
});

const skillsSection = defineArrayMember({
  name: "skillsSection",
  title: "Co robię (lista usług)",
  type: "object",
  preview: sectionPreview,
  fields: [
    titleField,
    headingField,
    defineField({
      name: "skills",
      title: "Umiejętności",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "skill",
          fields: [
            defineField({ name: "name", title: "Nazwa", type: "internationalizedArrayString" }),
            defineField({
              name: "level",
              title: "Poziom",
              type: "number",
              description: "1 = uczę się, 5 = ekspert. Etykiety słowne: skillLevels w lib/i18n.ts",
              options: { list: SKILL_LEVEL_LABELS.map((title, index) => ({ title, value: index + 1 })), layout: "radio" },
              validation: (rule) => rule.min(1).max(SKILL_LEVEL_LABELS.length).integer(),
            }),
            defineField({ name: "description", title: "Opis", type: "internationalizedArrayText" }),
          ],
          preview: { select: { title: "name.0.value", subtitle: "description.0.value" } },
        }),
      ],
    }),
  ],
});

const socialSection = defineArrayMember({
  name: "socialSection",
  // nazwa typu zostaje `socialSection`, żeby nie migrować danych — na stronie to finał z kontaktem
  title: "Kontakt (przycisk maila z Hero + linki)",
  type: "object",
  preview: sectionPreview,
  fields: [
    titleField,
    headingField,
    defineField({
      name: "links",
      title: "Konta (GitHub, LinkedIn…)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "link",
          fields: [
            defineField({ name: "label", title: "Nazwa", type: "string" }),
            defineField({ name: "url", title: "Adres", type: "url" }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
  ],
});

export const landingPageType = defineType({
  name: "landingPage",
  title: "Strona /landing",
  type: "document",
  // bez preview Studio składa tytuł z pierwszego pola ("sections: [{title: ...}, ...]")
  preview: { prepare: () => ({ title: "Strona /landing" }) },
  fields: [
    defineField({
      name: "sections",
      title: "Sekcje",
      type: "array",
      of: [portfolioSection, aboutSection, skillsSection, socialSection],
    }),
  ],
});
