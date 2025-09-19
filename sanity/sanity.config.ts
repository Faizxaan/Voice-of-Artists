import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "voice-of-artist",
  title: "Voice of Artist CMS",

  projectId: "your-project-id", // Replace with your actual project ID
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
