import { redirect } from "next/navigation";
import { site } from "@/content/site";

/**
 * The single place the registration destination is resolved.
 *
 * Every "Register" control on the site links to /register, never to the
 * external form directly, so changing where enrolment happens is a one-line
 * edit to site.registerUrl. If it is ever unset, this falls back to the
 * contact page rather than dead-ending the primary call to action.
 *
 * It is also a single chokepoint if click tracking is ever wanted.
 */
export const dynamic = "force-static";

export default function RegisterPage() {
  redirect(site.registerUrl ?? "/contact#enroll");
}
