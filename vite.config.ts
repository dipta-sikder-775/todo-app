import { defineConfig, splitVendorChunkPlugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), splitVendorChunkPlugin()],
  build: {
    cssMinify: true,
    minify: true,
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://example.com/api/v1",
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
