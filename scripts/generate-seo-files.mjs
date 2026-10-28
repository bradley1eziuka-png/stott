// Runs before `npm run build`. Writes public/sitemap.xml and points robots.txt
// at it, but only when seo.siteUrl is set in site.config.json.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(readFileSync(join(root, "src/config/site.config.json"), "utf8"));
const siteUrl = (config.seo?.siteUrl ?? "").replace(/\/+$/, "");

if (!siteUrl) {
  console.log("[seo] seo.siteUrl is empty — skipping sitemap.xml (set it before launching).");
  process.exit(0);
}

const SERVICE_PATHS = {
  interior: "interior-painting",
  exterior: "exterior-painting",
  deckFence: "fence-deck-staining",
  drywall: "drywall-repair",
  powerWashing: "power-washing",
};
const paths = [
  "/",
  "/about",
  "/our-work",
  "/contact",
  ...config.services.enabled.map((k) => `/services/${SERVICE_PATHS[k]}`),
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${siteUrl}${p === "/" ? "" : p}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync(join(root, "public/sitemap.xml"), xml);

const robotsPath = join(root, "public/robots.txt");
let robots = existsSync(robotsPath)
  ? readFileSync(robotsPath, "utf8")
  : "User-agent: *\nAllow: /\n";
robots =
  robots.replace(/\n?Sitemap:.*\n?/g, "\n").trimEnd() + `\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
writeFileSync(robotsPath, robots);
console.log(`[seo] wrote sitemap.xml (${paths.length} URLs) for ${siteUrl}`);
