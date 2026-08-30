import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { getCopy } from "@/content/copy";
import { localesToBuild, site } from "@/content/site";
import { LOCALE_TAGS, isLocale, type Locale } from "@/lib/i18n";
import { JsonLd, organizationSchema } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

/**
 * This is the root layout: every route lives under /{lang}, so the locale is
 * known here and <html lang> is always correct. The bare "/" is redirected to
 * the default locale in next.config.ts.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return localesToBuild().map((lang) => ({ lang }));
}

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} | Columbus, Ohio`,
      template: `%s | ${site.name}`,
    },
    applicationName: site.name,
    formatDetection: { telephone: true },
    other: { "format-detection": "telephone=yes" },
  };
}

export const viewport = {
  themeColor: "#223446",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const copy = getCopy(locale);

  return (
    <html lang={LOCALE_TAGS[locale]} className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only rounded-b-lg bg-brand-800 px-4 py-3 font-semibold text-white focus:not-sr-only focus:absolute focus:top-0 focus:left-4 focus:z-[60]"
        >
          {copy.a11y.skipToContent}
        </a>
        <Header locale={locale} copy={copy} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} copy={copy} />
        <JsonLd data={organizationSchema(locale)} />
        {/* Cookie-free, so the site needs no consent banner. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
