"use client";

import { useEffect } from "react";

function isFormField(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;

  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true']"),
  );
}

export function CopyProtection() {
  useEffect(() => {
    const preventClipboard = (event: ClipboardEvent) => {
      if (isFormField(event.target)) return;
      event.preventDefault();
    };

    document.addEventListener("copy", preventClipboard);
    document.addEventListener("cut", preventClipboard);

    return () => {
      document.removeEventListener("copy", preventClipboard);
      document.removeEventListener("cut", preventClipboard);
    };
  }, []);

  return null;
}
