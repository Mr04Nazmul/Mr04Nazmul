import { cp, mkdir, rename, readFile, writeFile } from "node:fs/promises";

import { gunzipSync } from "node:zlib";

await mkdir("dist/classic", { recursive: true });
await rename("dist/index.html", "dist/classic/index.html");
await cp("portfolio/index.html", "dist/index.html");
await cp("portfolio/assets", "dist/assets", { recursive: true });

for (const name of ["devnazu-avatar.glb", "devnazu-greeting.mp3"]) {
  const encoded = await readFile("portfolio/avatar/" + name + ".b64", "ascii");
  await writeFile("dist/assets/" + name, gunzipSync(Buffer.from(encoded, "base64")));
}

const { build } = await import("vite");
await build({
  configFile: false,
  publicDir: false,
  build: {
    outDir: "dist/assets",
    emptyOutDir: false,
    lib: { entry: "portfolio/avatar/main.js", formats: ["es"], fileName: () => "devnazu-avatar.js" },
  },
});
