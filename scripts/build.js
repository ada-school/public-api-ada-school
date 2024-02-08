const { nodeExternalsPlugin } = require("esbuild-node-externals");

const isProd = process.env.NODE_ENV === "production";

require("esbuild")
  .build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    platform: "node",
    outdir: "build",
    plugins: [nodeExternalsPlugin()],
    logLevel: "info",
    minify: isProd,
    sourcemap: "external",
  })
  .catch(() => process.exit(1));
