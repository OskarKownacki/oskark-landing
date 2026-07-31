import { MountainScene } from "@/components/MountainScene";
import { defineQuery } from "next-sanity";
import { client } from "@/lib/sanity/client";
import { Card } from "@/components/Card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import Image from "next/image";
import profileImage from "@/public/profile.png";

const HERO_QUERY = defineQuery(`*[_type == "hero"][0]{
  title,
  subtitle,
  ctaText,
  aboutMeText,
}`);

export async function getHeroData(): Promise<{ title: string; subtitle: string; ctaText: string; aboutMeText: string }> {
  const heroData = await client.fetch(HERO_QUERY);
  return heroData;
}


function Section({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("flex flex-col gap-c5", className)}>
      <h2 className="font-mono text-lg tracking-[var(--tracking-label)] uppercase text-accent-alt">{title}</h2>
      {children}
    </section>
  );
}

export default async function LandingPage() {
  const data = await getHeroData();
  return (
    <div className="relative flex flex-col gap-c5">
      <MountainScene theme="dark" />
      <div className="hero">
        <header className="flex mt-[30vh] mx-[20vw]">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl lg:text-3xl italic">{data.title}</h1>
            <h2 className="text-xl text-text-secondary leading-snug max-w-(--mesure-lead)">
              {data.subtitle}
            </h2>
            <Button variant="primary" className="mt-4 w-fit">
              {data.ctaText}
            </Button>
          </div>
        </header>
        {/* scena rozpuszcza się w płaskim tle przy scrollu — handoff „Treść pod hero” */}
        <div className="mx-50">

        </div>
      </div>
      {/* gradient musi być na pełnej szerokości i POD treścią — wewnątrz `mx-50`
          chowa się za nieprzezroczystą kartą i scena nie rozpuszcza się w tle */}
      <div className="relative z-1 min-h-screen bg-[linear-gradient(180deg,transparent_0%,var(--color-bg)_34%)] flex flex-col gap-c5">

        <Section title="Portfolio" className="mx-[20vw]">
          <div className="grid gap-c5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <div className="flex flex-col gap-c2">
              <Chip status="success" className="w-fit">Build gotowy</Chip>
              <Card
                eyebrow="01 — case study"
                title="Projekt pierwszy"
                description="Krótki opis projektu, do dwóch-trzech linijek, żeby było widać zawijanie tekstu w karcie."
                tags={["Next.js", "TypeScript", "Tailwind"]}
                href="#"
              />
            </div>
            <div className="flex flex-col gap-c2">
              <Chip status="success" className="w-fit">Build gotowy</Chip>
              <Card
                eyebrow="01 — case study"
                title="Projekt pierwszy"
                description="Krótki opis projektu, do dwóch-trzech linijek, żeby było widać zawijanie tekstu w karcie."
                tags={["Next.js", "TypeScript", "Tailwind"]}
                href="#"
              />
            </div>
            <div className="flex flex-col gap-c2">
              <Chip status="success" className="w-fit">Build gotowy</Chip>
              <Card
                eyebrow="01 — case study"
                title="Projekt pierwszy"
                description="Krótki opis projektu, do dwóch-trzech linijek, żeby było widać zawijanie tekstu w karcie."
                tags={["Next.js", "TypeScript", "Tailwind"]}
                href="#"
              />
            </div>
          </div>
        </Section>
        <Section title="O mnie" className="mx-[20vw]">
          <div className="flex items-end justify-start">
            {/* pełna sylwetka — żadnego object-cover, dół zdjęcia ma zostać;
                scale-x-[-1] odbija kadr lustrzanie, żeby patrzył w stronę tekstu.
                Maska wygasza dolne 28% kadru, więc twarde ucięcie sylwetki rozpuszcza
                się w tle zamiast kończyć krawędzią */}
            <Image
              src={profileImage}
              alt="Oskar"
              sizes="(max-width: 768px) 60vw, 420px"
              className="h-auto w-[60%] max-w-[420px] shrink-0 scale-x-[-1] [mask-image:linear-gradient(to_top,transparent_0%,#000_28%)]"
            />
            {/* ujemny margines wciąga napis znad fotki w lewo, na nią; `ch` skaluje się
                razem ze stopniem pisma, więc nachodzenie jest takie samo na każdym
                breakpoincie. translate-y-1/2 sadza go okrakiem na dolnej krawędzi
                kadru — tam, gdzie sylwetka się urywa */}
            <h2 className="z-1 -ml-[5ch] whitespace-nowrap text-lg leading-none italic md:text-2xl lg:text-3xl">
              Meet the man
            </h2>
            {/* self-center liczy się względem wysokości linii flex, a tę wyznacza
                najwyższy element — zdjęcie. Środek akapitu ląduje więc dokładnie
                na środku fotki, bez znajomości jej wysokości */}
            <p className="self-center ml-c5 text-text-secondary max-w-(--mesure-lead) leading-9 text-md text-justify">
              {data.aboutMeText}
            </p>
          </div>
        </Section>

      </div>
    </div>
  )
}