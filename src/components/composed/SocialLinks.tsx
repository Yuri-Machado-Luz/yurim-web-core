import { Button } from "@/components/ui/button";
import { Icon } from "@/components/composed/Icons";
import { SITE } from "@/meta";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  showEmail?: boolean;
  size?: "sm" | "4xl";
  className?: string;
  showLabels?: boolean;
};

export function SocialLinks({
  showEmail = false,
  size = "4xl",
  className,
  showLabels = false,
}: SocialLinksProps) {
  return (
    <nav className={cn("flex flex-wrap gap-3", className)}>
      <Button asChild variant="outline" size={size} className="px-5">
        <a
          href={SITE.social.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Icon name="github" className="h-6 w-6" />
          {showLabels ? " GitHub" : null}
        </a>
      </Button>
      <Button asChild variant="outline" size={size} className="px-5">
        <a
          href={SITE.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Icon name="linkedin" className="h-6 w-6" />
          {showLabels ? " LinkedIn" : null}
        </a>
      </Button>
      {showEmail ? (
        <Button asChild variant="outline" size={size} className="px-5">
          <a href={`mailto:${SITE.social.email}`} aria-label="E-mail">
            <Icon name="gmail" className="h-6 w-6" />
            {showLabels ? " Gmail" : null}
          </a>
        </Button>
      ) : null}
    </nav>
  );
}
