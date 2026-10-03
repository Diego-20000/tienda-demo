#!/usr/bin/env node
import { readdir, readFile, access } from "node:fs/promises";
import { join, extname, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(".");
const files = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else files.push(full);
  }
}

await walk(root);

const jsFiles = files.filter((file) => extname(file) === ".js");
for (const file of jsFiles) execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });

const htmlFiles = files.filter((file) => extname(file) === ".html");
const failures = [];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (!html.includes('class="skip-link"')) failures.push(file + ": missing skip link");

  const matches = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of matches) {
    if (/^(https?:|mailto:|tel:|#|javascript:|data:)/i.test(ref)) continue;
    const clean = ref.split("#")[0].split("?")[0];
    if (!clean) continue;
    const target = resolve(join(file, ".."), clean);
    try {
      await access(target);
    } catch {
      failures.push(file + ": missing local asset " + ref);
    }
  }
}

if (failures.length) {
  console.error("\nValidation failed:\n" + failures.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}

console.log(`✓ ${jsFiles.length} JavaScript files parse correctly`);
console.log(`✓ ${htmlFiles.length} HTML pages have local assets and skip links`);
