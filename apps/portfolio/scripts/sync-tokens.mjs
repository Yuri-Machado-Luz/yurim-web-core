#!/usr/bin/env node
/**
 * Copies canonical brand-tokens.css from Portfolio → Blog.
 * Exit 1 if --check and files differ.
 */
import { copyFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const portfolioRoot = resolve(__dirname, "..");
const blogRoot = resolve(portfolioRoot, "../blog");

const src = resolve(portfolioRoot, "src/styles/brand-tokens.css");
const dest = resolve(blogRoot, "src/styles/brand-tokens.css");

const check = process.argv.includes("--check");

if (!existsSync(src)) {
  console.error("Missing source:", src);
  process.exit(1);
}

if (check) {
  if (!existsSync(dest)) {
    console.error("Missing dest (run without --check to sync):", dest);
    process.exit(1);
  }
  const a = readFileSync(src, "utf8");
  const b = readFileSync(dest, "utf8");
  if (a !== b) {
    console.error("brand-tokens.css out of sync. Run: node scripts/sync-tokens.mjs");
    process.exit(1);
  }
  console.log("brand-tokens.css in sync.");
  process.exit(0);
}

mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);
console.log("Synced →", dest);
