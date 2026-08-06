import { Badge } from "@/components/raw";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/raw/card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/raw/button";
import { STATUS_KEY_MAP, type Status } from "@/i18n/types";
import type { ContentMeta } from "@/lib/content";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

type PostCardProps = {
  post: ContentMeta;
  className?: string;
};

export async function PostCard({ post, className }: PostCardProps) {
  const shared = await getTranslations("shared");

  // Conteúdo comum do card
  const cardContent = (
    <Card
      data-size={post.featured ? "lg" : "sm"}
      className={cn(
        "h-full border transition-transform duration-300",
        post.featured
          ? "border-primary/50 bg-muted hover:scale-[1.02]"
          : "border-border min-h-50 opacity-80 hover:scale-[1.04] md:min-h-45",
      )}
    >
      <CardHeader className="flex flex-wrap items-center gap-2">
        {post.featured && <Badge>{shared("actions.featured")}</Badge>}
        <Badge variant="outline">{shared(`formats.${post.format}`)}</Badge>
        {post.status && (
          <Badge variant="secondary">
            {shared(`status.${STATUS_KEY_MAP[post.status as Status]}`)}
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        <CardTitle>
          <h2
            className={cn("font-medium", post.featured ? "text-lg" : "text-md")}
          >
            {post.title}
            <span>
              {post.pubDate && (
                <time
                  className="text-muted-foreground/60 pl-2 text-xs"
                  dateTime={post.pubDate}
                >
                  ({post.pubDate})
                </time>
              )}
            </span>
          </h2>
        </CardTitle>

        {post.description && (
          <CardDescription className="text-muted-foreground mt-1 line-clamp-3 text-sm text-balance md:line-clamp-none">
            {post.description}
          </CardDescription>
        )}
        {post.featured && (
          <CardAction>
            <Link
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "default",
                size: "sm",
                className: "mt-4",
              })}
            >
              Ver post
            </Link>
          </CardAction>
        )}
      </CardContent>
    </Card>
  );

  // Se NÃO for destaque → card inteiro clicável
  if (!post.featured) {
    return (
      <li className={cn("col-span-1", className, "select-none")}>
        <Link href={post.href} className="block">
          {cardContent}
        </Link>
      </li>
    );
  }

  // Se for destaque → card NÃO é clicável, apenas o botão
  return (
    <li className={cn("col-span-2", className, "select-none")}>
      {cardContent}
    </li>
  );
}
