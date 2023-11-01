import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/cli.ts"],
  format: ["cjs"],
  sourcemap: true,
  target: "esnext",
  outDir: "dist",
})