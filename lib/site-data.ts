/**
 * Read-side helpers that surface DB content to the public site. Every helper
 * resolves a bilingual JSON field to the active locale string. When a record
 * is missing it returns either an empty value or undefined, and the caller
 * either renders a placeholder or falls back to messages/{locale}.json.
 */
import { db } from "./db";

export type Locale = "ko" | "en";

interface BiJsonShape {
  ko?: string;
  en?: string;
}

export function pickLocale(value: unknown, locale: Locale): string {
  if (!value || typeof value !== "object") return "";
  const obj = value as BiJsonShape;
  return obj[locale] ?? obj.ko ?? obj.en ?? "";
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export interface SiteStat {
  key: string;
  value: string;
  label: string;
  displayOrder: number;
}

export async function getStats(locale: Locale): Promise<SiteStat[]> {
  const rows = await db.stat.findMany({ orderBy: { displayOrder: "asc" } });
  return rows.map((r) => ({
    key: r.key,
    value: r.value,
    label: pickLocale(r.label, locale),
    displayOrder: r.displayOrder,
  }));
}

export async function getStatByKey(
  key: string,
  locale: Locale,
): Promise<SiteStat | null> {
  const r = await db.stat.findUnique({ where: { key } });
  if (!r) return null;
  return {
    key: r.key,
    value: r.value,
    label: pickLocale(r.label, locale),
    displayOrder: r.displayOrder,
  };
}

// ─── Audience chart data ─────────────────────────────────────────────────────

export interface SiteAudienceItem {
  name: string;
  value: number;
}

export async function getAudienceData(
  locale: Locale,
): Promise<{ role: SiteAudienceItem[]; industry: SiteAudienceItem[] }> {
  const rows = await db.audienceData.findMany({
    orderBy: [{ chartType: "asc" }, { displayOrder: "asc" }],
  });
  const role = rows
    .filter((r) => r.chartType === "ROLE")
    .map((r) => ({ name: pickLocale(r.name, locale), value: r.value }));
  const industry = rows
    .filter((r) => r.chartType === "INDUSTRY")
    .map((r) => ({ name: pickLocale(r.name, locale), value: r.value }));
  return { role, industry };
}

// ─── Partners ────────────────────────────────────────────────────────────────

export interface SitePartner {
  id: string;
  name: string;
  logoPath: string;
  category:
    | "SEMICONDUCTOR"
    | "DISTRIBUTION"
    | "MEASUREMENT"
    | "EMBEDDED"
    | "EDUCATION";
  externalUrl: string | null;
  displayOrder: number;
}

export async function getPublishedPartners(
  limit?: number,
): Promise<SitePartner[]> {
  const rows = await db.partner.findMany({
    where: { isPublished: true },
    orderBy: [{ category: "asc" }, { displayOrder: "asc" }],
    take: limit,
  });
  return rows.map((p) => ({
    id: p.id,
    name: p.name,
    logoPath: p.logoPath,
    category: p.category,
    externalUrl: p.externalUrl,
    displayOrder: p.displayOrder,
  }));
}

// ─── Programs ────────────────────────────────────────────────────────────────

export interface SiteProgram {
  id: string;
  slug: string;
  title: string;
  tag: "CONFERENCE" | "CONTEST" | "EDUCATION";
  tagline: string;
  body: string;
  imagePath: string | null;
  externalUrl: string | null;
  eventDate: Date | null;
  displayOrder: number;
}

export async function getFeaturedPrograms(
  locale: Locale,
  limit?: number,
): Promise<SiteProgram[]> {
  const rows = await db.program.findMany({
    where: { isFeatured: true },
    orderBy: { displayOrder: "asc" },
    take: limit,
  });
  return rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: pickLocale(p.title, locale),
    tag: p.tag,
    tagline: pickLocale(p.tagline, locale),
    body: pickLocale(p.body, locale),
    imagePath: p.imagePath,
    externalUrl: p.externalUrl,
    eventDate: p.eventDate,
    displayOrder: p.displayOrder,
  }));
}

export async function getAllPrograms(locale: Locale): Promise<SiteProgram[]> {
  const rows = await db.program.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: pickLocale(p.title, locale),
    tag: p.tag,
    tagline: pickLocale(p.tagline, locale),
    body: pickLocale(p.body, locale),
    imagePath: p.imagePath,
    externalUrl: p.externalUrl,
    eventDate: p.eventDate,
    displayOrder: p.displayOrder,
  }));
}

// ─── Cases ───────────────────────────────────────────────────────────────────

export interface SiteCase {
  id: string;
  partnerName: string | null;
  type: string;
  title: string;
}

export async function getPublishedCases(
  locale: Locale,
): Promise<SiteCase[]> {
  const rows = await db.case.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: "asc" },
  });
  return rows.map((c) => ({
    id: c.id,
    partnerName: c.partnerName,
    type: pickLocale(c.type, locale),
    title: pickLocale(c.title, locale),
  }));
}

// ─── History ─────────────────────────────────────────────────────────────────

export interface SiteHistoryItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export async function getHistoryItems(
  locale: Locale,
): Promise<SiteHistoryItem[]> {
  const rows = await db.historyItem.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return rows.map((h) => ({
    id: h.id,
    year: h.year,
    title: pickLocale(h.title, locale),
    description: pickLocale(h.description, locale),
  }));
}

// ─── Contact info (singleton) ────────────────────────────────────────────────

export interface SiteContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export async function getContactInfo(
  locale: Locale,
): Promise<SiteContactInfo | null> {
  const r = await db.contactInfo.findUnique({ where: { id: 1 } });
  if (!r) return null;
  return {
    address: pickLocale(r.address, locale),
    phone: r.phone,
    email: r.email,
    hours: pickLocale(r.hours, locale),
  };
}

// ─── Footer platform links ───────────────────────────────────────────────────

export interface SiteFooterLink {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
}

export async function getFooterLinks(): Promise<SiteFooterLink[]> {
  const rows = await db.footerLink.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return rows.map((f) => ({
    id: f.id,
    label: f.label,
    url: f.url,
    isExternal: f.isExternal,
  }));
}

// ─── Active announcement (one at a time) ─────────────────────────────────────

export interface SiteAnnouncement {
  id: string;
  message: string;
  linkUrl: string | null;
}

export async function getActiveAnnouncement(
  locale: Locale,
): Promise<SiteAnnouncement | null> {
  const now = new Date();
  const row = await db.announcement.findFirst({
    where: {
      isActive: true,
      AND: [
        { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
        { OR: [{ endsAt: null }, { endsAt: { gte: now } }] },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
  if (!row) return null;
  return {
    id: row.id,
    message: pickLocale(row.message, locale),
    linkUrl: row.linkUrl,
  };
}

// ─── Current media kit (one at a time) ───────────────────────────────────────

export interface SiteMediaKit {
  filePath: string;
  version: string;
}

export async function getCurrentMediaKit(): Promise<SiteMediaKit | null> {
  const row = await db.mediaKit.findFirst({ where: { isCurrent: true } });
  if (!row) return null;
  return { filePath: row.filePath, version: row.version };
}
