import { NextRequest } from "next/server";
import OpenAI from "openai";

function parseJsonl(contents: string) {
  return contents
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

export async function GET(request: NextRequest) {
  const outputFileId = request.nextUrl.searchParams.get("outputFileId");

  if (!outputFileId) {
    return Response.json(
      { error: "Output file ID is missing." },
      { status: 400 }
    );
  }

  try {
    const openai = new OpenAI();
    const fileResponse = await openai.files.content(outputFileId);
    const fileContents = await fileResponse.text();
    const results = parseJsonl(fileContents);

    return Response.json({ results });
  } catch (error) {
    console.error(error);
  }
}
