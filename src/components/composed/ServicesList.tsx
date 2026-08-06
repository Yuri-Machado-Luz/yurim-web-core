"use client";

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
                className="border-border/60 flex h-full cursor-pointer flex-col gap-2 transition-transform select-none hover:scale-[1.02]"
                onClick={() => setSelected(item)}
              >
                <CardHeader>
                  <h2 className="text-foreground font-sans text-xl font-semibold">
                    {item.title}
                  </h2>
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
