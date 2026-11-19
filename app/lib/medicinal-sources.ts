import "server-only";

import {XMLParser} from "fast-xml-parser";

export type MedicinalSource = {
  title: string;
  url: string;
  abstract: string;
  publicationId: string;
};

type PubMedSearchResponse = {
  esearchresult?: {
    idlist?: string[];
  };
};

export async function searchMedicinalSources(
  scientificName: string
): Promise<MedicinalSource[]> {
  const query = `"${scientificName}" AND (ethnobotany OR traditional medicine OR medicinal uses)`;

  const params = new URLSearchParams({
    db: "pubmed",
    term: query,
    retmode: "json",
    retmax: "5",
  });

  const response = await fetch(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("PubMed search failed.");
  }

  const data: PubMedSearchResponse = await response.json();

  const publicationIds = data.esearchresult?.idlist ?? [];

  const sources: MedicinalSource[] = [];

  for (const id of publicationIds) {
    // Respect PubMed's API rate limit.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      const { title, abstract } = await fetchMedicinalAbstract(id);

      if (!title || !abstract) {
        console.warn(`Skipping incomplete PubMed record: ${id}`);
        continue;
      }

      sources.push({
        title,
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
        abstract,
        publicationId: id,
      });
    } catch (error) {
      console.error(`Failed to retrieve PubMed record ${id}:`, error);
    }
  }

  return sources;
}

export async function fetchMedicinalAbstract(
  publicationId: string
): Promise<{ title: string; abstract: string }> {
  if (!/^\d+$/.test(publicationId)) {
    throw new Error("Invalid PubMed publication ID.");
  }

  const params = new URLSearchParams({
    db: "pubmed",
    id: publicationId,
    retmode: "xml",
  });

  const response = await fetch(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(
      `Unable to retrieve PubMed publication. HTTP ${response.status}`
    );
  }

  const xml = await response.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    removeNSPrefix: true,
    textNodeName: "#text",
  });

  const data = parser.parse(xml);

  const article =
    data?.PubmedArticleSet?.PubmedArticle?.MedlineCitation?.Article;

  if (!article) {
    throw new Error("PubMed publication data is missing.");
  }

  // Convert XML text nodes into readable strings.
  const toText = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);

    if (Array.isArray(value)) {
      return value.map(toText).filter(Boolean).join(" ");
    }

    if (value && typeof value === "object") {
      const node = value as Record<string, unknown>;
      return toText(node["#text"]);
    }

    return "";
  };

  const title = toText(article.ArticleTitle);

  const abstractSections = article.Abstract?.AbstractText;
  const abstract = toText(abstractSections);

  return { title, abstract };
}