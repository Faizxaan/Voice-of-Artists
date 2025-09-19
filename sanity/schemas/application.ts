import { defineField, defineType } from "sanity";

export default defineType({
  name: "application",
  title: "Artist Application",
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
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "genre",
      title: "Primary Genre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "yearsActive",
      title: "Years Active",
      type: "string",
    }),
    defineField({
      name: "influences",
      title: "Musical Influences",
      type: "string",
    }),
    defineField({
      name: "biography",
      title: "Artist Biography",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "voiceOfArtistStatement",
      title: "Voice of Artist Statement",
      type: "text",
      description: 'Response to "What is your Voice of Artist?"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artistGoals",
      title: "Artist Goals & Aspirations",
      type: "text",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "website", title: "Website", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "youtube", title: "YouTube", type: "url" },
        { name: "spotify", title: "Spotify", type: "url" },
        { name: "soundcloud", title: "SoundCloud", type: "url" },
      ],
    }),
    defineField({
      name: "musicSamples",
      title: "Music Samples",
      type: "array",
      of: [
        {
          type: "file",
          options: {
            accept: "audio/*",
          },
        },
      ],
    }),
    defineField({
      name: "photos",
      title: "Artist Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "pressKit",
      title: "Press Kit",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx",
      },
    }),
    defineField({
      name: "availableForInterviews",
      title: "Available for Interviews",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "preferredContactMethod",
      title: "Preferred Contact Method",
      type: "string",
      options: {
        list: [
          { title: "Email", value: "email" },
          { title: "Phone", value: "phone" },
          { title: "Social Media", value: "social" },
        ],
      },
      initialValue: "email",
    }),
    defineField({
      name: "status",
      title: "Application Status",
      type: "string",
      options: {
        list: [
          { title: "Pending Review", value: "pending" },
          { title: "Under Consideration", value: "reviewing" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
          { title: "On Hold", value: "hold" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "reviewNotes",
      title: "Review Notes",
      type: "text",
      description: "Internal notes for the review process",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "reviewedAt",
      title: "Reviewed At",
      type: "datetime",
    }),
    defineField({
      name: "reviewedBy",
      title: "Reviewed By",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "artistName",
      subtitle: "status",
      description: "genre",
    },
    prepare(selection) {
      const { title, subtitle, description } = selection;
      return {
        title,
        subtitle: `${subtitle} - ${description}`,
      };
    },
  },
  orderings: [
    {
      title: "Submitted Date, New",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
