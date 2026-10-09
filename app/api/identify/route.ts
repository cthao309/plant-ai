export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image");

  // Process the uploaded image (e.g., send it to a plant identification service)
  if(!(image instanceof File)) {
    console.log("Uploaded file type:", image.type);
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

  return Response.json(
    {
      message: `Image received: ${image.name}`,
    }
  );

}