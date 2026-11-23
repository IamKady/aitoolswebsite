const configuredSiteUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

export const SITE_URL = new URL(
  configuredSiteUrl || "https://toolwire.ai"
).origin;
