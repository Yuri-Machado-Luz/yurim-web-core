"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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

  const linkClasses = cn(
    "relative text-sm font-medium transition-colors",
    "hover:text-foreground underline-offset-4",
    active
      ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
      : "text-muted-foreground hover:underline",
    className,
  );

  const buttonClasses = buttonVariants({
    variant: active ? "secondary" : "default",
    size: "sm",
    className,
  });

  return (
    <Link
      href={item.href}
      className={item.isContact ? buttonClasses : linkClasses}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {item.label}
    </Link>
  );
}
