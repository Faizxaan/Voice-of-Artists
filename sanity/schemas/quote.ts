import { defineField, defineType } from "sanity";

export default defineType({
  name: "quote",
  title: "Artist Quote",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Quote Text",
      type: "text",
      validation: (Rule) => Rule.required(),
      description: 'The artist\'s response to "What is your Voice of Artist?"',
    }),
    defineField({
      name: "artist",
      title: "Artist",
      type: "reference",
      to: { type: "artist" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Quote",
      type: "boolean",
      initialValue: false,
      description: "Show this quote in the homepage carousel",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which this quote appears in the carousel",
    }),
    defineField({
      name: "category",
      title: "Quote Category",
      type: "string",
      options: {
        list: [
          { title: "Voice of Artist", value: "voice" },
          { title: "Inspiration", value: "inspiration" },
          { title: "Process", value: "process" },
          { title: "Mission", value: "mission" },
          { title: "Story", value: "story" },
        ],
      },
      initialValue: "voice",
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "string",
      description: "Optional context about when/where this quote was given",
    }),
    defineField({
      name: "addedAt",
      title: "Added At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "artist.artistName",
      featured: "featured",
    },
    prepare(selection) {
      const { title, subtitle, featured } = selection;
      return {
        title: title.length > 60 ? `${title.substring(0, 60)}...` : title,
        subtitle: subtitle && `by ${subtitle}${featured ? " (Featured)" : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Added Date, New",
      name: "addedAtDesc",
      by: [{ field: "addedAt", direction: "desc" }],
    },
  ],
});
