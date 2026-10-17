import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { schemaTypes } from "./schemaTypes";
import { LANGUAGES } from "./lib/i18n";

export default defineConfig({
  name: "default",
  title: "oskark-landing",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool(),
    // Tłumaczenia na poziomie pól: tekst ma wersję per język, a zdjęcia, linki, poziomy
    // i kolejność sekcji są wspólne. Rejestruje typy internationalizedArrayString/Text.
    internationalizedArray({
      languages: [...LANGUAGES],
      defaultLanguages: LANGUAGES.map(({ id }) => id),
      fieldTypes: ["string", "text"],
      languageDisplay: "titleAndCode",
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
