import Link from "next/link";

import { ICON } from "@/assets";
import { Button, Icon } from "@/components";
import CONFIG from "@/lib/config";
import { pt } from "@/lib/i18n";

import { QuickFactsCard } from "./QuickFactsCard";

export function AboutHeader() {
  const { email, github, linkedin } = CONFIG.meta.social;

  return (
    <header className="pb-16 pt-24">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-4">
          <h1 className="heading-page">{CONFIG.meta.author}</h1>
          <p className="lead max-w-2xl">{pt.about.lead}</p>
          <nav className="mt-2 flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href={github} target="_blank" rel="noopener noreferrer">
                <Icon name={ICON.github} className="size-3.5" />
                GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                <Icon name={ICON.linkedin} className="size-3.5" />
                LinkedIn
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`mailto:${email}`}>
                <Icon name={ICON.envelope} className="size-3.5" />
                Gmail
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href="/downloads/curriculo-yuri-machado.pdf"
                target="_blank"
                aria-label="Baixar currículo em PDF"
              >
                <Icon name="download" className="size-3.5" />
                PDF
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href="/downloads/curriculo-yuri-machado.docx"
                target="_blank"
                aria-label="Baixar currículo em DOCX"
              >
                <Icon name="download" className="size-3.5" />
                DOCX
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href="/downloads/curriculo-yuri-machado.json"
                target="_blank"
                aria-label="Baixar currículo em JSON"
              >
                <Icon name="download" className="size-3.5" />
                JSON
              </Link>
            </Button>
          </nav>
        </div>
        <QuickFactsCard />
      </div>
    </header>
  );
}
