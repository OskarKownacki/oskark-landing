import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  preview: { select: { title: "title.0.value" } },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      description: "Przycisk CTA otwiera maila na ten adres; obok jest widoczny z przyciskiem kopiowania",
      validation: (rule) => rule.regex(/^\S+@\S+\.\S+$/, { name: "e-mail" }),
    }),
  ],
});
