import Image from "next/image";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { DICTIONARY, type Lang } from "@/lib/i18n";

const SCREENSHOT_SIZES = "(max-width: 768px) 100vw, 400px";

// Kształt zwracany przez SNAPSHOT_CARDS_QUERY; pola w Sanity są opcjonalne.
export type SnapshotCardData = {
  _id: string;
  title: string | null;
  eyebrow: string | null;
  status: string | null;
  body: string | null;
  repoURL: string | null;
  tags: string[] | null;
  screenshotUrl: string | null;
};

export function SnapshotCard({ snapshot, lang }: { snapshot: SnapshotCardData; lang: Lang }) {
  const { title, eyebrow, status, body, repoURL, tags, screenshotUrl } = snapshot;
  const t = DICTIONARY[lang];

  return (
    <div className="flex flex-col gap-c2">
      {status && <Chip className="w-fit">{status}</Chip>}
      <Card
        media={
          screenshotUrl && (
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border-base">
              <Image
                src={screenshotUrl}
                alt={t.screenshotAlt(title)}
                fill
                sizes={SCREENSHOT_SIZES}
                className="object-cover object-top"
              />
            </div>
          )
        }
        eyebrow={eyebrow ?? ""}
        title={title ?? ""}
        description={body ?? ""}
        tags={tags ?? []}
        href={repoURL ?? "#"}
        linkLabel={t.repoLink}
      />
    </div>
  );
}
