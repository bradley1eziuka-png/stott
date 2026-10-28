import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { CATEGORY_LABELS, GALLERY, type PhotoCategory } from "@/lib/photos";
import { cn } from "@/lib/utils";
import { PhotoOverlay } from "./photo-overlay";

type Filter = "all" | PhotoCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...(Object.keys(CATEGORY_LABELS) as PhotoCategory[]).map((id) => ({
    id,
    label: CATEGORY_LABELS[id],
  })),
];

// Filterable photo grid with a keyboard-accessible lightbox. Only real
// project photos; categories shown only because the photos support them.
export function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);

  const photos = filter === "all" ? GALLERY : GALLERY.filter((p) => p.category === filter);
  const count = (id: Filter) =>
    id === "all" ? GALLERY.length : GALLERY.filter((p) => p.category === id).length;

  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, step]);

  const current = active !== null ? photos[active] : null;

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const on = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.id)}
              className={cn(
                "inline-flex h-11 items-center gap-2 border-2 border-primary px-4 font-display text-[1.1rem] font-extrabold uppercase tracking-[0.05em] active:translate-y-px",
                on ? "bg-primary text-white" : "bg-transparent text-primary hover:bg-secondary",
              )}
            >
              {f.label}
              <span className={cn("text-sm", on ? "text-red-bright" : "text-accent")}>
                {count(f.id)}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4 [&>li]:break-inside-avoid">
        {photos.map((photo, i) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Enlarge photo: ${photo.caption}`}
              className="group relative block w-full overflow-hidden bg-secondary shadow-raised"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading={i < 3 ? "eager" : "lazy"}
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <PhotoOverlay />
              <span className="absolute inset-x-0 bottom-0 p-3.5 text-left font-display text-xl font-extrabold uppercase leading-tight tracking-[0.05em] text-white">
                {photo.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="on-dark fixed inset-0 z-[80] flex flex-col bg-primary/95 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <p className="font-display text-2xl font-extrabold uppercase tracking-[0.05em]">
              {current.caption}
              <span className="ml-3 text-base text-white/60">
                {(active ?? 0) + 1} / {photos.length}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="inline-flex size-12 items-center justify-center hover:bg-white/10"
              aria-label="Close photo"
              autoFocus
            >
              <X className="size-7" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-16">
            <img
              src={current.src}
              alt={current.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full object-contain shadow-float"
            />
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-1 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-accent sm:left-4"
                >
                  <ChevronLeft className="size-7" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-1 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-accent sm:right-4"
                >
                  <ChevronRight className="size-7" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
