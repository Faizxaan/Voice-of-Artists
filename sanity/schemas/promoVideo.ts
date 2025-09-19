import { defineField, defineType } from "sanity";

export default defineType({
  name: "promoVideo",
  title: "Promo Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Video Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "videoId",
      title: "YouTube Video ID",
      type: "string",
      description: "The YouTube video ID (e.g., dQw4w9WgXcQ)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Custom Thumbnail",
      type: "image",
      description:
        "Optional custom thumbnail. If not provided, YouTube thumbnail will be used.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Video Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "type",
      title: "Video Type",
      type: "string",
      options: {
        list: [
          { title: "Trailer", value: "trailer" },
          { title: "Short", value: "short" },
          { title: "Group Promo", value: "group-promo" },
          { title: "Behind the Scenes", value: "behind-scenes" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "Format: MM:SS or HH:MM:SS",
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "viewCount",
      title: "View Count",
      type: "string",
      description: 'e.g., "15.2K" or "1.1M"',
    }),
    defineField({
      name: "featured",
      title: "Featured Video",
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
    defineField({
      name: "status",
      title: "Publication Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "draft",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "thumbnail",
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
