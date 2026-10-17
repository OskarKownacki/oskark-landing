import { DICTIONARY, type Lang } from "@/lib/i18n";

// Temat i szkielet treści są wypełnione z góry — klient widzi, co warto napisać.
export function buildMailto(email: string, lang: Lang): string {
  const { mailSubject, mailBody } = DICTIONARY[lang];
  const params = new URLSearchParams({ subject: mailSubject, body: mailBody.join("\n") });
  // URLSearchParams koduje spację jako "+", a klienty poczty czytają ją w mailto dosłownie.
  return `mailto:${email}?${params.toString().replaceAll("+", "%20")}`;
}
