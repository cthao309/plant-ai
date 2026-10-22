export type EdibilityInfo = {
  status: "commonly_eaten" | "not_recommended" | "unknown";
  edibleParts: string[];
  culinaryUses: string[];
  precautions: string[];
  sourceUrl: string | null;
};