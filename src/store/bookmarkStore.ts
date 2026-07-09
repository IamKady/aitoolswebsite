import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ToolCardData } from "@/types";

interface BookmarkState {
  bookmarkedTools: ToolCardData[];
  addBookmark: (tool: ToolCardData) => void;
  removeBookmark: (toolId: string) => void;
  hasBookmark: (toolId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarkedTools: [],
      addBookmark: (tool) => {
        const current = get().bookmarkedTools;
        if (current.find((t) => t.id === tool.id)) return;
        set({ bookmarkedTools: [...current, tool] });
      },
      removeBookmark: (toolId) => {
        set({ bookmarkedTools: get().bookmarkedTools.filter((t) => t.id !== toolId) });
      },
      hasBookmark: (toolId) => {
        return !!get().bookmarkedTools.find((t) => t.id === toolId);
      },
    }),
    {
      name: "bookmark-storage",
    }
  )
);
