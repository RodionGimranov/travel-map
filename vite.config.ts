import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
    base: "/travel-map/",
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "@/styles/global" as *;
                    @use "@/styles/variables" as *;
                    @use "@/styles/transition" as *;
                    @use "@/styles/mediaQueries" as *;
                `,
            },
        },
    },
});
