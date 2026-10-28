// Brand treatment for photos used as card backgrounds: a red multiply tint
// for color cohesion plus a bottom gradient so overlaid text stays readable.
export function PhotoOverlay({ strong = false }: { strong?: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-accent/15 mix-blend-multiply" aria-hidden />
      <div
        className={
          "absolute inset-0 bg-linear-to-t to-transparent " +
          (strong ? "from-black/80 via-black/25" : "from-black/70 via-black/10")
        }
        aria-hidden
      />
    </>
  );
}
