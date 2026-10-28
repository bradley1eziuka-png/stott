// Centralized imagery. Defaults live in /public/images (local, no external
// hosting). Override any key in site.config.json → branding.images.
import { DEFAULT_IMAGES } from "@/config/defaults";
import { siteConfig, type ImageKey } from "@/config";

export const IMAGES = { ...DEFAULT_IMAGES, ...siteConfig.branding.images } as Record<
  ImageKey,
  string
>;
