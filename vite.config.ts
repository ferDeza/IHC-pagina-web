import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/IHC-pagina-web/" : "/", // 👈 dinámico según entorno
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "docs", // 👈 output para GitHub Pages
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));