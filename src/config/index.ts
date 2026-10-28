import raw from "./site.config.json";
import { siteConfigSchema, type SiteConfig } from "./schema";

const parsed = siteConfigSchema.safeParse(raw);
if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
  throw new Error(`Invalid src/config/site.config.json:\n${issues}`);
}

export const siteConfig: SiteConfig = parsed.data;
export type { SiteConfig, ServiceKey, ImageKey } from "./schema";
