"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { buttonClassName } from "@/components/Button";
import { cn } from "@/lib/utils";
import { DICTIONARY, type Lang } from "@/lib/i18n";

const COPIED_FEEDBACK_MS = 2000;
const ICON_SIZE = 16;

// mailto: nic nie robi, gdy ktoś nie ma ustawionego klienta poczty (np. sam Gmail w przeglądarce) —
// kopiowanie adresu to wyjście awaryjne, a sam adres zostaje widoczny.
export function CopyEmailButton({ email, lang }: { email: string; lang: Lang }) {
  const t = DICTIONARY[lang];
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={t.copyAddress(email)}
      className={cn(buttonClassName("secondary"), "inline-flex items-center gap-c2 font-mono")}
    >
      {copied ? <Check size={ICON_SIZE} className="text-success" /> : <Copy size={ICON_SIZE} />}
      <span aria-live="polite">{copied ? t.copied : email}</span>
    </button>
  );
}
