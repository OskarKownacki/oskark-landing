import { defineLive } from "next-sanity/live";
import { client } from "@/lib/sanity/client";

// Live Content API: odpowiedzi z Sanity siedzą w cache Next.js, a <SanityLive /> w layoucie
// unieważnia je, gdy w Studio ktoś opublikuje zmianę — bez F5 i bez czekania na wygaśnięcie cache.
// Tokeny wyłączone: strona pokazuje tylko opublikowane treści.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});
