import { useState, type FormEvent } from "react";
import { CheckCircle2, Info, Mail, Phone } from "lucide-react";

import { FORM_IS_DEMO, submitEstimate } from "@/lib/form-submit";
import { siteConfig } from "@/config";
import { BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_TEL } from "@/lib/site-config";
import { SERVICE_LIST } from "@/lib/services-data";
import { cn } from "@/lib/utils";
import { ctaButton } from "./buttons";

const SERVICE_OPTIONS = [...SERVICE_LIST.map((s) => s.title), "Something else"];

type Values = {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  details: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", phone: "", email: "", service: "", location: "", details: "" };

const field =
  "w-full rounded-sm border-2 bg-white px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/25";
const ok = "border-input";
const bad = "border-destructive";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-bold text-primary">
      {children}
      {required ? (
        <span className="text-accent" aria-hidden>
          {" "}
          *
        </span>
      ) : (
        <span className="font-medium text-muted-foreground"> (optional)</span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-semibold text-destructive" role="alert">
      {message}
    </p>
  );
}

// Estimate request form. Delivery is handled by src/lib/form-submit.ts:
// Formspree, a GHL webhook, or "demo" (not connected). Success is shown only
// after the provider answers 2xx; in demo mode the form says plainly that
// nothing was sent and keeps the visitor's entries.
export function EstimateFormCard({ id, className }: { id?: string; className?: string }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "demo" | "error">(
    "idle",
  );
  const [honeypot, setHoneypot] = useState("");

  function update<K extends keyof Values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (values.phone.replace(/\D/g, "").length < 10)
      next.phone = "Please enter a 10-digit phone number.";
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "That email doesn't look right. Check it or leave it blank.";
    if (!values.service) next.service = "Please choose a service.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    const result = await submitEstimate(values, honeypot);
    if (result.status === "success") {
      setStatus("success");
      setValues(EMPTY);
    } else if (result.status === "demo") {
      setStatus("demo");
    } else {
      setStatus("error");
    }
  }

  const describe = (key: keyof Values) => (errors[key] ? `err-${key}` : undefined);

  return (
    <div
      id={id}
      className={cn(
        "scroll-mt-28 border-t-[6px] border-accent bg-white p-6 shadow-float sm:p-9",
        className,
      )}
    >
      <h2 className="t-section">Tell us about your project</h2>
      <p className="mt-3 text-[1rem] leading-[1.65] text-muted-foreground">
        Share what you'd like done. We only need your name, phone number, and the service you're
        interested in.
      </p>

      {FORM_IS_DEMO && siteConfig.form.showDemoNotice && (
        <div
          role="note"
          className="mt-5 flex gap-3 border-l-4 border-primary bg-secondary px-4 py-3 text-[0.92rem] leading-[1.55] text-primary"
        >
          <Info className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p>
            <strong>Online requests aren't connected yet.</strong> Until they are, please{" "}
            <a href={BUSINESS_PHONE_TEL} className="font-bold underline underline-offset-2">
              call {BUSINESS_PHONE}
            </a>
            {BUSINESS_EMAIL && (
              <>
                {" "}
                or{" "}
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="font-bold underline underline-offset-2"
                >
                  email us
                </a>
              </>
            )}
            .
          </p>
        </div>
      )}

      {status === "success" ? (
        <div
          role="status"
          className="mt-8 flex flex-col items-start gap-4 border-2 border-primary p-7"
        >
          <CheckCircle2 className="size-10 text-accent" aria-hidden />
          <h3 className="text-4xl">Thank you. We'll be in touch.</h3>
          <p className="text-muted-foreground">
            Your request was received. We'll reach out to talk through your project. Need us sooner?{" "}
            <a href={BUSINESS_PHONE_TEL} className="font-bold text-primary underline">
              Call {BUSINESS_PHONE}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="font-bold text-accent underline underline-offset-4 hover:text-red-deep"
          >
            Send another request
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative mt-7 space-y-5">
          {/* Honeypot: hidden from people, tempting to bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="est-website">Leave this field empty</label>
            <input
              id="est-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="est-name" required>
                Name
              </Label>
              <input
                id="est-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                className={cn(field, "h-12", errors.name ? bad : ok)}
                aria-invalid={!!errors.name}
                aria-describedby={describe("name")}
                aria-required
              />
              <FieldError id="err-name" message={errors.name} />
            </div>
            <div>
              <Label htmlFor="est-phone" required>
                Phone
              </Label>
              <input
                id="est-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(219) 555-0123"
                value={values.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={cn(field, "h-12", errors.phone ? bad : ok)}
                aria-invalid={!!errors.phone}
                aria-describedby={describe("phone")}
                aria-required
              />
              <FieldError id="err-phone" message={errors.phone} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="est-email">Email</Label>
              <input
                id="est-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                className={cn(field, "h-12", errors.email ? bad : ok)}
                aria-invalid={!!errors.email}
                aria-describedby={describe("email")}
              />
              <FieldError id="err-email" message={errors.email} />
            </div>
            <div>
              <Label htmlFor="est-location">City or ZIP code</Label>
              <input
                id="est-location"
                name="location"
                type="text"
                autoComplete="postal-code"
                placeholder="Michigan City or 46360"
                value={values.location}
                onChange={(e) => update("location", e.target.value)}
                className={cn(field, "h-12", ok)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="est-service" required>
              Service needed
            </Label>
            <select
              id="est-service"
              name="service"
              value={values.service}
              onChange={(e) => update("service", e.target.value)}
              className={cn(field, "h-12 cursor-pointer", errors.service ? bad : ok)}
              aria-invalid={!!errors.service}
              aria-describedby={describe("service")}
              aria-required
            >
              <option value="" disabled>
                What do you need help with?
              </option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <FieldError id="err-service" message={errors.service} />
          </div>

          <div>
            <Label htmlFor="est-details">Project details</Label>
            <textarea
              id="est-details"
              name="details"
              rows={5}
              value={values.details}
              onChange={(e) => update("details", e.target.value)}
              placeholder="What would you like done? A room, the exterior, a fence or deck? Add anything you think we should know."
              className={cn(field, "py-3", ok)}
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className={cn(ctaButton({ variant: "red", size: "lg" }), "w-full")}
          >
            {status === "submitting" ? "Sending…" : "Send my request"}
          </button>

          {status === "demo" && (
            <div
              role="alert"
              className="border-2 border-primary bg-secondary p-4 text-[0.95rem] leading-[1.6] text-primary"
            >
              <p className="font-bold">Your request was not sent.</p>
              <p className="mt-1">
                This form isn't connected to an inbox yet, so nothing was delivered. Please reach us
                directly:
              </p>
              <p className="mt-3 flex flex-col gap-2 font-bold sm:flex-row sm:gap-6">
                <a
                  href={BUSINESS_PHONE_TEL}
                  className="inline-flex items-center gap-2 underline underline-offset-2 hover:text-accent"
                >
                  <Phone className="size-4" aria-hidden />
                  {BUSINESS_PHONE}
                </a>
                {BUSINESS_EMAIL && (
                  <a
                    href={`mailto:${BUSINESS_EMAIL}`}
                    className="inline-flex items-center gap-2 break-all underline underline-offset-2 hover:text-accent"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden />
                    {BUSINESS_EMAIL}
                  </a>
                )}
              </p>
            </div>
          )}

          {status === "error" && (
            <p role="alert" className="text-sm font-semibold text-destructive">
              We couldn't send your request. Please try again or call us at{" "}
              <a href={BUSINESS_PHONE_TEL} className="underline">
                {BUSINESS_PHONE}
              </a>
              .
            </p>
          )}
        </form>
      )}
    </div>
  );
}
