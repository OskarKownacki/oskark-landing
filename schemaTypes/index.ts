import type { SchemaTypeDefinition } from "sanity";
import { heroType } from "./heroType";
import { landingPageType } from "./landingPageType";
import { snapshotType } from "./snapshotType";

export const schemaTypes: SchemaTypeDefinition[] = [heroType, snapshotType, landingPageType];
