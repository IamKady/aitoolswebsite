import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ToolCardData } from "@/types";

interface CompareState {
  comparedTools: ToolCardData[];
  addTool: (tool: ToolCardData) => boolean;
  removeTool: (toolId: string) => void;
  clearTools: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      comparedTools: [],
      addTool: (tool) => {
        const current = get().comparedTools;
        if (current.length >= 3) return false;
        if (current.find((t) => t.id === tool.id)) return true;
        set({ comparedTools: [...current, tool] });
        return true;
      },
      removeTool: (toolId) => {
        set({ comparedTools: get().comparedTools.filter((t) => t.id !== toolId) });
      },
      clearTools: () => {
        set({ comparedTools: [] });
      },
    }),
    {
      name: "compare-storage",
    }
  )
);
