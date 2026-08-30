import { redirect } from "next/navigation";
import { site } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n";

/**
 * The single place the registration destination is resolved.
 *
 * Every "Register" control on the site links to /{lang}/register, never to an
 * external URL directly. Filling in `site.registerUrl` is therefore a one-line
 * change that switches the whole site over - and until it is filled in, the
 * primary call to action still goes somewhere useful instead of nowhere.
 *
 * It is also a single chokepoint if click tracking is ever wanted.
 */
export const dynamic = "force-static";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  redirect(site.registerUrl ?? `${localePath(lang, "contact")}#enroll`);
}
