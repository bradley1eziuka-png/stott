import { Clock, Mail, MapPin, Phone } from "lucide-react";

import {
  BUSINESS_EMAIL,
  BUSINESS_HOURS,
  BUSINESS_LEGAL_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  COPY,
  LOCATION_LABEL,
  SERVICE_AREAS,
} from "@/lib/site-config";
import { SERVICE_LIST } from "@/lib/services-data";
import { Logo } from "./logo";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Contact", href: "/contact" },
  { label: "Request an Estimate", href: "/contact#estimate" },
];

const headingClass = "eyebrow text-red-bright";
const linkClass =
  "text-[0.95rem] text-white/80 hover:text-white hover:underline decoration-red-bright decoration-2 underline-offset-4";

export function Footer() {
  const year = new Date().getFullYear();
  const city = LOCATION_LABEL.replace(", IN", ", Indiana");

  return (
    <footer className="on-dark grain bg-primary pb-24 text-white lg:pb-0">
      <div className="h-1.5 bg-accent" aria-hidden />
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr_1.3fr] lg:gap-10">
          <div>
            {/* The logo artwork is on white, so it sits on a white plate. */}
            <a href="/" className="inline-block rounded-sm bg-white p-2.5" aria-label="Home">
              <Logo className="h-[64px]" />
            </a>
            <p className="mt-2 max-w-sm text-[0.95rem] leading-[1.7] text-white/70">
              {COPY.footerBlurb}
            </p>
          </div>

          <div>
            <h3 className={headingClass}>Explore</h3>
            <ul className="mt-5 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Services</h3>
            <ul className="mt-5 space-y-3">
              {SERVICE_LIST.map((service) => (
                <li key={service.slug}>
                  <a href={service.path} className={linkClass}>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Get in touch</h3>
            <ul className="mt-5 space-y-4 text-[0.95rem] text-white/80">
              <li>
                <a
                  href={BUSINESS_PHONE_TEL}
                  className="flex items-center gap-3 font-display text-3xl font-extrabold tracking-[-0.01em] text-white hover:text-red-bright"
                >
                  <Phone className="size-5 shrink-0 text-red-bright" />
                  {BUSINESS_PHONE}
                </a>
              </li>
              {BUSINESS_EMAIL && (
                <li>
                  <a
                    href={`mailto:${BUSINESS_EMAIL}`}
                    className="flex items-center gap-3 break-all hover:text-white hover:underline"
                  >
                    <Mail className="size-5 shrink-0 text-red-bright" />
                    {BUSINESS_EMAIL}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-red-bright" />
                <span>
                  Based in {city}
                  {SERVICE_AREAS.length > 0 && (
                    <>
                      <br />
                      <span className="text-white/60">
                        Serving Northwest Indiana &amp; Southwest Michigan
                      </span>
                    </>
                  )}
                </span>
              </li>
              {BUSINESS_HOURS.map((row) => (
                <li key={row.days} className="flex items-start gap-3">
                  <Clock className="mt-1 size-5 shrink-0 text-red-bright" />
                  <span>
                    {row.days}
                    <br />
                    <span className="text-white/60">{row.hours}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-[0.8rem] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BUSINESS_LEGAL_NAME}. All rights reserved.
          </p>
          <p>Trail Creek, Indiana</p>
        </div>
      </div>
    </footer>
  );
}
