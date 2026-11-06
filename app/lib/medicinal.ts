import type { MedicinalInfo } from "@/app/types/medicinal";
import { medicinalRecords } from "./medicinal-data";

export function getPlantMedicinalInfo(
  scientificName: string
): MedicinalInfo {
  const normalizedName = scientificName.trim().toLowerCase();

  const record = medicinalRecords.find(
    (plant) =>
      plant.scientificName.trim().toLowerCase() === normalizedName
  );

  if (record) {
    return record.medicinal;
  }

  return {
    status: "unknown",
    uses: [],
    evidence: [],
    risks: [
      "Medicinal uses have not been verified.",
      "Do not use unidentified plants for medicinal purposes."
    ],
    sourceUrl: null
  };
}