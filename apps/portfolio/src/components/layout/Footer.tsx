"use client";

import { ICON } from "@/assets";
import CONFIG from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { email, github, linkedin } = CONFIG.meta.social;

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Yuri Machado Luz. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href={`mailto:${email}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Image
                src={ICON.envelope}
                alt="Email Icon"
                width={20}
                height={20}
              />
            </Link>
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Image
                src={ICON.github}
                alt="GitHub Icon"
                width={20}
                height={20}
              />
            </Link>
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Image
                src={ICON.linkedin}
                alt="LinkedIn Icon"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
