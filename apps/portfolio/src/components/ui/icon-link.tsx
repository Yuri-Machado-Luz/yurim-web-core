import { cva, type VariantProps } from "class-variance-authority";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const iconLinkVariants = cva(
  "inline-flex items-center justify-center transition-opacity",
  {
    variants: {
      variant: {
        bare: "hover:opacity-70",
        boxed:
          "rounded-lg border border-border p-3 transition-colors hover:bg-secondary",
      },
    },
    defaultVariants: {
      variant: "bare",
    },
  },
);

const iconSize = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
} as const;

type IconLinkProps = VariantProps<typeof iconLinkVariants> & {
  href: string;
  label: string;
  icon: ImageProps["src"];
  external?: boolean;
  size?: keyof typeof iconSize;
  className?: string;
};

export function IconLink({
  href,
  label,
  icon,
  external,
  variant,
  size = "md",
  className,
}: IconLinkProps) {
  const isExternal = external ?? href.startsWith("http");

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(iconLinkVariants({ variant, className }))}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <Image src={icon} alt={label} className={cn(iconSize[size], "dark:invert")} />
    </Link>
  );
}
