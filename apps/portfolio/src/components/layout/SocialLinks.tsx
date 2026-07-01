import type { ImageProps } from "next/image";

import { ICON } from "@/assets";
import { IconLink } from "@/components/ui/icon-link";
import CONFIG from "@/lib/config";
import { cn } from "@/lib/utils";

type Channel = "github" | "linkedin" | "email" | "whatsapp";

const { github, linkedin, email, whatsapp } = CONFIG.meta.social;

const whatsappMessage = encodeURIComponent(
  "Olá! Vim através do seu portfólio e gostaria de conversar.",
);

const CHANNELS: Record<
  Channel,
  { href: string; icon: ImageProps["src"]; label: string }
> = {
  github: { href: github, icon: ICON.github, label: "GitHub" },
  linkedin: { href: linkedin, icon: ICON.linkedin, label: "LinkedIn" },
  email: { href: `mailto:${email}`, icon: ICON.envelope, label: "Email" },
  whatsapp: {
    href: `https://wa.me/${whatsapp}?text=${whatsappMessage}`,
    icon: ICON.whatsapp,
    label: "WhatsApp",
  },
};

type SocialLinksProps = {
  channels?: Channel[];
  variant?: "bare" | "boxed";
  size?: "sm" | "md";
  className?: string;
};

export function SocialLinks({
  channels = ["github", "linkedin", "email"],
  variant,
  size,
  className,
}: SocialLinksProps) {
  return (
    <nav
      aria-label="Redes sociais"
      className={cn("flex items-center gap-4", className)}
    >
      {channels.map((channel) => {
        const { href, icon, label } = CHANNELS[channel];
        return (
          <IconLink
            key={channel}
            href={href}
            icon={icon}
            label={label}
            variant={variant}
            size={size}
          />
        );
      })}
    </nav>
  );
}
