import { DEFAULT_LANG } from "@/lib/i18n";

// Pole tłumaczone (sanity-plugin-internationalized-array) → string w języku $lang,
// a gdy go brak — w DEFAULT_LANG. count() działa tylko na tablicach, więc stary zwykły
// string (dokument sprzed migracji) przechodzi bez zmian.
const localized = (field: string) => `select(
  defined(count(${field})) => coalesce(
    ${field}[language == $lang][0].value,
    ${field}[language == "${DEFAULT_LANG}"][0].value
  ),
  ${field}
)`;

export const SNAPSHOT_URL_QUERY: string = `*[_type == "snapshot" && defined(url)]{
  _id,
  url,
  "currentAssetId": screenshot.asset._ref,
  "previousAssetId": previousScreenshot.asset._ref
}`

const SNAPSHOT_CARD_FIELDS = `{
  _id,
  "title": ${localized("title")},
  "eyebrow": ${localized("eyebrow")},
  "status": ${localized("status")},
  statusType,
  "body": ${localized("body")},
  repoURL,
  tags,
  "screenshotUrl": screenshot.asset->url
}`

export const SNAPSHOT_CARDS_QUERY: string = `*[_type == "snapshot"]${SNAPSHOT_CARD_FIELDS}`

export const HERO_QUERY: string = `*[_type == "hero"][0]{
  "title": ${localized("title")},
  "subtitle": ${localized("subtitle")},
  "ctaText": ${localized("ctaText")},
  email
}`

export const LANDING_SECTIONS_QUERY: string = `*[_type == "landingPage"][0].sections[]{
  _key,
  _type,
  "title": ${localized("title")},
  "heading": ${localized("heading")},
  _type == "portfolioSection" => {
    "snapshots": *[_type == "snapshot"]${SNAPSHOT_CARD_FIELDS}
  },
  _type == "aboutSection" => {
    "text": ${localized("text")},
    "image": image.asset->{ url, "width": metadata.dimensions.width, "height": metadata.dimensions.height }
  },
  _type == "skillsSection" => {
    skills[]{ _key, "name": ${localized("name")}, "description": ${localized("description")}, level }
  },
  _type == "socialSection" => {
    links[]{ _key, label, url }
  }
}`
