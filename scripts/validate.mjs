import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { Script } from "node:vm";

const root = process.cwd();
const htmlPath = resolve(root, "index.html");
const html = readFileSync(htmlPath, "utf8");
const jsPath = resolve(root, "js/script.js");
const js = readFileSync(jsPath, "utf8");
const errors = [];
const warnings = [];

const existsFromRoot = (reference) => {
  const clean = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  if (!clean) return true;
  const localPath = clean.startsWith("/") ? clean.slice(1) : clean;
  return existsSync(resolve(root, localPath));
};

// Document basics and page structure.
if (!/^<!doctype html>/i.test(html.trim())) errors.push("index.html: missing doctype");
if (!/<html[^>]+lang="pt-BR"/i.test(html)) errors.push("index.html: lang pt-BR missing");
if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push("index.html: exactly one h1 is required");
if (!/<meta[^>]+name="description"/i.test(html)) errors.push("index.html: meta description missing");
if (!/<meta[^>]+name="viewport"/i.test(html)) errors.push("index.html: viewport meta missing");
if (!/<script[^>]+type="application\/ld\+json"/i.test(html)) errors.push("index.html: JSON-LD missing");
if (!/wa\.me|api\.whatsapp\.com/i.test(html)) errors.push("index.html: WhatsApp CTA missing");
if (!/<meta\s+name="robots"\s+content="noindex,follow"/i.test(html)) warnings.push("Preview should remain noindex until production approval");

// Duplicate IDs can silently break navigation, skip links, and scripted behaviour.
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
duplicateIds.forEach((id) => errors.push("index.html: duplicate id #" + id));

for (const match of html.matchAll(/\bhref="#([^"]+)"/g)) {
  if (!ids.includes(match[1])) errors.push("index.html: broken in-page anchor #" + match[1]);
}

// Validate local href/src assets. Relative paths are required for GitHub Pages project sites.
for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
  const reference = match[1].trim();
  if (/^(?:https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i.test(reference)) continue;
  if (!existsFromRoot(reference)) errors.push("Missing local reference in index.html: " + reference);
}
for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
  for (const candidate of match[1].split(",")) {
    const reference = candidate.trim().split(/\s+/)[0];
    if (!reference || /^(?:https?:|data:|\/\/)/i.test(reference)) continue;
    if (!existsFromRoot(reference)) errors.push("Missing srcset image in index.html: " + reference);
  }
}
for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
  if (!/\balt="[^"]+"/i.test(match[1])) errors.push("index.html: img missing alt text");
}

// Local CSS must be able to resolve its own asset references too.
for (const stylesheetMatch of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/gi)) {
  const stylesheet = stylesheetMatch[1];
  if (/^(?:https?:|\/\/)/i.test(stylesheet)) continue;
  const stylesheetPath = resolve(root, stylesheet.replace(/^\.\//, ""));
  if (!existsSync(stylesheetPath)) {
    errors.push("Missing stylesheet: " + stylesheet);
    continue;
  }
  const css = readFileSync(stylesheetPath, "utf8");
  let depth = 0;
  for (const char of css) {
    if (char === "{") depth++;
    if (char === "}") depth--;
    if (depth < 0) break;
  }
  if (depth !== 0) errors.push("Unbalanced CSS braces: " + stylesheet);
  for (const urlMatch of css.matchAll(/url\((?:'|")?([^'")]+)(?:'|")?\)/gi)) {
    const reference = urlMatch[1].trim();
    if (/^(?:https?:|data:|\/\/|#)/i.test(reference)) continue;
    const resolved = resolve(dirname(stylesheetPath), reference);
    if (!existsSync(resolved)) errors.push("Missing CSS asset in " + stylesheet + ": " + reference);
  }
}

// JavaScript syntax and project assets.
try {
  new Script(js, { filename: "js/script.js" });
} catch (error) {
  errors.push("js/script.js syntax error: " + error.message);
}
for (const required of [
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "assets/favicon.svg",
  "assets/logo-tcheou-dark.svg",
  "assets/logo-tcheou-light.svg",
  "assets/images/dra-cintia-portrait-4k.webp",
  "assets/images/dra-cintia-portrait-1200.webp",
  "assets/images/tcheou-clinical-banner-4k.webp",
  "assets/images/tcheou-clinical-banner-1200.webp"
]) {
  if (!existsSync(resolve(root, required))) errors.push("Required project file missing: " + required);
}

try {
  JSON.parse(readFileSync(resolve(root, "site.webmanifest"), "utf8"));
} catch (error) {
  errors.push("site.webmanifest is not valid JSON: " + error.message);
}
const structuredData = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
if (structuredData) {
  try { JSON.parse(structuredData[1]); }
  catch (error) { errors.push("JSON-LD is not valid JSON: " + error.message); }
}

if (errors.length) {
  console.error("\n" + errors.map((error) => "✖ " + error).join("\n"));
  process.exit(1);
}
console.log("✓ Tcheou Odontologia static validation passed");
console.log("✓ HTML structure, anchors, local assets, responsive srcset paths, CSS, JavaScript, JSON-LD and manifest verified");
if (warnings.length) console.warn(warnings.map((warning) => "⚠ " + warning).join("\n"));
