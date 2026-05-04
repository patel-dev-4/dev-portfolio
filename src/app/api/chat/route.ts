import { streamText } from "ai";
import { google } from "@ai-sdk/google";

// Allow streaming responses up to 30 seconds on Vercel
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Extract the conversation history from the frontend
    const { messages } = await req.json();

    // Call the Gemini model
    const result = streamText({
      model: google("models/gemini-1.5-flash"),
      system: `You are 'Core Intel', a highly advanced, professional digital concierge for a high-end web developer. 
      Your tone is minimal, classy, and extremely knowledgeable about full-stack development, React, TypeScript, and Spring Boot.
      Keep responses concise and impactful. Do not use emojis. Respond in a highly structured, 'Old Money' corporate tone.`,
      messages,
    });

    // Stream the response back to the UI character by character
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Backend Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process AI request" }),
      { status: 500 },
    );
  }
}
