import {defineField, defineType} from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
        name: "ctaText",
        title: "CTA Text",
        type: "string",
    }),
    defineField({
        name: "aboutMeText",
        title: "About Me Text",
        type: "string",
    }),
]
})