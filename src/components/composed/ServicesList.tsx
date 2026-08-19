"use client";

import { ExternalLink } from "lucide-react";
import { useState } from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ServiceModal } from "./ServiceModal";

type Service = {
  slug: string;
  title: string;
  body: string;
  specs: string[];
};

type ServicesListProps = {
  items: Service[];
  specsHeading: string;
  ctaLabel: string;
};

export function ServicesList({
  items,
  specsHeading,
  ctaLabel,
}: ServicesListProps) {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <>
      <ul className="mt-5 grid grid-cols-2 gap-4">
        {items.map((item, index) => {
          const isLastAndOdd =
            index === items.length - 1 && items.length % 2 !== 0;
          return (
            <li key={item.slug} className={isLastAndOdd ? "col-span-2" : ""}>
              <Card
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                className="border-border/60 flex h-full cursor-pointer flex-col gap-2 select-none"
                onClick={() => setSelected(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(item);
                  }
                }}
              >
                <CardHeader className="flex flex-row items-start justify-between gap-3">
                  <h2 className="text-foreground group-hover/card:text-primary font-sans text-xl font-semibold transition-colors duration-300">
                    {item.title}
                  </h2>
                  <ExternalLink
                    aria-hidden
                    className="text-muted-foreground group-hover/card:text-primary mt-1 size-4 shrink-0 transition-colors duration-300"
                  />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
      <ServiceModal
        service={selected}
        open={selected !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelected(null);
        }}
        specsHeading={specsHeading}
        ctaLabel={ctaLabel}
      />
    </>
  );
}
