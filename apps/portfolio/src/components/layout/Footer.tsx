"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Section, SocialLinks } from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import { localizedPath, stripLocalePrefix } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const locale = useLocale();
  const messages = useMessages();
  const isContatoPage = stripLocalePrefix(pathname) === "/contato";

  return (
    <footer className="border-t border-border bg-background py-6 md:py-8">
      <Section as="div" spacing="none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Yuri Machado Luz. {messages.footer.rights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href={localizedPath("/changelog", locale)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {messages.footer.changelog}
            </Link>
            <SocialLinks className={cn(isContatoPage && "hidden")} />
          </div>
        </div>
      </Section>
    </footer>
  );
}
