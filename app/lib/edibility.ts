import "server-only";

const EDIBLE_API_URL =
  "https://edibleplantdb.org/api/v1/search";

export async function searchEdiblePlant(
  scientificName: string
) {
  const apiKey = process.env.EDIBLE_API_KEY;

  if (!apiKey) {
    throw new Error("Edible Plant API key is missing.");
  }

  const url = new URL(EDIBLE_API_URL);

  url.searchParams.set("q", scientificName);
  url.searchParams.set("limit", "50");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Edible Plant API request failed: ${response.status}`
    );
  }

  return response.json();
}