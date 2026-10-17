import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { CodeBlock } from "@/components/CodeBlock";
import { Input } from "@/components/Input";
import { SnapshotCard } from "@/components/SnapshotCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { DICTIONARY, isLang } from "@/lib/i18n";
import { notFound } from "next/navigation";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-c5">
      <h2 className="font-mono text-xs tracking-[var(--tracking-label)] uppercase text-accent-alt">{title}</h2>
      {children}
    </section>
  );
}

// Arkusz komponentów jest po polsku; `lang` zmienia tylko teksty z lib/i18n.ts.
export default async function MockupPage({ params }: PageProps<"/[lang]/mockup">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <div className="min-h-full bg-bg text-text-primary">
      <div className="max-w-[var(--container)] mx-auto flex flex-col gap-c10 px-c8 py-c8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-text-muted">/mockup — Campfire component sheet</span>
          <div className="flex items-center gap-c5">
            <LanguageSwitcher lang={lang} path="/mockup" />
            <ThemeToggle lang={lang} />
          </div>
        </div>

        <Section title="Typografia">
          <div className="flex flex-col gap-c3">
            <h1 className="text-2xl">Nagłówek H1 przy ognisku</h1>
            <h2 className="text-xl">Nagłówek H2, <em className="text-accent italic">jedna fraza</em> w akcencie</h2>
            <h3 className="text-lg">Nagłówek H3 — tytuł karty</h3>
            <p className="text-md text-text-secondary leading-[var(--leading-snug)] max-w-[var(--measure-lead)]">
              Lead: krótki opis pod nagłówkiem, trochę większy i jaśniejszy niż tekst główny.
            </p>
            <p className="text-base text-text-secondary leading-[var(--leading-body)] max-w-[var(--measure-prose)]">
              Akapit: Hanken Grotesk w rozmiarze bazowym, z odstępem 1.7 dla wygody czytania. Tak wygląda
              dłuższy tekst — opis projektu, wpis na blogu albo notka pod sekcją.
            </p>
            <p className="font-mono text-xs tracking-[var(--tracking-label)] uppercase text-accent-alt">
              eyebrow — mono uppercase
            </p>
          </div>
        </Section>

        <Section title="Przyciski">
          <div className="flex gap-c3 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </Section>

        <Section title="Chipy / statusy">
          <div className="flex gap-c3 flex-wrap">
            <Chip status="success">deployed</Chip>
            <Chip status="warning">work in progress</Chip>
            <Chip status="error">błąd builda</Chip>
            <Chip status="neutral">Next.js</Chip>
          </div>
        </Section>

        <Section title="Input">
          <div className="max-w-sm">
            <Input label="Jak Cię zawołać?" placeholder="Imię" />
          </div>
        </Section>

        <Section title="Karty">
          <div className="grid gap-c5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <Card
              eyebrow="01 — case study"
              title="Projekt pierwszy"
              description="Krótki opis projektu, do dwóch-trzech linijek, żeby było widać zawijanie tekstu w karcie."
              tags={["Next.js", "TypeScript", "Tailwind"]}
              href="#"
              linkLabel={DICTIONARY[lang].repoLink}
            />
            <Card
              eyebrow="02 — case study"
              title="Projekt drugi"
              description="Kolejna karta w siatce — sprawdza układ przy większej liczbie elementów."
              tags={["Node", "Postgres"]}
              href="#"
              linkLabel={DICTIONARY[lang].repoLink}
            />
            <SnapshotCard
              snapshot={{
                _id: "mockup",
                title: "Karta ze snapshotem",
                eyebrow: "03 — case study",
                status: "Build gotowy",
                body: "Karta zasilana dokumentem snapshot z Sanity, ze zrzutem strony nad treścią.",
                repoURL: "#",
                tags: ["Sanity", "Microlink"],
                screenshotUrl: "/profile.png",
              }}
              lang={lang}
            />
          </div>
        </Section>

        <Section title="Blok kodu">
          <CodeBlock>{`function siadajPrzyOgniu() {
  // komentarz w akcencie
  return "razem";
}`}</CodeBlock>
        </Section>
      </div>
    </div>
  );
}
