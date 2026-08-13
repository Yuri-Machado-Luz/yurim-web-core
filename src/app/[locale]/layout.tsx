import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { PageShell } from "@/components/composed/PageShell";
import { SiteCursor } from "@/components/composed/SiteCursor";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { rootMetadata } from "@/meta";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return rootMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const clientMessages = { shared: messages.shared };

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <SiteCursor />
      <PageShell>{children}</PageShell>
      <Toaster theme="dark" />
    </NextIntlClientProvider>
  );
}
