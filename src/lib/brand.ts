// Optional brand color override. With no colors set in site.config.json this
// returns "" and the master navy + gold palette from styles.css is untouched.
import { siteConfig } from "@/config";

export function brandColorCss() {
  const { primary, accent } = siteConfig.branding.colors;
  const rules: string[] = [];
  if (primary) {
    rules.push(
      `--primary:${primary}`,
      `--foreground:${primary}`,
      `--card-foreground:${primary}`,
      `--popover-foreground:${primary}`,
      `--secondary-foreground:${primary}`,
      `--accent-foreground:${primary}`,
      `--navy:${primary}`,
      `--navy-soft:color-mix(in oklab, ${primary} 86%, white)`,
    );
  }
  if (accent) {
    rules.push(`--accent:${accent}`, `--gold:${accent}`, `--ring:${accent}`);
  }
  return rules.length ? `:root{${rules.join(";")}}` : "";
}
