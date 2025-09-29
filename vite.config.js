// FILE: vite.config.js

import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { matSwipeRightAlt } from "@quasar/extras/material-icons";
import { symOutlined10k } from "@quasar/extras/material-symbols-outlined";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      sassVariables: fileURLToPath(
        new URL("./src/css/quasar-variables.scss", import.meta.url)
      ),
      config: {
        dark: "auto", // or true/false
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  }
});
