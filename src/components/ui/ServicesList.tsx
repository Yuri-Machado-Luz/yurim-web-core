// components/ServicesList.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/raw/card";
import { ServiceModal } from "./ServiceModal";

type Service = {
  slug: string;
  title: string;
  body: string;
  specs: string[];
};

type ServicesListProps = {
  items: Service[];
};

export function ServicesList({ items }: ServicesListProps) {
  const [selected, setSelected] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);

  const handleCardClick = (service: Service) => {
    setSelected(service);
    setOpen(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Opcional: limpar seleção ao fechar
      setSelected(null);
    }
  };

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
                onClick={() => handleCardClick(item)}
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
        open={open}
        onOpenChange={handleOpenChange}
      />
    </>
  );
}
