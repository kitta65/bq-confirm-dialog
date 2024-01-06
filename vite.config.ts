import { defineConfig } from "vite";
import { defineManifest } from "@crxjs/vite-plugin";
import { crx } from "@crxjs/vite-plugin";

import packageJson from "./package.json";

const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: "BigQuery Confirm Dialog",
  version: packageJson.version,
  content_scripts: [
    {
      js: ["src/content.ts"],
      matches: [
        "https://console.cloud.google.com/bigquery",
        "https://console.cloud.google.com/bigquery?*",
      ],
    },
  ],
}));

export default defineConfig({
  plugins: [crx({ manifest })],
});
