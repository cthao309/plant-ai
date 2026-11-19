export type HistoricalMedicinalUse = {
  use: string;
  historicalContext: string;
  sourceTitle: string;
  sourceUrl: string;
};

export type MedicinalInfo = {
  status: "documented" | "traditional" | "unknown";
  uses: string[];
  evidence: string[];
  risks: string[];
  sourceUrl: string | null;

  // New fields for AI-generated historical summaries
  historicalUses?: HistoricalMedicinalUse[];
  historicalSummary?: string;
};