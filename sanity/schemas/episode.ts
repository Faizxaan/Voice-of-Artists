import { defineField, defineType } from "sanity";

export default defineType({
  name: "episode",
  title: "Episode",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Episode Title",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artist",
      title: "Featured Artist",
      type: "reference",
      to: { type: "artist" },
      validation: (Rule) => Rule.required(),
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
      title: "Episode Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Interview", value: "interview" },
          { title: "Performance", value: "performance" },
          { title: "Documentary", value: "documentary" },
          { title: "Behind the Scenes", value: "behind-scenes" },
          { title: "Collaboration", value: "collaboration" },
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
      name: "featured",
      title: "Featured Episode",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "text",
      description: "Full transcript of the episode",
    }),
    defineField({
      name: "transcriptUrl",
      title: "Transcript URL",
      type: "url",
      description: "External link to transcript file",
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
      name: "viewCount",
      title: "View Count",
      type: "number",
      readOnly: true,
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
      subtitle: "artist.artistName",
      media: "thumbnail",
    },
    prepare(selection) {
      const { subtitle } = selection;
      return {
        ...selection,
        subtitle: subtitle && `by ${subtitle}`,
      };
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});
