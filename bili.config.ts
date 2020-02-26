import { Config } from "bili";

const config: Config = {
  input: "src/index.ts",
  output: {
    format: ["cjs", "umd", "esm"],
    moduleName: "buscador-cvu",
    sourceMap: true,
    sourceMapExcludeSources: true
  },
  plugins: {
    typescript2: true,
    vue: {
      css: true
    },
    babel: { runtimeHelpers: true }
  },
  extendConfig(config, { format }) {
    if (format === "umd") {
      config.output.minify = true;
    }
    if (format === "esm") {
      config.output.fileName = "[name].module.js";
    }
    return config;
  },
  externals: [
    "vue-class-component",
    "vue-property-decorator",
    "axios",
    "bootstrap",
    "bootstrap-vue",
    "jquery",
    "popper.js",
    "@fortawesome/fontawesome-svg-core",
    "@fortawesome/free-solid-svg-icons",
    "@fortawesome/vue-fontawesome",
    "vue-i18n"
  ]
};

export default config;
