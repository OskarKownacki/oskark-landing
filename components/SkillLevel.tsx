import { cn } from "@/lib/utils";
import { DICTIONARY, type Lang } from "@/lib/i18n";

// Dyskretna skala zamiast procentów: segmenty nie udają precyzji, której nie ma,
// a słowny poziom obok czyta się bez koloru i działa dla czytników ekranu.
export function SkillLevel({ level, lang, className }: { level: number; lang: Lang; className?: string }) {
  const t = DICTIONARY[lang];
  const maxLevel = t.skillLevels.length;
  const value = Math.min(Math.max(Math.round(level), 1), maxLevel);
  const label = t.skillLevels[value - 1];

  return (
    <div
      role="img"
      aria-label={t.skillLevelAria(label, value, maxLevel)}
      className={cn("flex items-center gap-c3", className)}
    >
      <div aria-hidden className="flex flex-1 gap-1">
        {t.skillLevels.map((_, index) => (
          <span
            key={index}
            className={cn("h-1.5 flex-1 rounded-full", index < value ? "bg-accent" : "bg-surface-subtle")}
          />
        ))}
      </div>
      <span aria-hidden className="font-mono text-sm text-text-muted">
        {label}
      </span>
    </div>
  );
}
