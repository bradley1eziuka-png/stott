import { ArrowRight, Phone } from "lucide-react";

import { PHOTOS } from "@/lib/photos";
import {
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  COPY,
  LOCATION_LABEL,
  REVIEWS,
} from "@/lib/site-config";
import { ctaButton } from "./buttons";
import { Stars } from "./stars";

// Split hero: message + CTAs left, a real exterior right. The portrait
// craftsman shot (720×960) is the sharpest finished exterior supplied.
// Below it, a charcoal trust band carries the verified-at-launch facts.
export function Hero() {
  const photo = PHOTOS.craftsmanPortrait;
  // "Michigan City Homes" is set in red; the rest is black, broken by hand
  // into "Interior & Exterior / Painting for / Michigan City Homes".
  const headline = COPY.hero.headline;
  const cut = headline.indexOf("Michigan");
  const lead = (cut > 0 ? headline.slice(0, cut) : headline).trim();
  const tail = cut > 0 ? headline.slice(cut) : "";
  const leadLines = lead.split(/ (?=Painting)/);

  return (
    <>
      <section id="top" className="relative overflow-hidden bg-background">
        <div className="container-page grid items-center gap-10 pb-12 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-14">
          <div className="lg:col-span-7">
            <p
              className="rise eyebrow mb-5 flex items-center gap-3 text-accent"
              style={{ ["--d" as string]: "0ms" }}
            >
              <span className="h-[3px] w-8 shrink-0 bg-accent" aria-hidden />
              {COPY.hero.eyebrow}
            </p>

            <h1 className="rise t-hero" style={{ ["--d" as string]: "70ms" }}>
              {leadLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {tail && <span className="block text-accent">{tail}</span>}
            </h1>

            <p
              className="rise mt-6 max-w-[36rem] text-[1.0625rem] leading-[1.7] text-foreground/80 sm:text-lg"
              style={{ ["--d" as string]: "150ms" }}
            >
              {COPY.hero.subheadline}
            </p>

            <div
              className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ ["--d" as string]: "230ms" }}
            >
              <a href="/contact#estimate" className={ctaButton({ variant: "red", size: "xl" })}>
                Get a painting estimate
                <ArrowRight />
              </a>
              <a
                href={BUSINESS_PHONE_TEL}
                className={ctaButton({ variant: "outline", size: "lg" })}
              >
                <Phone />
                Call {BUSINESS_PHONE}
              </a>
            </div>
          </div>

          <div
            className="rise relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none"
            style={{ ["--d" as string]: "160ms" }}
          >
            <div className="relative mr-3 sm:mr-4 lg:ml-auto lg:max-w-[28rem]">
              <div
                className="absolute -bottom-3 -right-3 h-full w-full bg-accent sm:-bottom-4 sm:-right-4"
                aria-hidden
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary shadow-float">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="h-full w-full object-cover object-[50%_35%]"
                  loading="eager"
                  fetchPriority="high"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/50 to-transparent"
                  aria-hidden
                />
                <p className="on-dark absolute bottom-3 left-3 eyebrow text-white">
                  Exterior project
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust band */}
      <div className="on-dark grain bg-primary text-white">
        <ul className="container-page grid grid-cols-2 divide-white/15 py-1 text-sm sm:text-[0.95rem] lg:grid-cols-4 lg:divide-x">
          {REVIEWS && (
            <li className="flex flex-col justify-center gap-1 px-0 py-4 lg:px-6 lg:first:pl-0">
              <span className="flex items-center gap-2">
                <Stars className="text-red-bright" />
                <span className="font-display text-2xl font-extrabold leading-none">
                  {REVIEWS.rating}
                </span>
              </span>
              <span className="text-white/70">{REVIEWS.source} rating</span>
            </li>
          )}
          {REVIEWS && (
            <li className="flex flex-col justify-center gap-1 px-0 py-4 lg:px-6">
              <span className="font-display text-2xl font-extrabold leading-none">
                {REVIEWS.count}
              </span>
              <span className="text-white/70">{REVIEWS.source} reviews</span>
            </li>
          )}
          <li className="flex flex-col justify-center gap-1 px-0 py-4 lg:px-6">
            <span className="font-display text-2xl font-extrabold uppercase leading-none">
              Family-owned
            </span>
            <span className="text-white/70">Not a franchise</span>
          </li>
          <li className="flex flex-col justify-center gap-1 px-0 py-4 lg:px-6">
            <span className="font-display text-2xl font-extrabold uppercase leading-none">
              {LOCATION_LABEL}
            </span>
            <span className="text-white/70">Serving Michigan City &amp; nearby</span>
          </li>
        </ul>
      </div>
    </>
  );
}
