import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Columbus, Ohio`,
    template: `%s | ${site.name}`,
  },
  applicationName: site.name,
  formatDetection: { telephone: true },
  other: { "format-detection": "telephone=yes" },
};

export const viewport = {
  themeColor: "#071c49",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only rounded-b-lg bg-brand-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:absolute focus:top-0 focus:left-4 focus:z-[60]"
        >
          {copy.a11y.skipToContent}
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationSchema()} />
        {/* Cookie-free, so the site needs no consent banner. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
