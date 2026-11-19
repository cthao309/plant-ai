import { NextResponse } from "next/server";
import { searchMedicinalSources } from "@/app/lib/medicinal-sources";

export async function GET() {
  try {
    const sources = await searchMedicinalSources("Ocimum basilicum");

    return NextResponse.json({
      scientificName: "Ocimum basilicum",
      totalRetrieved: sources.length,
      sources,
    });
  } catch (error) {
    console.error("PubMed retrieval failed:", error);

    return NextResponse.json(
      { error: "Unable to retrieve medicinal sources." },
      { status: 500 }
    );
  }
}