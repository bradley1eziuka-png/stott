import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

// Shared button styles. Transforms only on hover/active (no color transitions,
// no transition-all). Every variant has hover, focus-visible, and active states.
export const ctaButton = cva(
  "inline-flex select-none items-center whitespace-nowrap justify-center gap-2.5 rounded-sm font-display font-extrabold uppercase tracking-[0.04em] transition-transform duration-300 ease-spring will-change-transform hover:-translate-y-0.5 active:translate-y-px active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Brand red — the conversion CTA.
        red: "bg-accent text-white shadow-[0_1px_2px_rgb(23_23_23/0.1),0_14px_28px_-12px_rgb(160_24_20/0.6)] hover:bg-red-deep",
        // Charcoal — secondary on light backgrounds.
        solid: "bg-primary text-white shadow-raised hover:bg-navy-soft",
        // Outline on light backgrounds.
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
        // Outline on charcoal.
        outlineLight:
          "border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-primary",
        // White — primary on red or charcoal backgrounds.
        white: "bg-white text-primary shadow-float hover:bg-secondary",
      },
      size: {
        sm: "h-10 px-5 text-[1.05rem]",
        md: "h-12 px-6 text-[1.15rem]",
        lg: "h-14 px-7 text-[1.25rem]",
        xl: "h-[3.75rem] px-9 text-[1.4rem]",
      },
    },
    defaultVariants: { variant: "red", size: "md" },
  },
);

type CtaButtonProps = ComponentProps<"a"> & VariantProps<typeof ctaButton>;

export function CtaButton({ className, variant, size, ...props }: CtaButtonProps) {
  return <a className={cn(ctaButton({ variant, size }), className)} {...props} />;
}
