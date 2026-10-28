// `npm run check` — pre-send checklist for a client site.
// Flags placeholders still in site.config.json and any text that looks like
// another business's details leaked into the source.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(join(root, "src/config/site.config.json"), "utf8"));
const problems = [];
const notes = [];

if (cfg.business.name === "Your Painting Company")
  problems.push("business.name is still the placeholder");
if (cfg.business.phone === "(555) 555-0100")
  problems.push("business.phone is still the placeholder");
if (cfg.form.provider === "demo")
  notes.push("form.provider is 'demo' — fine for a Loom preview, but leads are NOT delivered");
if (cfg.form.provider === "formspree" && !cfg.form.formspreeId)
  problems.push("form.provider is formspree but formspreeId is empty");
if (cfg.form.provider === "ghl-webhook" && !cfg.form.webhookUrl)
  problems.push("form.provider is ghl-webhook but webhookUrl is empty");
if (!cfg.seo.siteUrl)
  notes.push(
    "seo.siteUrl is empty — canonical URLs and sitemap are skipped until the domain is known",
  );
if (!cfg.business.address.city)
  notes.push("business.address.city is empty — titles and hero pill aren't localized");
if (!cfg.business.email) notes.push("business.email is empty — email is omitted from the footer");
if (!cfg.branding.logo.src) notes.push("no logo set — the paintbrush mark is shown");
if (cfg.content.reviews && !cfg.content.reviews.verified)
  notes.push(
    `content.reviews (${cfg.content.reviews.rating} / ${cfg.content.reviews.count}) is provisional — confirm against the live Google Business Profile, then set verified: true`,
  );
if (cfg.business.address.street)
  problems.push("business.address.street is set — a possibly residential address would be public");
if (cfg.content.testimonials.length === 0)
  notes.push(
    "no testimonials — the reviews section is hidden (correct unless you have real reviews)",
  );

// Strings that must never appear in a generated site's source.
const FORBIDDEN = [
  "(616) 259-4705",
  "6162594705",
  "My Favorite Painters",
  "vibe.filesafe.space",
  "leadconnectorhq.com",
  "tk_a47518d60be74f44a1a014d2d5606d3a",
];
function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    if (
      ["node_modules", "dist", ".output", ".vercel", ".tanstack", ".nitro", "scripts"].includes(f)
    )
      continue;
    const p = join(dir, f);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}
for (const file of [...walk(join(root, "src")), ...walk(join(root, "public"))]) {
  if (/\.(png|jpe?g|webp|ico|gen\.ts)$/i.test(file)) continue;
  const text = readFileSync(file, "utf8");
  for (const bad of FORBIDDEN)
    if (text.includes(bad)) problems.push(`${relative(root, file)} contains "${bad}"`);
}

for (const n of notes) console.log(`  note: ${n}`);
if (problems.length) {
  console.log("");
  for (const p of problems) console.log(`  FIX:  ${p}`);
  console.log(`\n${problems.length} issue(s) to fix before sending.`);
  process.exit(1);
}
console.log("\nOK — no blocking issues.");
