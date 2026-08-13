import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import type { ContentMeta } from "@/lib/content";
import { cn } from "@/lib/utils";

export type PostCardLabels = {
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
  const card = (
    <Card
      data-size={post.featured ? "lg" : "sm"}
      className={cn(
        "h-full gap-0",
        post.featured
          ? "border-primary/45 bg-muted/70"
          : "min-h-44 opacity-95 md:min-h-48",
        className,
      )}
    >
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 pb-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{labels.format}</Badge>
          {labels.status ? (
            <Badge variant="secondary">{labels.status}</Badge>
          ) : null}
        </div>
        {post.pubDate ? (
          <time
            className="text-muted-foreground text-xs tabular-nums"
            dateTime={post.pubDate}
          >
            {post.pubDate}
          </time>
        ) : null}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 pt-4">
        <CardTitle>
          <h2
            className={cn(
              "font-heading leading-snug font-semibold tracking-tight",
              post.featured ? "text-xl md:text-2xl" : "text-base md:text-lg",
            )}
          >
            {post.title}
          </h2>
        </CardTitle>

        {post.description ? (
          <CardDescription
            className={cn(
              "text-muted-foreground text-sm leading-relaxed text-pretty",
              post.featured ? "line-clamp-4 md:line-clamp-5" : "line-clamp-3",
            )}
          >
            {post.description}
          </CardDescription>
        ) : null}
      </CardContent>

      {post.featured ? (
        <CardFooter className="pt-2">
          <Link
            href={post.href}
            className={buttonVariants({
              variant: "default",
              size: "sm",
            })}
          >
            {labels.readPost}
          </Link>
        </CardFooter>
      ) : null}
    </Card>
  );

  if (!post.featured) {
    return (
      <Link href={post.href} className="block h-full select-none">
        {card}
      </Link>
    );
  }

  return <div className="h-full select-none">{card}</div>;
}
