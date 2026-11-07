import type { ToxicityByCategory } from "@/app/types/plant";
import { toxicityRecords } from "./toxicity-data";

import {
  getPlantSmartRecord,
  convertPlantSmartToxicity,
} from "./plant-smart";

export function getPlantToxicity(
  scientificName: string
): ToxicityByCategory {

  const record = toxicityRecords.find(
    (plant) => plant.scientificName.trim().toLowerCase() === scientificName.trim().toLowerCase()
  );

  if (record) {
    return record.toxicity;
  }

  const plantSmartRecord = getPlantSmartRecord(scientificName);

  if (plantSmartRecord && plantSmartRecord.animals.length > 0) {
    const petToxicity = convertPlantSmartToxicity(plantSmartRecord);

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
        ...petToxicity,
        precautions: [
          ...petToxicity.precautions,
          `Plant Smart lists affected animals: ${plantSmartRecord.animals.join(", ")}.`,
          "Listed symptoms are not necessarily verified for every animal species.",
        ],
      },
    };
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