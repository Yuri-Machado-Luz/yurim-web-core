"use client";

import { Section } from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import { portfolioChangelog } from "@/lib/data/changelog";

export function ChangelogPageContent() {
  const messages = useMessages();
  const locale = useLocale();
  const t = messages.changelog;

  return (
    <>
      <Section as="header" spacing="none" className="pb-12 pt-16">
        <p className="eyebrow mb-2">{t.eyebrow}</p>
        <h1 className="heading-page mb-4">{t.pageTitle}</h1>
        <p className="lead max-w-2xl">{t.pageLead}</p>
      </Section>

      <Section spacing="none" className="pb-20">
        <ol className="mx-auto max-w-3xl space-y-12">
          {portfolioChangelog.map((entry) => (
            <li
              key={entry.version}
              className="border-b border-border pb-12 last:border-b-0 last:pb-0"
            >
              <header className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-heading text-2xl font-semibold tracking-tight">
                  v{entry.version}
                </h2>
                <time className="text-sm text-muted-foreground">
                  {entry.date}
                </time>
              </header>
              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                {entry.summary[locale]}
              </p>

              {entry.added && entry.added[locale].length > 0 && (
                <ChangeGroup label={t.added} items={entry.added[locale]} />
              )}
              {entry.changed && entry.changed[locale].length > 0 && (
                <ChangeGroup label={t.changed} items={entry.changed[locale]} />
              )}
              {entry.removed && entry.removed[locale].length > 0 && (
                <ChangeGroup label={t.removed} items={entry.removed[locale]} />
              )}
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}

function ChangeGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mb-4 last:mb-0">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </h3>
      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
