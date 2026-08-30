/**
 * How the contact form actually delivers mail.
 *
 * Two implementations behind one function. The business has no domain yet, so
 * WEB3FORMS is active: a hosted endpoint that delivers straight to the Gmail
 * address with no DNS, no SPF/DKIM, and no server of our own.
 *
 * RESEND is written and ready but inactive. Once a domain exists and its
 * sending records are verified, set these and nothing else changes:
 *
 *   NEXT_PUBLIC_CONTACT_TRANSPORT=resend
 *   RESEND_API_KEY=...            (server-side only, never NEXT_PUBLIC_)
 *   CONTACT_FROM_EMAIL=website@yourdomain.com
 */

import type { ContactValues } from "./contact";

export type ContactTransport = "web3forms" | "resend";

export function activeTransport(): ContactTransport {
  return process.env.NEXT_PUBLIC_CONTACT_TRANSPORT === "resend"
    ? "resend"
    : "web3forms";
}

export interface SubmitPayload extends ContactValues {
  locale: string;
  courseLabel: string;
  languageLabel: string;
  subject: string;
  /** Honeypot. Must be empty - bots fill it in, people never see it. */
  company: string;
}

export interface SubmitResult {
  ok: boolean;
  /** For logging only. The visitor sees a translated message. */
  detail?: string;
}

export async function submitContact(
  payload: SubmitPayload,
): Promise<SubmitResult> {
  if (activeTransport() === "resend") {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, detail: `api/contact ${res.status}` };
    return { ok: true };
  }

  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) {
    return { ok: false, detail: "NEXT_PUBLIC_WEB3FORMS_KEY is not set" };
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      access_key: key,
      subject: payload.subject,
      from_name: "Progressive Driving School website",
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      preferred_language: payload.languageLabel,
      course: payload.courseLabel,
      message: payload.message,
      site_language: payload.locale,
      // Web3Forms' own honeypot field name.
      botcheck: payload.company,
    }),
  });

  if (!res.ok) return { ok: false, detail: `web3forms ${res.status}` };
  const body = (await res.json()) as { success?: boolean; message?: string };
  return body.success ? { ok: true } : { ok: false, detail: body.message };
}
