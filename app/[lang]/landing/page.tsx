import { notFound } from "next/navigation";
import { MountainScene } from "@/components/MountainScene";
import { sanityFetch } from "@/lib/sanity/live";
import { HERO_QUERY, LANDING_SECTIONS_QUERY } from "@/lib/sanity/queries";
import { LandingSections, SectionIndex, type LandingSection } from "@/components/LandingSections";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { buttonClassName } from "@/components/Button";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { buildMailto } from "@/lib/contact";
import { isLang, type Lang } from "@/lib/i18n";

const PAGE_PATH = "/landing";

type HeroData = { title: string; subtitle: string; ctaText: string; email: string | null };

export async function getHeroData(lang: Lang): Promise<HeroData> {
  const { data } = await sanityFetch({ query: HERO_QUERY, params: { lang } });
  return data as HeroData;
}

export default async function LandingPage({ params }: PageProps<"/[lang]/landing">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const [data, { data: sections }] = await Promise.all([
    getHeroData(lang),
    sanityFetch({ query: LANDING_SECTIONS_QUERY, params: { lang } }) as Promise<{ data: LandingSection[] | null }>,
  ]);
  const landingSections = sections ?? [];
  return (
    <div className="relative flex flex-col">
      <MountainScene lang={lang} />
      <div className="hero">
        <header className="flex mt-[30vh] mx-(--content-inset)">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl lg:text-3xl italic">{data.title}</h1>
            <h2 className="font-body text-lg text-text-secondary leading-snug max-w-(--measure-lead)">
              {data.subtitle}
            </h2>
            {/* Kontakt to sam hero: CTA otwiera maila z gotowym szkieletem,
                a obok widać adres na wypadek braku klienta poczty */}
            {data.email && (
              <div className="mt-4 flex flex-wrap items-center gap-c3">
                <a href={buildMailto(data.email, lang)} className={buttonClassName("primary")}>
                  {data.ctaText}
                </a>
                <CopyEmailButton email={data.email} lang={lang} />
              </div>
            )}
            {/* nawigacja po sekcjach i zmiana języka w jednym rzędzie */}
            <div className="mt-c6 flex flex-wrap items-center gap-x-c8 gap-y-c3">
              <SectionIndex sections={landingSections} lang={lang} />
              <LanguageSwitcher lang={lang} path={PAGE_PATH} />
            </div>
          </div>
        </header>
      </div>
      {/* gradient musi być na pełnej szerokości i POD treścią — scena rozpuszcza się
          w płaskim tle bez twardej krawędzi (handoff „Treść pod hero”) */}
      <div className="relative z-1 flex flex-col bg-[linear-gradient(180deg,transparent_0%,var(--color-bg)_34%)]">
        <LandingSections sections={landingSections} contact={{ email: data.email, ctaText: data.ctaText }} lang={lang} />
        {/* poświata ogniska pod kontaktem — klamra z nocnym hero na górze */}
        <div aria-hidden className="h-(--glow-height) bg-(image:--bg-glow-horizon)" />
      </div>
    </div>
  )

}
