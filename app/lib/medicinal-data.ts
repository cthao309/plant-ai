import type { MedicinalInfo } from "@/app/types/medicinal";

export type MedicinalRecord = {
  scientificName: string;
  medicinal: MedicinalInfo;
};

export const medicinalRecords: MedicinalRecord[] = [
  {
    scientificName: "Ocimum basilicum",
    medicinal: {
      status: "traditional",
      uses: [
        "Traditionally used for digestive discomfort.",
        "Traditionally used in herbal preparations."
      ],
      evidence: [
        "Traditional use does not establish clinical effectiveness.",
        "Human clinical evidence for these uses is limited."
      ],
      risks: [
        "Medicinal preparations may differ from normal culinary use.",
        "Consult a healthcare professional before using concentrated extracts."
      ],
      sourceUrl: null
    }
  }
];