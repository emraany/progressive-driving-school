/** Shared by the browser form and the server route, so both validate alike. */

export interface ContactValues {
  name: string;
  phone: string;
  email: string;
  preferredLanguage: string;
  course: string;
  message: string;
}

/** Keys into copy.form.errors, so messages stay translatable. */
export type ContactErrorKey =
  | "nameRequired"
  | "contactRequired"
  | "emailInvalid"
  | "messageRequired";

export type ContactErrors = Partial<Record<keyof ContactValues, ContactErrorKey>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name.trim()) errors.name = "nameRequired";

  // Either way of reaching them is fine, but we need one of them.
  if (!values.phone.trim() && !values.email.trim()) {
    errors.phone = "contactRequired";
  }

  if (values.email.trim() && !EMAIL.test(values.email.trim())) {
    errors.email = "emailInvalid";
  }

  if (!values.message.trim()) errors.message = "messageRequired";

  return errors;
}

export const emptyContactValues: ContactValues = {
  name: "",
  phone: "",
  email: "",
  preferredLanguage: "",
  course: "",
  message: "",
};

/** Plain-text body, used by whichever transport is active. */
export function formatContactEmail(
  values: ContactValues,
  meta: { locale: string; courseLabel: string; languageLabel: string },
): string {
  return [
    `Name: ${values.name}`,
    `Phone: ${values.phone || "-"}`,
    `Email: ${values.email || "-"}`,
    `Preferred language: ${meta.languageLabel || "-"}`,
    `Course of interest: ${meta.courseLabel || "-"}`,
    "",
    "Message:",
    values.message,
    "",
    `— Sent from the ${meta.locale} version of the website.`,
  ].join("\n");
}
