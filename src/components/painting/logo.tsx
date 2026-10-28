import { cn } from "@/lib/utils";
import { BUSINESS_NAME, LOGO } from "@/lib/site-config";

// The supplied logo, uncropped artwork only trimmed of surrounding whitespace.
// Full artwork ratio is 1857×756; the mark (brush + splatter) is 420×218.
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={LOGO.src}
      alt={LOGO.alt || `${BUSINESS_NAME} logo`}
      width={1000}
      height={407}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}

// Small-screen treatment: the brush mark from the logo beside live text so
// the business name stays legible at phone sizes. Full logo is used ≥ sm.
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={LOGO.markSrc}
      alt=""
      aria-hidden
      width={420}
      height={218}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
