import { Icon } from "@/components/ui/icon";
import { quickFacts } from "@/lib/data";
import type { IconName } from "@/lib/icons";
import { iconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function QuickFactsCard() {
  return (
    <div className="quick-facts-card">
      <ul className="quick-facts">
        {quickFacts.map((fact, i) => {
          const iconName = fact.icon as IconName;
          const hasIcon = iconName in iconMap;
          return (
            <li key={fact.text} className="quick-fact">
              {hasIcon ? (
                <Icon
                  name={iconName}
                  className={cn("size-3.5 shrink-0 text-primary")}
                />
              ) : (
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full bg-primary",
                    i === 0 && "animate-pulse",
                  )}
                  aria-hidden="true"
                />
              )}
              <span className={cn(i === 0 && "font-medium text-foreground")}>
                {fact.text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
