import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-[1em] fill-current" />
      ))}
    </span>
  );
}
