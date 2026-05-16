import { getLocale } from "next-intl/server";

import { Container } from "@/components/shared/Container";
import { getActiveAnnouncement, type Locale } from "@/lib/site-data";

export async function AnnouncementBanner() {
  const locale = (await getLocale()) as Locale;
  const announcement = await getActiveAnnouncement(locale);
  if (!announcement) return null;

  const inner = (
    <p className="text-body-sm leading-snug">{announcement.message}</p>
  );

  return (
    <aside
      role="status"
      className="bg-brand-accent text-brand-accent-foreground"
    >
      <Container className="py-2 flex items-center justify-center text-center">
        {announcement.linkUrl ? (
          <a
            href={announcement.linkUrl}
            target={
              announcement.linkUrl.startsWith("http") ? "_blank" : undefined
            }
            rel={
              announcement.linkUrl.startsWith("http")
                ? "noreferrer noopener"
                : undefined
            }
            className="hover:underline"
          >
            {inner}
          </a>
        ) : (
          inner
        )}
      </Container>
    </aside>
  );
}
