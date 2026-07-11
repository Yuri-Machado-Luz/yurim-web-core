"use client";

import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Section,
} from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import { services, serviceStatusLabel } from "@/lib/data/services";
import { localizedPath } from "@/lib/locale-path";

export function ServicesPageContent() {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <>
      <Section as="header" spacing="none" className="pb-12 pt-16">
        <p className="eyebrow mb-2">{messages.services.eyebrow}</p>
        <h1 className="heading-page mb-4">{messages.services.pageTitle}</h1>
        <p className="lead max-w-2xl">{messages.services.pageLead}</p>
      </Section>

      <Section spacing="none" className="pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="h-full">
              <CardHeader>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <CardTitle className="text-lg font-semibold">
                    {service.title[locale]}
                  </CardTitle>
                  <Badge variant="secondary">
                    {serviceStatusLabel[service.status][locale]}
                  </Badge>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {service.description[locale]}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1" />
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={localizedPath(service.href, locale)}>
                    {service.cta[locale]}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
