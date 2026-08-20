"use client";

import { useState } from "react";

import { StaggerItem } from "@/components/composed/motion";
import { Button, Tabs, TabsList, TabsTrigger } from "@/components/ui";

import { PostCard, type PostCardLabels } from "./PostCard";
import type { Format } from "@/i18n/types";
import type { ContentMeta } from "@/lib/content";
import { cn } from "@/lib/utils";

type FormatTab = {
  value: Format;
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
  viewAllLabel: string;
  filterLabel: string;
};

type Filter = "all" | Format;

export function BlogFeed({
  items,
  emptyLabel,
  tabs,
  viewAllLabel,
  filterLabel,
}: BlogFeedProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered =
    filter === "all"
      ? items
      : items.filter(({ post }) => post.format === filter);

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {filter !== "all" ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="order-2 shrink-0 self-start sm:order-1"
            onClick={() => setFilter("all")}
          >
            {viewAllLabel}
          </Button>
        ) : (
          <span className="hidden sm:block sm:min-w-0 sm:flex-1" aria-hidden />
        )}

        <div className="order-1 flex w-fit max-w-full flex-wrap items-center gap-1 sm:order-2 sm:ml-auto">
          <span className="text-muted-foreground shrink-0 text-sm font-medium">
            {filterLabel}
          </span>
          <Tabs
            className="w-auto min-w-0"
            value={filter === "all" ? "__none__" : filter}
            onValueChange={(value) => {
              if (value === "__none__") return;
              setFilter(value as Format);
            }}
          >
            <TabsList
              variant="line"
              className="flex w-auto flex-wrap justify-start"
            >
              {/* Hidden sentinel so no format tab appears selected on "all" */}
              <TabsTrigger value="__none__" className="sr-only" tabIndex={-1}>
                all
              </TabsTrigger>
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    filter === "all" && "data-[state=active]:shadow-none",
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">{emptyLabel}</p>
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {filtered.map(({ post, labels }, index) => (
            <StaggerItem
              key={`${filter}-${post.slug}`}
              index={index}
              className={
                post.featured
                  ? "col-span-1 h-full sm:col-span-2"
                  : "col-span-1 h-full"
              }
            >
              <PostCard post={post} labels={labels} />
            </StaggerItem>
          ))}
        </ul>
      )}
    </div>
  );
}
