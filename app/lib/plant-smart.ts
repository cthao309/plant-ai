import plants from "@/app/data/plant-smart/plants.json";

import type { PlantSmartRecord } from "@/app/types/plant-smart";

import type { ToxicityInfo } from "@/app/types/plant";

const plantSmartRecords: PlantSmartRecord[] = plants;

export function getPlantSmartRecord(
  scientificName: string
): PlantSmartRecord | null {
  const normalizedName = scientificName.trim().toLowerCase();

  const match = plantSmartRecords.find(
    (plant) =>
      plant.name.trim().toLowerCase() === normalizedName
  );

  return match ?? null;
}

export function convertPlantSmartToxicity(
  plant: PlantSmartRecord
): ToxicityInfo {
  return {
    status: "toxic",
    toxicParts: [],
    symptoms: plant.symptoms.map(
      (symptom) => symptom.name
    ),
    precautions: [
      "Keep pets away from this plant.",
      "Contact a veterinarian if ingestion is suspected.",
    ],
    sourceUrl: "https://plantsm.art/api",
  };
}