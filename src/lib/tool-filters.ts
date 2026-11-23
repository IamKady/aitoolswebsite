export const TOOL_PRICING_OPTIONS = [
  { label: "Any price", value: "all" },
  { label: "Free", value: "FREE" },
  { label: "Freemium", value: "FREEMIUM" },
  { label: "Paid", value: "PAID" },
  { label: "Open source", value: "OPEN_SOURCE" },
] as const;

export type ToolPricingFilter =
  (typeof TOOL_PRICING_OPTIONS)[number]["value"];
