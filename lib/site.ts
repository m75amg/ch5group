/**
 * Site-wide constants. SITE_URL is read from NEXT_PUBLIC_SITE_URL at runtime
 * so the production domain can be swapped without code changes.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://channel5korea.com"
).replace(/\/$/, "");

export const SITE_NAME_KO = "채널5코리아";
export const SITE_NAME_EN = "Channel5 Korea";
export const SITE_LEGAL_NAME_KO = "주식회사 채널5코리아";
export const SITE_LEGAL_NAME_EN = "Channel5 Korea, Inc.";
