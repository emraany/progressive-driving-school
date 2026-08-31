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
  courseLabel: string;
  languageLabel: string;
  subject: string;
  /** Honeypot. Must be false - bots tick it, people never see it. */
  botcheck: boolean;
}

export interface SubmitResult {
  ok: boolean;
  /** For logging only. The visitor sees a translated message. */
  detail?: string;
}

/** Requests that hang are worse than requests that fail: the visitor stares at
 *  a "Sending..." button with no way forward. Cap them. */
const TIMEOUT_MS = 20_000;

async function post(
  url: string,
  body: unknown,
  headers: Record<string, string>,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Always resolves, never throws.
 *
 * fetch() rejects on a dropped connection, DNS failure, CORS rejection or an
 * aborted timeout. If any of those escaped, the form would sit on "Sending..."
 * for ever and the visitor would never see the phone-number fallback - which
 * is the whole point of the error state. So every path returns a result.
 */
export async function submitContact(
  payload: SubmitPayload,
): Promise<SubmitResult> {
  try {
    if (activeTransport() === "resend") {
      const res = await post("/api/contact", payload, {
        "content-type": "application/json",
      });
      return res.ok
        ? { ok: true }
        : { ok: false, detail: `api/contact ${res.status}` };
    }

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      return { ok: false, detail: "NEXT_PUBLIC_WEB3FORMS_KEY is not set" };
    }

    const res = await post(
      "https://api.web3forms.com/submit",
      {
        access_key: key,
        subject: payload.subject,
        from_name: "Progressive Driving School website",
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        preferred_language: payload.languageLabel,
        course: payload.courseLabel,
        message: payload.message,
        // Web3Forms' own honeypot field name.
        botcheck: payload.botcheck,
      },
      { "content-type": "application/json", accept: "application/json" },
    );

    if (!res.ok) return { ok: false, detail: `web3forms ${res.status}` };
    const body = (await res.json()) as { success?: boolean; message?: string };
    return body.success ? { ok: true } : { ok: false, detail: body.message };
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    return {
      ok: false,
      detail: aborted
        ? `timed out after ${TIMEOUT_MS}ms`
        : `network error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
