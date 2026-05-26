import fs from "fs";
import path from "path";
import OpenAI from "openai";

export async function POST() {
  const filePath = path.join(process.cwd(), "batchinput.jsonl");

  try {
    const openai = new OpenAI();
    const file = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "batch",
    });

    console.log(file);

    return Response.json(
      { file },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
  }
}
