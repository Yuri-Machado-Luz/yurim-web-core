"use client";

import { usePathname } from "next/navigation";

import { Section, SocialLinks } from "@/components";
import { useMessages } from "@/components/locale-provider";
import { stripLocalePrefix } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const messages = useMessages();
  const isContatoPage = stripLocalePrefix(pathname) === "/contato";

  return (
    <footer className="border-t border-border bg-background py-6 md:py-8">
      <Section as="div" spacing="none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Yuri Machado Luz. {messages.footer.rights}
          </p>
          <SocialLinks className={cn(isContatoPage && "hidden")} />
        </div>
      </Section>
    </footer>
  );
}
