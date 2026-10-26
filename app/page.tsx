"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import type {
  EdibilityInfo,
  RelatedPlantInfo,
  PlantMatchType,
} from "@/app/types/plant";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState
("edibility");
  const [plantInfo, setPlantInfo] = useState<{
    plantName: string;
    scientificName: string;
    confidence: string;
    family: string;
    edibility: EdibilityInfo;
    relatedPlants: RelatedPlantInfo[];
    matchType: PlantMatchType;
  } | null>(null);

  useEffect(() => {
    if (!previewUrl) {
      return;
    }

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Image selection handler
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0] ?? null;

    if (file && !file.type.startsWith("image/")) {
      event.currentTarget.value = "";
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  }

  // Plant identification handler
  async function handleIdentifyPlant() {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setIsIdentifying(true);
    setResult(null);
    setPlantInfo(null);

    try {
      const response = await fetch("/api/identify", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || "Image upload failed.");
      }

      setResult(data.message);

      if(data.plantName && data.scientificName && data.confidence != null) {
        setPlantInfo({
          plantName: data.plantName,
          scientificName: data.scientificName,
          confidence: data.confidence,
          family: data.family ?? "Unknown",
          edibility: data.edibilityInfo,
          relatedPlants: data.relatedPlantInfo ?? [],
          matchType: data.matchType ?? "none",
        });
      }
    } catch (error) {
      if(error instanceof Error) {
        setResult(`Error: ${error.message}`);
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } finally {
      setIsIdentifying(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 text-zinc-900">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Plant & Herbs Identifier
        </h1>

        <p className="mt-4 text-zinc-600">
          Upload a photo of a plant or herb to help identify it.
        </p>

        <section
          aria-labelledby="upload-heading"
          className="mt-8 rounded-xl border border-zinc-200 bg-white p-6"
        >
          <h2 id="upload-heading" className="text-xl font-semibold">
            Upload a plant photo
          </h2>

          <label
            htmlFor="plant-photo"
            className="mt-6 block text-sm font-medium"
          >
            Choose an image
          </label>

          <input
            id="plant-photo"
            name="plant-photo"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full text-sm text-zinc-600 file:mr-4 file:rounded-md file:border-0 file:bg-green-50 file:px-4 file:py-2 file:font-medium file:text-green-800 hover:file:bg-green-100"
          />

          {selectedFile && previewUrl && (
            <div className="mt-6">
              {/* This temporary URL displays the locally selected image. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={`Preview of ${selectedFile.name}`}
                className="max-h-80 w-full rounded-lg object-contain"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleIdentifyPlant}
            disabled={!selectedFile || isIdentifying}
            className="mt-6 rounded-lg bg-green-700 px-5 py-3 font-medium text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isIdentifying ? "Identifying..." : "Identify Plant"}
          </button>

          {plantInfo && previewUrl && (
            <div className="mt-6 flex items-center gap-4 rounded-xl border border-gray-200 p-4">
              <img
                src={previewUrl}
                alt={plantInfo.plantName}
                className="h-28 w-28 shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {plantInfo.plantName}
                </h2>

                <p className="mt-1 text-sm italic text-gray-500">
                  {plantInfo.scientificName}
                </p>

                <p className="mt-2 text-sm font-medium text-green-700">
                  {plantInfo.confidence}% confidence
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6 flex flex-wrap gap-2">
              {["edibility", "toxicity", "medicinal", "details"].map(
                (category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category === "details"
                      ? "Plant Details"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                )
              )}
            </div>
          )}

          {result && (
            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-800">
              {activeCategory === "edibility" && plantInfo && (
                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    Edibility
                  </h3>

                  <p className="mb-3 text-sm">
                    <strong>Status:</strong>{" "}
                    {plantInfo.edibility.status === "unknown"
                      ? "Not verified"
                      : plantInfo.edibility.status === "commonly_eaten"
                        ? "Commonly eaten"
                        : "Not recommended"}
                  </p>

                  <div className="mt-4 rounded-lg bg-gray-100 p-4">
                    <p className="font-semibold">Database Match</p>

                    {plantInfo.matchType === "exact" && (
                      <p className="mt-2">
                        An exact scientific-name match was found in the database.
                      </p>
                    )}

                    {plantInfo.matchType === "related" && (
                      <p className="mt-2">
                        No exact species match was found. Related botanical
                        varieties are available for reference.
                      </p>
                    )}

                    {plantInfo.matchType === "none" && (
                      <p className="mt-2">
                        No matching botanical records were found.
                      </p>
                    )}

                    {plantInfo.matchType === "unavailable" && (
                      <p className="mt-2">
                        The plant database is temporarily unavailable.
                        Edibility information could not be retrieved.
                        Please try again later.
                      </p>
                    )}
                  </div>

                  {plantInfo.relatedPlants.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-4">

                      <h3 className="text-lg font-semibold">
                        Related Botanical Information
                      </h3>

                      <p className="mt-2 text-sm text-gray-600">
                        These records describe related botanical varieties,
                        not necessarily the plant in your photo.
                        They do not establish that the photographed
                        plant is safe to consume.
                      </p>

                      {plantInfo.relatedPlants.map((plant) => (
                        <div
                          key={plant.scientificName}
                          className="mt-4 rounded-lg border border-gray-200 p-4"
                        >
                          <p className="font-medium italic">
                            {plant.scientificName}
                          </p>

                          <p className="mt-2">
                            <strong>Documented edible parts:</strong>{" "}
                            {plant.edibleParts.length > 0
                              ? plant.edibleParts.join(", ")
                              : "Not documented"}
                          </p>

                          <a
                            href={plant.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-blue-600 underline"
                          >
                            View database source
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {plantInfo.edibility.culinaryUses.length > 0 && (
                    <p className="mb-3 text-sm">
                      <strong>Culinary Uses:</strong>{" "}
                      {plantInfo.edibility.culinaryUses.join(", ")}
                    </p>
                  )}

                  <h4 className="mb-2 font-semibold">Precautions</h4>

                  <ul className="list-disc space-y-1 pl-5 text-sm">
                    {plantInfo.edibility.precautions.map((precaution, index) => (
                      <li key={index}>{precaution}</li>
                    ))}
                  </ul>

                  {plantInfo.edibility.sourceUrl && (
                    <a
                      href={plantInfo.edibility.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm text-green-700 underline"
                    >
                      View information source
                    </a>
            )}
          </div>
          )}

          {activeCategory === "toxicity" && (
            <div>
              <h3 className="mb-2 text-lg font-semibold">Toxicity</h3>
              <p>
                Known toxicity risks and safety precautions
                will appear here.
              </p>
            </div>
          )}

          {activeCategory === "medicinal" && (
            <div>
              <h3 className="mb-2 text-lg font-semibold">Medicinal Benefits</h3>
              <p>
                Traditional medicinal uses, scientific evidence,
                and potential risks will appear here.
              </p>
            </div>
          )}

          {activeCategory === "details" && plantInfo && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">
                Plant Details
              </h3>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Common Name:</strong> {plantInfo.plantName}
                </p>

                <p>
                  <strong>Scientific Name:</strong>{" "}
                  <em>{plantInfo.scientificName}</em>
                </p>

                <p>
                  <strong>Family:</strong> {plantInfo.family}
                </p>
              </div>
            </div>
          )}
          </div>
          )}
        </section>
      </div>
    </main>
  );
}
