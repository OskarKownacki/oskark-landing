// Studio ma własny root layout: wspólny layout strony siedzi w app/[lang] (html lang per język),
// a Studio nie potrzebuje fontów, globals.css ani <SanityLive />.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
