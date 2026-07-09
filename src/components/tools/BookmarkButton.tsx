"use client";

import { Bookmark } from "lucide-react";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { ToolCardData } from "@/types";
import { useState, useEffect } from "react";

interface BookmarkButtonProps {
  tool: ToolCardData;
}

export function BookmarkButton({ tool }: BookmarkButtonProps) {
  const { addBookmark, removeBookmark, hasBookmark } = useBookmarkStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border text-muted-foreground text-sm opacity-60">
        <Bookmark className="w-4 h-4" />
        Save
      </button>
    );
  }

  const isSaved = hasBookmark(tool.id);

  const toggleBookmark = () => {
    if (isSaved) {
      removeBookmark(tool.id);
    } else {
      addBookmark(tool);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-sm transition-all duration-200 ${
        isSaved
          ? "border-primary/50 bg-primary/10 text-primary font-semibold shadow-sm"
          : "border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-accent"
      }`}
    >
      <Bookmark className={`w-4 h-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}
