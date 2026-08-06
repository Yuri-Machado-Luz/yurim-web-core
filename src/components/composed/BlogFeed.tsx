"use client";

import { PostCard, type PostCardLabels } from "@/components/composed/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Format } from "@/i18n/types";
import type { ContentMeta } from "@/lib/content";

type FormatTab = {
  value: "all" | Format;
  label: string;
};

type BlogFeedItem = {
  post: ContentMeta;
  labels: PostCardLabels;
};

type BlogFeedProps = {
  items: BlogFeedItem[];
  emptyLabel: string;
  tabs: FormatTab[];
};

export function BlogFeed({ items, emptyLabel, tabs }: BlogFeedProps) {
  function renderList(filtered: BlogFeedItem[]) {
    if (filtered.length === 0) {
      return <p className="text-muted-foreground mt-4">{emptyLabel}</p>;
    }
    return (
      <ul className="mt-4 grid grid-cols-2 gap-4">
        {filtered.map(({ post, labels }) => (
          <PostCard key={post.slug} post={post} labels={labels} />
        ))}
      </ul>
    );
  }

  return (
    <Tabs defaultValue="all" className="mt-2">
      <TabsList variant="line" className="flex w-full flex-wrap justify-start">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {renderList(
            tab.value === "all"
              ? items
              : items.filter(({ post }) => post.format === tab.value),
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
