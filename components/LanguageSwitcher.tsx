import Link from "next/link";
import { cn } from "@/lib/utils";
import { DICTIONARY, LANGUAGES, type Lang } from "@/lib/i18n";

// `path` to ścieżka bez prefiksu języka (np. "/landing") — przełącznik podmienia tylko język.
export function LanguageSwitcher({ lang, path }: { lang: Lang; path: string }) {
  return (
    <nav aria-label={DICTIONARY[lang].languageSwitcherLabel} className="font-mono text-sm tracking-[var(--tracking-mono)]">
      <ul className="flex gap-c3">
        {LANGUAGES.map(({ id, title }) => (
          <li key={id}>
            <Link
              href={`/${id}${path}`}
              hrefLang={id}
              lang={id}
              title={title}
              aria-current={id === lang ? "true" : undefined}
              className={cn("no-underline hover:text-accent", id === lang ? "text-accent" : "text-text-muted")}
            >
              {id.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
