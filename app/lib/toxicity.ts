import type { ToxicityByCategory } from "@/app/types/plant";

export function getPlantToxicity(
  scientificName: string
): ToxicityByCategory {
  return {
    human: {
      status: "unknown",
      toxicParts: [],
      symptoms: [],
      precautions: [
        "Human toxicity has not been verified.",
        "Do not consume unidentified plants.",
      ],
      sourceUrl: null,
    },
    pets: {
      status: "unknown",
      toxicParts: [],
      symptoms: [],
      precautions: [
        "Pet toxicity has not been verified.",
        "Keep unidentified plants away from pets.",
      ],
      sourceUrl: null,
    },
  };
}