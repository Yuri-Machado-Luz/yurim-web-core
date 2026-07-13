import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

import type { IconName } from "./types";

export type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number | string;
  title?: string;
};

export function Icon({
  name,
  size = 24,
  className,
  title,
  ...props
}: IconProps) {
  const labelled = Boolean(title);

  return (
    <svg
      width={size}
      height={size}
      className={cn("inline-block shrink-0 fill-current", className)}
      aria-hidden={labelled ? undefined : true}
      role={labelled ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
