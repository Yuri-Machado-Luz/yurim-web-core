import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import type { ContentMeta } from "@/lib/content";
import { cn } from "@/lib/utils";

export type PostCardLabels = {
  featured: string;
  readPost: string;
  format: string;
  status?: string;
};

type PostCardProps = {
  post: ContentMeta;
  labels: PostCardLabels;
  className?: string;
};

export function PostCard({ post, labels, className }: PostCardProps) {
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
        {post.featured && <Badge>{labels.featured}</Badge>}
        <Badge variant="outline">{labels.format}</Badge>
        {labels.status ? (
          <Badge variant="secondary">{labels.status}</Badge>
        ) : null}
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
              className={buttonVariants({
                variant: "default",
                size: "sm",
                className: "mt-4",
              })}
            >
              {labels.readPost}
            </Link>
          </CardAction>
        )}
      </CardContent>
    </Card>
  );

  if (!post.featured) {
    return (
      <li className={cn("col-span-1", className, "select-none")}>
        <Link href={post.href} className="block">
          {cardContent}
        </Link>
      </li>
    );
  }

  return (
    <li className={cn("col-span-2", className, "select-none")}>
      {cardContent}
    </li>
  );
}
