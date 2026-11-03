// ───────────────────────────────────────────────────────────────────────────
// Estimate form delivery. Provider is chosen in site.config.json → form.
//
//   formspree    POST to https://formspree.io/f/<formspreeId>
//   ghl-webhook  POST JSON to a GoHighLevel workflow "Inbound Webhook" URL
//
// Success is returned only when the receiving service answers 2xx. Network
// failures, CORS blocks, non-2xx answers, and a missing/invalid provider
// config all return { status: "error" }. Nothing is ever faked.
// No secrets live here: a Formspree ID and a GHL inbound-webhook URL are
// public form endpoints by design (private API keys must never go in this file).
// ───────────────────────────────────────────────────────────────────────────
import { siteConfig } from "@/config";
import { BUSINESS_NAME } from "./site-config";

export type EstimateValues = {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  details: string;
};

export type SubmitResult = { status: "success" } | { status: "error"; message: string };

const { provider, formspreeId, webhookUrl } = siteConfig.form;

function providerConfigured() {
  if (provider === "formspree") return /^[A-Za-z0-9_-]+$/.test(formspreeId);
  if (provider === "ghl-webhook") return /^https:\/\//i.test(webhookUrl);
  return false;
}

export const FORM_IS_LIVE = providerConfigured();

const GENERIC_ERROR = "We couldn't send your request.";

export async function submitEstimate(
  values: EstimateValues,
  honeypot: string,
): Promise<SubmitResult> {
  if (honeypot) return { status: "error", message: GENERIC_ERROR }; // bot filled the hidden field
  if (!FORM_IS_LIVE) return { status: "error", message: "Form is not configured." };

  const common = {
    name: values.name.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    service_needed: values.service,
    city_or_zip: values.location.trim(),
    project_details: values.details.trim(),
    business: BUSINESS_NAME,
    page_url: typeof window !== "undefined" ? window.location.href : "",
  };

  try {
    let res: Response;
    if (provider === "formspree") {
      res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...common, _subject: `New estimate request — ${BUSINESS_NAME}` }),
      });
    } else {
      res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: common.name,
          phone: common.phone,
          email: common.email,
          city_or_zip: common.city_or_zip,
          service_needed: common.service_needed,
          message: common.project_details,
          source: "website-estimate-form",
          business: common.business,
          page: common.page_url,
        }),
      });
    }
    if (res.ok) return { status: "success" };
    return { status: "error", message: GENERIC_ERROR };
  } catch {
    return { status: "error", message: GENERIC_ERROR };
  }
}
