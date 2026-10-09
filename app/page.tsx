"use client";

import { useEffect, useState, type ChangeEvent } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [result, setResult] = useState<string | null>(null);

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

          {result && (
            <p className="mt-4 text-sm text-zinc-600">{result}</p>
          )}
        </section>
      </div>
    </main>
  );
}
