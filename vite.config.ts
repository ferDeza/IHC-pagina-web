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
    // Optimizaciones de assets
    assetsInlineLimit: 4096, // Inline assets menores a 4KB
    rollupOptions: {
      output: {
        // Organizar assets por tipo
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name!.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name!)) {
            return `images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));