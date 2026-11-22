import { cp, mkdir, rename } from "node:fs/promises";

await mkdir("dist/classic", { recursive: true });
await rename("dist/index.html", "dist/classic/index.html");
await cp("portfolio/index.html", "dist/index.html");
await cp("portfolio/assets", "dist/assets", { recursive: true });
