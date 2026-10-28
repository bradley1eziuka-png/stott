import { SectionHeading } from "./section-heading";

const REASONS = [
  {
    title: "A local, family-owned business",
    body: "We're based right here in Trail Creek. This isn't a national painting franchise. It's a business Aron built after returning home to Indiana.",
  },
  {
    title: "Pride in the finished work",
    body: "Aron started this company because he enjoys painting and seeing what a difference it makes in someone's home.",
  },
  {
    title: "Reasonable, straightforward pricing",
    body: "A paint job is an investment in your home. You deserve a reasonable price and a clear conversation about what needs to be done.",
  },
  {
    title: "Your home, your preferences",
    body: "Some homeowners know exactly what they want. Others are still figuring it out. Either way, we want to understand it first.",
  },
];

// Editorial split: statement on the left, numbered list on the right.
export function Trust() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Why homeowners choose Stotts"
              title="It's Your Home. We Treat the Work Like It Matters."
            />
            <div className="t-body mt-6 space-y-4 text-muted-foreground">
              <p>
                A paint job isn't something you should have to second-guess once it's finished. You
                want someone who listens, pays attention to the details, and cares how the final
                result looks.
              </p>
              <p>That's the kind of business Aron set out to build.</p>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {REASONS.map((r, i) => (
            <li
              key={r.title}
              className="group grid grid-cols-[3.25rem_1fr] gap-x-4 border-t border-border py-7 first:border-t-2 first:border-t-primary sm:grid-cols-[4.5rem_1fr] sm:py-8"
            >
              <span
                className="font-display text-3xl font-extrabold leading-none text-accent sm:text-4xl"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="t-card">{r.title}</h3>
                <p className="mt-2.5 max-w-[52ch] leading-[1.7] text-muted-foreground">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
