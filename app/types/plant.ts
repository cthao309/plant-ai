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
  | "none"
  | "unavailable";

export type EdiblePlantRecord = {
  id: number;
  scientific_name: string;
  common_name: string | null;
  family: string;
  edible_portion: string | null;
  known_hazards: boolean;
  toxicity_level: string | null;
  url: string;
};

export type ToxicityInfo = {
  status: "toxic" | "not_known_toxic" | "unknown";
  toxicParts: string[];
  symptoms: string[];
  precautions: string[];
  sourceUrl: string | null;
};

export type ToxicityByCategory = {
  human: ToxicityInfo;
  pets: ToxicityInfo;
};
