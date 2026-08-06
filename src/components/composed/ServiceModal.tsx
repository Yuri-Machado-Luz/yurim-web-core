"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import { Link } from "@/i18n/navigation";

type Service = {
  slug: string;
  title: string;
  body: string;
  specs: string[];
};

type ServiceModalProps = {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  specsHeading: string;
  ctaLabel: string;
};

export function ServiceModal({
  service,
  open,
  onOpenChange,
  specsHeading,
  ctaLabel,
}: ServiceModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{service?.title}</DialogTitle>
          <DialogDescription className="text-base">
            {service?.body}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <h4 className="text-foreground text-sm font-medium">{specsHeading}</h4>
          <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm">
            {service?.specs.map((spec, i) => (
              <li key={i}>{spec}</li>
            ))}
          </ul>
        </div>

        <DialogFooter className="mt-6 sm:justify-start">
          <Button asChild>
            <Link href="/contato">{ctaLabel}</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
