import { NextRequest, NextResponse } from "next/server";
import { internalRAGQuery } from "@/lib/rag";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    const reply = await internalRAGQuery(query);
    return NextResponse.json({ reply });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error("🔥 Chatbot API Error:", message);
    return NextResponse.json({ reply: "Internal server error." }, { status: 500 });
  }
}
