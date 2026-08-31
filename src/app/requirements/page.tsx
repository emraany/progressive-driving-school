import type { Metadata } from "next";
import { CallButton } from "@/components/site/CallButton";
import { Figure } from "@/components/media/Figure";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { CheckIcon } from "@/components/ui/icons";
import {
  BMV_STEP_IDS,
  TEST_DAY_ITEM_IDS,
  bmv,
  bmvStepLinks,
  type BmvLinkKey,
} from "@/content/bmv";
import { copy } from "@/content/copy";
import { hasMedia } from "@/content/media";
import { renderBmv } from "@/lib/copy-render";
import { formatVerifiedDate, interpolate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, JsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  path: "/requirements",
  title: copy.requirementsPage.title,
  description: copy.requirementsPage.description,
});

export default function RequirementsPage() {
  const page = copy.requirementsPage;
  const showBanner = hasMedia("requirementsBanner");
  const linkKeys = Object.keys(bmv.links) as BmvLinkKey[];

  return (
    <>
      <Section tone="raised" className="border-b border-line" width="wide">
        <div
          className={`grid items-center gap-10 lg:gap-16 ${
            showBanner ? "lg:grid-cols-[1.15fr_0.85fr]" : ""
          }`}
        >
          <div>
            <SectionHeader heading={page.heading} lede={page.intro} />
            <p className="mt-6 max-w-xl rounded-lg bg-brand-50 px-4 py-3 text-sm leading-relaxed text-brand-800">
              {page.audienceNote}
            </p>
          </div>
          {showBanner ? (
            <Figure
              slot="requirementsBanner"
              alt={copy.media.requirementsBanner}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          ) : null}
        </div>
      </Section>

      {/* The three steps */}
      <Section width="narrow">
        <ol className="space-y-12">
          {BMV_STEP_IDS.map((id, index) => (
            <li key={id}>
              <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">
                {interpolate(page.stepLabel, { n: index + 1 })}
              </p>
              <h2 className="text-(length:--text-h2) leading-snug font-semibold">
                {renderBmv(copy.bmv.steps[id].title)}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-700 sm:text-lg">
                {renderBmv(copy.bmv.steps[id].body)}
              </p>

              <ul className="mt-5 space-y-2.5 text-sm sm:text-base">
                {bmvStepLinks[id].map((key) => (
                  <li key={key}>
                    <ExternalLink
                      href={bmv.links[key]}
                      newTabLabel={copy.a11y.opensInNewTab}
                      className="font-medium text-brand-700"
                    >
                      {renderBmv(page.linkLabels[key])}
                    </ExternalLink>
                  </li>
                ))}
              </ul>

              {id === "education" ? (
                <p className="mt-5 border-l-2 border-line-strong pl-4 text-sm leading-relaxed text-ink-500">
                  {page.certificateNote}
                </p>
              ) : null}

              {id === "test" ? (
                <Card className="mt-7 p-6 sm:p-7">
                  <h3 className="text-(length:--text-h3) font-semibold">
                    {page.testDay.heading}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                    {page.testDay.intro}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-700 sm:text-base">
                    {TEST_DAY_ITEM_IDS.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckIcon className="mt-[0.35em] h-3.5 w-3.5 text-brand-600" />
                        <span>{renderBmv(page.testDay.items[item])}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}
            </li>
          ))}
        </ol>

        {/* The client's material covers ages 18-20 only. Rather than guess at
            what applies to 21+, the site says so and routes them to a person. */}
        <Card className="mt-14 bg-surface-sunken p-6 sm:p-7">
          <p className="text-base leading-relaxed text-ink-700">{page.adultNote}</p>
          <div className="mt-5">
            <CallButton variant="secondary" size="md" showNumber />
          </div>
        </Card>
      </Section>

      {/* FAQ */}
      <Section tone="sunken" width="narrow" id="faq">
        <SectionHeader heading={copy.faq.heading} lede={copy.faq.intro} />
        <dl className="mt-10 divide-y divide-line-strong border-t border-line-strong">
          {Object.entries(copy.faq.items).map(([id, item]) => (
            <div key={id} className="py-6">
              <dt className="font-display text-lg leading-snug font-semibold text-ink-900">
                {renderBmv(item.q)}
              </dt>
              <dd className="mt-2.5 text-base leading-relaxed text-ink-700">
                {renderBmv(item.a)}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Official links, disclaimer, and the date the rules were last checked */}
      <Section width="narrow">
        <h2 className="text-(length:--text-h3) font-semibold">
          {page.officialLinksHeading}
        </h2>
        <ul className="mt-5 space-y-3 text-sm sm:text-base">
          {linkKeys.map((key) => (
            <li key={key}>
              <ExternalLink
                href={bmv.links[key]}
                newTabLabel={copy.a11y.opensInNewTab}
                className="font-medium text-brand-700"
              >
                {renderBmv(page.linkLabels[key])}
              </ExternalLink>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-(--radius-card) border border-line bg-surface-sunken p-6">
          <p className="text-sm leading-relaxed text-ink-700">{page.disclaimer}</p>
          <p className="mt-3 text-sm font-medium text-ink-500">
            {interpolate(page.lastVerifiedLabel, {
              date: formatVerifiedDate(bmv.lastVerified),
            })}
          </p>
        </div>
      </Section>

      <JsonLd data={faqSchema(renderBmv)} />
    </>
  );
}
