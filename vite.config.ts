import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
    proxy: {
      "/intern-api": {
        target: "http://161.97.154.119",
        changeOrigin: true,
      },
    },
  },
});
