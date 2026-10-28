import type { ReactNode } from "react";

// Compact charcoal title band for About / Our Work / Contact.
export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark grain bg-primary text-white">
      <div className="container-page pb-12 pt-10 lg:pb-16 lg:pt-14">
        <p className="rise eyebrow mb-4 flex items-center gap-3 text-red-bright">
          <span className="h-[3px] w-9 bg-red-bright" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="rise t-page max-w-3xl text-white" style={{ ["--d" as string]: "70ms" }}>
          {title}
        </h1>
        {children && (
          <div
            className="rise mt-5 max-w-xl text-lg leading-[1.65] text-white/80"
            style={{ ["--d" as string]: "150ms" }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
