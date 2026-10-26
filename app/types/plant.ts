export type EdibilityInfo = {
  status: "commonly_eaten" | "not_recommended" | "unknown";
  edibleParts: string[];
  culinaryUses: string[];
  precautions: string[];
  sourceUrl: string | null;
};

export type RelatedPlantInfo = {
  scientificName: string;
  edibleParts: string[];
  sourceUrl: string;
};

export type PlantMatchType =
  | "exact"
  | "related"
  | "none";
