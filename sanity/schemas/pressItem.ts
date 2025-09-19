import { defineField, defineType } from "sanity";

export default defineType({
  name: "pressItem",
  title: "Press Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Article Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "outlet",
      title: "Media Outlet",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt/Quote",
      type: "text",
      rows: 3,
      description: "Key quote or excerpt from the article",
    }),
    defineField({
      name: "url",
      title: "Article URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Article Type",
      type: "string",
      options: {
        list: [
          { title: "Feature", value: "feature" },
          { title: "News", value: "news" },
          { title: "Review", value: "review" },
          { title: "Interview", value: "interview" },
          { title: "Opinion", value: "opinion" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Outlet Logo",
      type: "image",
      description: "Logo of the media outlet",
    }),
    defineField({
      name: "featured",
      title: "Featured Press Item",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "outlet",
      media: "logo",
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
