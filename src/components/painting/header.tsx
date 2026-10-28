import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_PHONE_TEL } from "@/lib/site-config";
import { SERVICE_LIST } from "@/lib/services-data";
import { ctaButton } from "./buttons";
import { Logo, LogoMark } from "./logo";

const NAV_BEFORE = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];
const NAV_AFTER = [
  { label: "Our Work", href: "/our-work" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const servicesActive = pathname.startsWith("/services");

  const linkClass = (active: boolean) =>
    cn(
      "relative inline-flex h-11 items-center font-display text-[1.2rem] font-bold uppercase tracking-[0.04em] text-primary hover:text-accent",
      "after:absolute after:inset-x-0 after:bottom-1.5 after:h-[3px] after:origin-left after:bg-accent after:transition-transform after:duration-300 after:ease-spring",
      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
    );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 shadow-[0_10px_24px_-20px_rgb(23_23_23/0.45)] backdrop-blur">
        <div className="container-page flex h-[68px] items-center justify-between gap-4 lg:h-[80px]">
          <a href="/" className="flex shrink-0 items-center" aria-label={`${BUSINESS_NAME}, home`}>
            <Logo className="hidden h-[52px] sm:block lg:h-[60px]" />
            <span className="flex items-center gap-2.5 sm:hidden">
              <LogoMark className="h-[44px]" />
              <span className="font-display uppercase leading-[0.86] text-primary">
                <span className="block text-[1.7rem] font-black tracking-[-0.02em]">Stotts</span>
                <span className="block text-[0.82rem] font-bold tracking-[0.08em]">
                  Extravagant Painting
                </span>
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Primary">
            {NAV_BEFORE.map((l) => (
              <a key={l.href} href={l.href} className={linkClass(isActive(l.href))}>
                {l.label}
              </a>
            ))}

            <div className="group relative">
              <button
                type="button"
                aria-haspopup="true"
                className={cn(linkClass(servicesActive), "gap-1")}
              >
                Services
                <ChevronDown className="size-4 transition-transform duration-300 ease-spring group-focus-within:rotate-180 group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-[opacity,transform] duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <ul className="border-t-4 border-accent bg-white p-2 shadow-float">
                  {SERVICE_LIST.map((service) => (
                    <li key={service.slug}>
                      <a
                        href={service.path}
                        className="flex items-center justify-between px-4 py-3 font-display text-[1.15rem] font-bold uppercase tracking-[0.03em] text-primary hover:bg-secondary hover:text-accent"
                      >
                        {service.title}
                        {service.priority && (
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {NAV_AFTER.map((l) => (
              <a key={l.href} href={l.href} className={linkClass(isActive(l.href))}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={BUSINESS_PHONE_TEL}
              className="inline-flex items-center gap-2 font-display text-[1.3rem] font-extrabold tracking-[0.02em] text-primary hover:text-accent"
            >
              <Phone className="size-[1.05rem] text-accent" aria-hidden />
              {BUSINESS_PHONE}
            </a>
            <a href="/contact#estimate" className={ctaButton({ variant: "red", size: "sm" })}>
              Request Estimate
            </a>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={BUSINESS_PHONE_TEL}
              aria-label={`Call ${BUSINESS_PHONE}`}
              className="inline-flex size-11 items-center justify-center rounded-sm bg-accent text-white hover:bg-red-deep active:translate-y-px"
            >
              <Phone className="size-5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-sm text-primary hover:bg-secondary"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="size-7" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div
            className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-float">
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-border px-5">
              <span className="font-display text-2xl font-black uppercase tracking-[-0.02em] text-primary">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-sm text-primary hover:bg-secondary"
                aria-label="Close menu"
              >
                <X className="size-7" />
              </button>
            </div>

            <nav className="flex flex-col overflow-y-auto px-3 py-4" aria-label="Mobile">
              {[...NAV_BEFORE, { label: "Services", href: "" }, ...NAV_AFTER].map((l) =>
                l.href ? (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-12 items-center border-l-4 px-4 font-display text-[1.7rem] font-extrabold uppercase tracking-[-0.01em] hover:bg-secondary",
                      isActive(l.href)
                        ? "border-accent text-accent"
                        : "border-transparent text-primary",
                    )}
                  >
                    {l.label}
                  </a>
                ) : (
                  <div key="services" className="py-1">
                    <p className="px-4 pb-1 pt-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Services
                    </p>
                    {SERVICE_LIST.map((service) => (
                      <a
                        key={service.slug}
                        href={service.path}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex min-h-11 items-center border-l-4 px-4 text-[1.02rem] font-semibold hover:bg-secondary hover:text-accent",
                          pathname === service.path
                            ? "border-accent text-accent"
                            : "border-transparent text-primary",
                        )}
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                ),
              )}
            </nav>

            <div className="mt-auto space-y-3 border-t border-border bg-background p-5">
              <a
                href="/contact#estimate"
                onClick={() => setOpen(false)}
                className={cn(ctaButton({ variant: "red", size: "md" }), "w-full")}
              >
                Request an Estimate
              </a>
              <a
                href={BUSINESS_PHONE_TEL}
                className={cn(ctaButton({ variant: "outline", size: "md" }), "w-full")}
              >
                <Phone />
                {BUSINESS_PHONE}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
