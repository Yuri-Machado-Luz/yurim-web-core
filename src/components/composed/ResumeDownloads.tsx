import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RESUME_BASE = "/downloads/curriculo-yuri-machado";

const FORMATS = [
  { ext: "pdf", label: "PDF" },
  { ext: "docx", label: "DOCX" },
  { ext: "json", label: "JSON" },
] as const;

export type ResumeDownloadsLabels = {
  navLabel: string;
  pdf: string;
  docx: string;
  json: string;
};

type ResumeDownloadsProps = {
  labels: ResumeDownloadsLabels;
  className?: string;
  size?: "sm" | "default";
};

export function ResumeDownloads({
  labels,
  className,
  size = "sm",
}: ResumeDownloadsProps) {
  const ariaByExt = {
    pdf: labels.pdf,
    docx: labels.docx,
    json: labels.json,
  } as const;

  return (
    <nav
      className={cn("flex flex-wrap gap-3", className)}
      aria-label={labels.navLabel}
    >
      {FORMATS.map(({ ext, label }) => (
        <Button key={ext} asChild variant="outline" size={size}>
          <a
            href={`${RESUME_BASE}.${ext}`}
            download
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaByExt[ext]}
          >
            <Download className="size-3.5" />
            {label}
          </a>
        </Button>
      ))}
    </nav>
  );
}
