/**
 * Resend delivery path. INACTIVE until the business has a domain.
 *
 * Uses the Resend REST API directly rather than the SDK, so the project
 * carries no extra dependency while this path is unused. Activate by setting
 * NEXT_PUBLIC_CONTACT_TRANSPORT=resend plus RESEND_API_KEY and
 * CONTACT_FROM_EMAIL in the Vercel project settings.
 */
import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { formatContactEmail, validateContact, type ContactValues } from "@/lib/contact";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json(
      { ok: false, error: "Resend transport is not configured." },
      { status: 503 },
    );
  }

  let body: ContactValues & {
    botcheck?: boolean;
    locale?: string;
    courseLabel?: string;
    languageLabel?: string;
    subject?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: accept and discard, so a bot sees success and doesn't retry.
  if (body.botcheck) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const text = formatContactEmail(body, {
    locale: body.locale ?? "en",
    courseLabel: body.courseLabel ?? "",
    languageLabel: body.languageLabel ?? "",
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [site.email],
      // So the owner can hit Reply and reach the student directly.
      reply_to: body.email || undefined,
      subject: body.subject ?? `Website enquiry from ${body.name}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend failed", res.status, await res.text());
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
