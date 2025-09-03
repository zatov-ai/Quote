import OpenAI from "openai";
import { QuoteRequestSchema } from "../lib/validation";
import type { Extracted } from "../lib/validation";

const client = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

export async function extractFromText(raw: string): Promise<{extracted: Extracted|null; confidence:number; error?:string}> {
  try {
    const sys = "Extract a freight quote request into strict JSON following the schema. If fields are missing, omit them rather than guessing.";
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role:"system", content: sys }, { role:"user", content: raw.slice(0, 8000) }],
      response_format: { type: "json_object" }
    });
    const content = completion.choices[0]?.message?.content ?? "{}";
    const json = JSON.parse(content);
    const parsed = QuoteRequestSchema.safeParse(json);
    if (!parsed.success) {
      return { extracted: null, confidence: 0.35, error: "Validation failed" };
    }
    // naive confidence – can be improved by checking key fields present
    const must = ["origin","destination","commodities"];
    const score = must.reduce((s,k)=> s + (json[k] ? 1 : 0), 0) / must.length;
    return { extracted: parsed.data, confidence: 0.6 + 0.4*score };
  } catch (e:any) {
    return { extracted: null, confidence: 0, error: e?.message ?? "Unknown error" };
  }
}