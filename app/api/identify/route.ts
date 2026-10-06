export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image");

  // Process the uploaded image (e.g., send it to a plant identification service)
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

  return Response.json({
    message: `Image received: ${image.name}`,
  });
}