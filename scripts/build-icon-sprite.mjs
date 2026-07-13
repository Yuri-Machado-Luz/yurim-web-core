import {
  mkdirSync,
  readdirSync,
  copyFileSync,
  rmSync,
  existsSync,
} from "node:fs";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const iconsRoot = join(root, "src", "assets", "icons");
const outFile = join(root, "public", "sprite.svg");
const tmpDir = join(root, "_tmp_icons_flat");

function collectSvgs(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collectSvgs(full, acc);
    else if (entry.name.endsWith(".svg")) acc.push(full);
  }
  return acc;
}

if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true });
mkdirSync(tmpDir, { recursive: true });
mkdirSync(join(root, "public"), { recursive: true });

const files = collectSvgs(iconsRoot);
const flatFiles = [];
for (const file of files) {
  const dest = join(tmpDir, basename(file));
  copyFileSync(file, dest);
  flatFiles.push(dest);
}

const result = spawnSync(
  "pnpm",
  ["dlx", "svgstore-cli", "-o", outFile, ...flatFiles],
  { cwd: root, stdio: "inherit", shell: process.platform === "win32" },
);

rmSync(tmpDir, { recursive: true, force: true });

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log(`Wrote ${outFile} (${files.length} icons)`);
