import type { SVGProps } from "react";

import { type IconName,iconRegistry } from "@/assets/icons/registry";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, className, ...props }: IconProps) {
  const Svg = iconRegistry[name] ?? iconRegistry.code;

  if (!iconRegistry[name] && process.env.NODE_ENV === "development") {
    console.warn(`[Icon] Unknown icon "${name}": falling back to "code".`);
  }

  return (
    <Svg
      className={cn("inline-block size-[1em] shrink-0", className)}
      aria-hidden={props["aria-hidden"] ?? true}
      {...props}
    />
  );
}

export type { IconName };
