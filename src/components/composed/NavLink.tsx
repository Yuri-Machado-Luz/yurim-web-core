"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  isContact?: boolean;
};

type NavLinkProps = {
  item: NavItem;
  onClick?: () => void;
  className?: string;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({ item, onClick, className }: NavLinkProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, item.href);

  if (item.isContact) {
    return (
      <Link
        href={item.href}
        className={buttonVariants({
          variant: "nav",
          size: "sm",
          className: cn("min-w-24", className),
        })}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "relative inline-flex h-8 items-center text-sm font-medium leading-none",
        "outline-none transition-colors duration-300 ease-out",
        "focus-visible:ring-ring/40 rounded-sm focus-visible:ring-3",
        "after:bg-primary after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:origin-left after:rounded-full after:transition-transform after:duration-300 after:ease-out",
        "motion-reduce:after:transition-none",
        active
          ? "text-foreground after:scale-x-100"
          : "text-muted-foreground after:scale-x-0 hover:text-foreground hover:after:scale-x-100",
        className,
      )}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {item.label}
    </Link>
  );
}
