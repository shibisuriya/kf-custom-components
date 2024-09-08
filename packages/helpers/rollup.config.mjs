import postcss from "rollup-plugin-postcss";
import { babel } from "@rollup/plugin-babel";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "./src/index.js",
  output: [
    {
      file: "dist/main.js",
      format: "es",
      plugins: [{ presets: ["@babel/preset-env"] }],
      sourcemap: true, // Enable source maps
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    babel({ presets: ["@babel/preset-react"] }),
    postcss({
      modules: true, // Enables CSS Modules
    }),
  ],
};
