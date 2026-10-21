import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],
  format: ["cjs", "esm"],
  dts: false,
  sourcemap: true,
  clean: true,
  splitting: false,
  external: ["react", "react-dom"],
  loader: {
    ".jsx": "jsx",
  },
  esbuildOptions(options) {
    options.jsx = "transform";
  },
});
