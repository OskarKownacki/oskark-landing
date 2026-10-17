import Image from "next/image";
import { cn } from "@/lib/utils";
import { SkillLevel } from "@/components/SkillLevel";
import { SnapshotCard, type SnapshotCardData } from "@/components/SnapshotCard";
import { SocialIcon, socialName } from "@/components/SocialIcon";
import { buttonClassName } from "@/components/Button";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { buildMailto } from "@/lib/contact";
import { ScrollFire } from "@/components/ScrollFire";
import { DICTIONARY, type Lang } from "@/lib/i18n";

// Kształt zwracany przez LANDING_SECTIONS_QUERY (teksty już w wybranym języku); pola w Sanity są opcjonalne.
type SectionBase = { _key: string; title: string | null; heading: string | null };
export type LandingSection =
  | (SectionBase & { _type: "portfolioSection"; snapshots: SnapshotCardData[] })
  | (SectionBase & {
      _type: "aboutSection";
      text: string | null;
      image: { url: string; width: number; height: number } | null;
    })
  | (SectionBase & {
      _type: "skillsSection";
      skills: { _key: string; name: string | null; description: string | null; level: number | null }[] | null;
    })
  | (SectionBase & {
      _type: "socialSection";
      links: { _key: string; label: string | null; url: string | null }[] | null;
    });

// Finał strony używa tego samego maila i tekstu przycisku co hero — jedno źródło w Sanity.
export type ContactData = { email: string | null; ctaText: string };

const PROFILE_SIZES = "(max-width: 768px) 60vw, 420px";

// Spis sekcji pod hero — zapowiada, co jest niżej, i linkuje do kotwic sekcji.
export function SectionIndex({ sections, lang }: { sections: LandingSection[]; lang: Lang }) {
  const items = sections.filter((section) => section.title);
  if (items.length === 0) return null;
  return (
    <nav aria-label={DICTIONARY[lang].sectionIndexLabel} className="font-mono text-sm tracking-[var(--tracking-mono)] text-text-muted">
      <ol className="flex flex-wrap gap-x-c5 gap-y-c1">
        {items.map((section) => (
          <li key={section._key}>
            <a href={`#${section._key}`} className="text-text-secondary no-underline hover:text-accent">
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Etykieta mono to tylko drogowskaz (ze znacznikiem na szlaku); o sekcji mówi zdanie pod nią.
function Section({ section, children }: { section: LandingSection; children: React.ReactNode }) {
  // w „O mnie” nagłówek jest częścią kompozycji ze zdjęciem, więc nie powtarzamy go nad sekcją
  const heading = section._type === "aboutSection" ? null : section.heading;
  return (
    <section id={section._key} className="trail-section flex scroll-mt-c8 flex-col gap-c6 mx-(--content-inset)">
      {(section.title || heading) && (
        <header className="flex flex-col gap-c2">
          {section.title && (
            <p className="trail-marker w-fit font-mono text-sm uppercase tracking-[var(--tracking-label)] text-accent-alt">
              {section.title}
            </p>
          )}
          {heading && <h2 className="text-xl text-pretty max-w-(--measure-display)">{heading}</h2>}
        </header>
      )}
      {children}
    </section>
  );
}

function SectionBody({ section, contact, lang }: { section: LandingSection; contact: ContactData; lang: Lang }) {
  switch (section._type) {
    case "skillsSection":
      // Lista zamiast kart: usługi czyta się jak tekst, a ramki zostają dla rzeczy klikalnych (projekty).
      return (
        <ol className="flex flex-col">
          {section.skills?.map(({ _key, name, description, level }) => (
            <li
              key={_key}
              className="grid gap-c3 border-t border-border-subtle py-c5 last:border-b md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-c6"
            >
              <div className="flex flex-col gap-c2">
                <h3 className="text-lg leading-[var(--leading-snug)]">{name}</h3>
                {level && <SkillLevel level={level} lang={lang} className="max-w-(--measure-lead)" />}
              </div>
              <p className="text-text-secondary text-pretty max-w-(--measure-prose)">{description}</p>
            </li>
          ))}
        </ol>
      );
    case "portfolioSection":
      return (
        <div className="grid gap-c5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {section.snapshots.map((snapshot) => (
            <SnapshotCard key={snapshot._id} snapshot={snapshot} lang={lang} />
          ))}
        </div>
      );
    case "aboutSection":
      return (
        <div className="grid items-end gap-c6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* pełna sylwetka — żadnego object-cover, dół zdjęcia ma zostać;
              scale-x-[-1] odbija kadr lustrzanie, żeby patrzył w stronę tekstu.
              Maska wygasza dolne 28% kadru, więc sylwetka rozpuszcza się w tle */}
          {section.image && (
            <Image
              src={section.image.url}
              width={section.image.width}
              height={section.image.height}
              alt={section.heading ?? ""}
              sizes={PROFILE_SIZES}
              className="h-auto w-full max-w-[420px] scale-x-[-1] [mask-image:linear-gradient(to_top,transparent_0%,#000_28%)]"
            />
          )}
          <div className="flex flex-col gap-c5 md:pb-c8">
            {section.heading && <h2 className="text-xl leading-none italic lg:text-2xl">{section.heading}</h2>}
            {/* do lewej i w normalnej szerokości kolumny — justowanie w wąskiej kolumnie robi dziury między słowami */}
            <p className="text-md leading-[var(--leading-body)] text-text-secondary text-pretty max-w-(--measure-prose)">
              {section.text}
            </p>
          </div>
        </div>
      );
    case "socialSection":
      // Finał strony: to samo wezwanie co w hero + profile jako zwykłe linki z nazwą.
      return (
        <div className="flex flex-col gap-c6">
          {contact.email && (
            <div className="flex flex-wrap items-center gap-c3">
              <a href={buildMailto(contact.email, lang)} className={buttonClassName("primary")}>
                {contact.ctaText}
              </a>
              <CopyEmailButton email={contact.email} lang={lang} />
            </div>
          )}
          <ul className="flex flex-wrap gap-x-c6 gap-y-c3">
            {section.links?.map(({ _key, label, url }) => {
              if (!url) return null;
              return (
                <li key={_key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-c2 font-medium text-text-secondary no-underline hover:text-accent"
                  >
                    <SocialIcon url={url} />
                    {label ?? socialName(url)}
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
  }
}

export function LandingSections({
  sections,
  contact,
  lang,
  className,
}: {
  sections: LandingSection[];
  contact: ContactData;
  lang: Lang;
  className?: string;
}) {
  return (
    <div className={cn("trail flex flex-col gap-c12", className)}>
      <ScrollFire />
      {sections.map((section) => (
        <Section key={section._key} section={section}>
          <SectionBody section={section} contact={contact} lang={lang} />
        </Section>
      ))}
    </div>
  );
}
