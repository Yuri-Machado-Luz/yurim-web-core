import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 inline-flex shrink-0 items-center rounded-md outline-none transition-colors duration-300 focus-visible:ring-3",
        className,
      )}
      aria-label="Yuri Machado Luz"
    >
      <svg
        className="h-8 w-auto overflow-visible sm:h-9"
        viewBox="-8 -8 484 242"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M348.764 222V91.4645M348.764 91.4645L442.573 4.00005V91.4645V222M348.764 91.4645L254.954 4.00005V163.95C254.954 222 208.05 222 208.05 222L157.896 222M157.896 222L4.00016 222V179.19M157.896 222L157.896 125.735M464 146.796H350.808M327.337 146.796H348.764M157.896 125.735V4M157.896 125.735L80.7951 125.735C4.00012 125.735 4.00012 95.3011 4.00012 64.8674V4.00005"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
