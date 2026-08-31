"use client";

import { useEffect, useId, useRef, useState } from "react";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { buttonClasses } from "@/components/ui/Button";
import { CheckIcon, PhoneIcon } from "@/components/ui/icons";
import {
  emptyContactValues,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";
import { submitContact } from "@/lib/contact-transport";
import { interpolate } from "@/lib/format";

type Status = "idle" | "submitting" | "success" | "error";

export interface CourseOption {
  value: string;
  label: string;
}

export interface LanguageOption {
  value: string;
  label: string;
}

const fieldClasses =
  "w-full rounded-lg border border-line-strong bg-surface-raised px-3.5 py-3 text-base text-ink-900 " +
  "placeholder:text-ink-400 focus:border-brand-500 focus:outline-none";

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-700">
        {label}
        {optional ? (
          <span className="ml-1.5 font-normal text-ink-400">{optional}</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({
  courseOptions,
  languageOptions,
}: {
  courseOptions: CourseOption[];
  languageOptions: LanguageOption[];
}) {
  const uid = useId();
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const honeypot = useRef<HTMLInputElement>(null);
  // Set after mount rather than during render: reading the clock while
  // rendering is impure, and this only needs to be a rough "when did the form
  // appear" marker for the bot time-trap below.
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const f = copy.form;
  const id = (name: string) => `${uid}-${name}`;
  const set = (name: keyof ContactValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setValues((v) => ({ ...v, [name]: e.target.value }));

  const describedBy = (name: keyof ContactValues) =>
    errors[name] ? `${id(name)}-error` : undefined;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(id(Object.keys(found)[0]))?.focus();
      return;
    }

    // Bots fill the hidden field, and bots submit instantly. People do neither.
    const trapped =
      Boolean(honeypot.current?.value) ||
      (mountedAt.current > 0 && Date.now() - mountedAt.current < 2000);
    if (trapped) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    const courseLabel =
      courseOptions.find((o) => o.value === values.course)?.label ?? "";
    const languageLabel =
      languageOptions.find((o) => o.value === values.preferredLanguage)?.label ?? "";

    const result = await submitContact({
      ...values,
      locale: "en",
      courseLabel,
      languageLabel,
      subject: `Website enquiry from ${values.name}`,
      company: honeypot.current?.value ?? "",
    });

    if (!result.ok) console.error("Contact form failed:", result.detail);
    setStatus(result.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-(--radius-card) border border-brand-200 bg-brand-50 p-7"
      >
        <CheckIcon className="h-6 w-6 text-brand-600" />
        <h2 className="mt-3 font-display text-xl font-semibold text-ink-900">
          {f.successHeading}
        </h2>
        <p className="mt-2 text-base leading-relaxed text-ink-700">{f.successBody}</p>
        <a
          href={site.phone.href}
          aria-label={copy.a11y.callAria}
          className={buttonClasses("secondary", "md", "mt-6")}
        >
          <PhoneIcon className="h-4 w-4" />
          {site.phone.display}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {status === "error" ? (
        <div
          role="alert"
          className="rounded-lg border border-danger-500 bg-danger-50 p-4"
        >
          <p className="font-semibold text-ink-900">{f.errorHeading}</p>
          {/* A form outage must never cost a lead: the fallback is the phone. */}
          <p className="mt-1 text-sm leading-relaxed text-ink-700">
            {interpolate(f.errorBody, { phone: site.phone.display })}
          </p>
        </div>
      ) : null}

      <Field
        id={id("name")}
        label={f.nameLabel}
        error={errors.name ? f.errors[errors.name] : undefined}
      >
        <input
          id={id("name")}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={set("name")}
          placeholder={f.namePlaceholder}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name")}
          className={fieldClasses}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={id("phone")}
          label={f.phoneLabel}
          error={errors.phone ? f.errors[errors.phone] : undefined}
        >
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set("phone")}
            placeholder={f.phonePlaceholder}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={fieldClasses}
          />
        </Field>

        <Field
          id={id("email")}
          label={f.emailLabel}
          error={errors.email ? f.errors[errors.email] : undefined}
        >
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            placeholder={f.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={fieldClasses}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("course")} label={f.courseLabel} optional={f.optionalSuffix}>
          <select
            id={id("course")}
            name="course"
            value={values.course}
            onChange={set("course")}
            className={fieldClasses}
          >
            <option value="">{f.coursePlaceholder}</option>
            {courseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            <option value="other">{f.courseOther}</option>
          </select>
        </Field>

        <Field
          id={id("preferredLanguage")}
          label={f.languageLabel}
          optional={f.optionalSuffix}
        >
          <select
            id={id("preferredLanguage")}
            name="preferredLanguage"
            value={values.preferredLanguage}
            onChange={set("preferredLanguage")}
            className={fieldClasses}
          >
            <option value="">—</option>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id={id("message")}
        label={f.messageLabel}
        error={errors.message ? f.errors[errors.message] : undefined}
      >
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          placeholder={f.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={`${fieldClasses} resize-y`}
        />
      </Field>

      {/* Honeypot. Off-screen rather than display:none, and never focusable. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor={id("company")}>Company</label>
        <input
          ref={honeypot}
          id={id("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClasses("primary", "lg", "w-full sm:w-auto")}
      >
        {status === "submitting" ? f.submitting : f.submit}
      </button>

      <p className="text-sm leading-relaxed text-ink-500">{f.privacyNote}</p>
    </form>
  );
}
