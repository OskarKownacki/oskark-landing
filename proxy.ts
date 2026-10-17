import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

// Każda strona żyje pod /pl/… albo /en/…. Ścieżka bez języka (/, /landing) dostaje
// przekierowanie na język przeglądarki, a gdy żaden nie pasuje — na DEFAULT_LANG.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isLang(pathname.split("/")[1])) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLang(request.headers.get("accept-language"))}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

// "en-US,en;q=0.9,pl;q=0.8" → pierwszy obsługiwany język w kolejności z nagłówka.
// ponytail: wagi q są pomijane — przeglądarki wysyłają języki już posortowane malejąco.
function preferredLang(acceptLanguage: string | null): Lang {
  const languages = acceptLanguage?.split(",").map((entry) => entry.split(";")[0].split("-")[0].trim().toLowerCase());
  return languages?.find(isLang) ?? DEFAULT_LANG;
}

export const config = {
  // bez API, Studio, plików Next.js i statycznych (wszystko z kropką: favicon.ico, profile.png)
  matcher: ["/((?!api|studio|_next|.*\\..*).*)"],
};
