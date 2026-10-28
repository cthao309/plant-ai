import type { ToxicityByCategory } from "@/app/types/plant";

export type ToxicityRecord = {
  scientificName: string;
  toxicity: ToxicityByCategory;
};

export const toxicityRecords: ToxicityRecord[] = [
  {
    scientificName: "Nerium oleander",
    toxicity: {
      human: {
        status: "toxic",
        toxicParts: [
          "Leaves",
          "Flowers",
          "Stems",
          "All other parts",
        ],
        symptoms: [
          "Nausea and vomiting",
          "Abdominal pain and diarrhea",
          "Slow or irregular heartbeat",
          "Dizziness and weakness",
        ],
        precautions: [
          "Do not ingest any part of this plant.",
          "If ingestion occurs, seek immediate medical help.",
          "In the US, call Poison Control at 1-800-222-1222.",
        ],
        sourceUrl:
          "https://medlineplus.gov/ency/article/002884.htm",
      },
      pets: {
        status: "toxic",
        toxicParts: ["All parts of the plant"],
        symptoms: [
          "Drooling",
          "Abdominal pain and diarrhea",
          "Weakness or depression",
          "Potentially life-threatening poisoning",
        ],
        precautions: [
          "Confirmed toxic to dogs, cats, and horses.",
          "Keep these animals away from oleander.",
          "If ingestion is suspected, contact a veterinarian immediately.",
        ],
        sourceUrl:
          "https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/oleander",
      },
    },
  },
];