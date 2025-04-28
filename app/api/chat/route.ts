import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!openaiRes.ok) {
      console.error("OpenAI API error:", await openaiRes.text());
      return NextResponse.json({ reply: "Sorry, something went wrong contacting OpenAI." });
    }

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, no reply generated.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ reply: "Internal server error." });
  }
}
