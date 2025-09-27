import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Allow raw quotes/apostrophes in JSX text without forcing HTML entities
      "react/no-unescaped-entities": "off",
      // Do not block builds on explicit any usage; surface as warnings instead
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow <img> usage (we use it for hidden preloaders and fallback chains); keep as warning
      "@next/next/no-img-element": "warn",
      // Allow require() in Node-only utility scripts
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
