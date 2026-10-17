import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-07-31",
  useCdn: true,
});

// Serwerowy klient z prawem zapisu (cron); token nigdy nie trafia do przeglądarki.
export const writeClient = client.withConfig({
  token: process.env.NEXT_PRIVATE_SANITY_TOKEN,
  useCdn: false,
});
