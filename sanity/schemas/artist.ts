import { defineField, defineType } from "sanity";

export default defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    defineField({
      name: "artistName",
      title: "Artist Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "realName",
      title: "Real Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "artistName",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "biography",
      title: "Biography",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "genre",
      title: "Primary Genre",
      type: "string",
      options: {
        list: [
          { title: "Alternative", value: "alternative" },
          { title: "Electronic", value: "electronic" },
          { title: "Folk", value: "folk" },
          { title: "Hip-Hop", value: "hip-hop" },
          { title: "Indie", value: "indie" },
          { title: "Jazz", value: "jazz" },
          { title: "Pop", value: "pop" },
          { title: "Rock", value: "rock" },
          { title: "R&B", value: "r&b" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "influences",
      title: "Musical Influences",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "yearsActive",
      title: "Years Active",
      type: "string",
    }),
    defineField({
      name: "voiceOfArtistStatement",
      title: "Voice of Artist Statement",
      type: "text",
      rows: 6,
      description: 'The artist\'s response to "What is your Voice of Artist?"',
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "website", title: "Website", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "twitter", title: "Twitter", type: "url" },
        { name: "youtube", title: "YouTube", type: "url" },
        { name: "spotify", title: "Spotify", type: "url" },
        { name: "soundcloud", title: "SoundCloud", type: "url" },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Artist",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "applicationStatus",
      title: "Application Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
          { title: "Featured", value: "featured" },
        ],
      },
      initialValue: "pending",
    }),
  ],
  preview: {
    select: {
      title: "artistName",
      subtitle: "genre",
      media: "profileImage",
    },
  },
});
