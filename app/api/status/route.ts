import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const batchId = request.nextUrl.searchParams.get("batchId");

  if (!batchId) {
    return Response.json(
      { error: "Batch ID is missing." },
      { status: 400 },
   );
  }

  try {
    const openai = new OpenAI();
    const batch = await openai.batches.retrieve(batchId);

    return Response.json({ batch });
  } catch (error) {
    console.error(error);
  }
}
