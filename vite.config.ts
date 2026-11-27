import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  server: {
    // Mirrors public/_redirects so `npm run dev` gets live data
    proxy: {
      "/api": {
        target: "https://api.dukaten.parkknowit.com",
        changeOrigin: true,
      },
    },
  },
});
