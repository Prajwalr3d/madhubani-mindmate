import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional fixed port; remove if you want auto-port selection
    open: true,
    proxy: {
      // forward any /api/* request to the backend at port 4000
      "/api": {
        target: "http://localhost:4001",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
