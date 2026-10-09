export async function POST(request: Request) {
  // 1. Receive the image from our frontend
  const formData = await request.formData();
  const image = formData.get("image");

  // 2. Validate the image
  if(!(image instanceof File)) {
    return Response.json(
      {
        message: "No image received",
      },
      {
        status: 400,
      }
    );
  }

  if(!image.type.startsWith("image/")) {
    return Response.json(
      {
        message: "Uploaded file must be an image" },
      {
        status: 400
      }
      );
  }

  // 3. Read our PlantNet API key from environment variables
  const apiKey = process.env.PLANETNET_API_KEY;

  if(!apiKey) {
    return Response.json(
      {
        message: "Plant identification service is not configured."
      },
      {
        status: 500
      }
    );
  }

  // 4. Prepare the image for PlanetNet
  const plantnetFormData = new FormData();
  plantnetFormData.append("images", image);

  // 5. Send the image to PlanetNet
  try {
    const response = await fetch(
      `https://my-api.plantnet.org/v2/identify/all?api-key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        body: plantnetFormData,
      }
    );

    if (!response.ok) {
      return Response.json(
        { message: "Plant identification failed. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();

    const bestMatch = data.results?.[0];

    if (!bestMatch) {
      return Response.json({
        message: "No plant match found. Try another photo.",
      });
    }

    const plantName =
      bestMatch.species.commonNames?.[0] ||
      bestMatch.species.scientificNameWithoutAuthor;

    const confidence = (bestMatch.score * 100).toFixed(1);

    return Response.json({
      message: `${plantName} — ${confidence}% confidence`,
    });
  } catch {
    return Response.json(
      { message: "Unable to contact the plant identification service." },
      { status: 502 }
    );
  }

}