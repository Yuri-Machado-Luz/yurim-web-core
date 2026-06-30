'use client';

import Link from 'next/link';
import CONFIG from '@/lib/config';
import { EnvelopeIcon, GithubAltIcon, LinkedinIcon } from '@/components/icons/social';

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
              <EnvelopeIcon className="h-5 w-5" />
            </Link>
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <GithubAltIcon className="h-5 w-5" />
            </Link>
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
