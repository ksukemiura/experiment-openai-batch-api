import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { inputFileId } = await request.json();

    if (!inputFileId) {
      return Response.json(
        { error: "Input file ID is missing." },
        { status: 400 },
      );
    }

    const openai = new OpenAI();
    const batch = await openai.batches.create({
      input_file_id: inputFileId,
      endpoint: "/v1/chat/completions",
      completion_window: "24h"
    });

    console.log(batch);

    return Response.json(
      { batch },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
  }
}
