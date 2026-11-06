export type MedicinalInfo = {
  status: "documented" | "traditional" | "unknown";
  uses: string[];
  evidence: string[];
  risks: string[];
  sourceUrl: string | null;
};