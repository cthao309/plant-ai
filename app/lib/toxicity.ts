import type { ToxicityByCategory } from "@/app/types/plant";
import { toxicityRecords } from "./toxicity-data";

export function getPlantToxicity(
  scientificName: string
): ToxicityByCategory {

  const record = toxicityRecords.find(
    (plant) => plant.scientificName.trim().toLowerCase() === scientificName.trim().toLowerCase()
  );

  if (record) {
    return record.toxicity;
  }

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