import { portfolioKnowledge } from "./portfolio-knowledge.js";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 12;
const MIN_REQUEST_INTERVAL_MS = 1200;
const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY_ITEMS = 8;
const MAX_HISTORY_MESSAGE_LENGTH = 900;

const requestLog = new Map();
const lastRequestAt = new Map();

const getClientIp = (request) => {
  const forwarded = request.headers["x-forwarded-for"];
  return (forwarded ? forwarded.split(",")[0] : request.socket?.remoteAddress || "unknown").trim();
};

const prune = (map, now) => {
  for (const [key, timestamp] of map) {
    if (now - timestamp > WINDOW_MS) map.delete(key);
  }
};

const cleanHistory = (history) => {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && (item.role === "user" || item.role === "model") && typeof item.text === "string")
    .slice(-MAX_HISTORY_ITEMS)
    .map((item) => ({
      role: item.role,
      parts: [{ text: item.text.trim().slice(0, MAX_HISTORY_MESSAGE_LENGTH) }],
    }))
    .filter((item) => item.parts[0].text);
};

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });

  const env = globalThis.process?.env ?? {};
  const now = Date.now();
  const ip = getClientIp(request);
  prune(requestLog, now);
  prune(lastRequestAt, now);

  const recent = requestLog.get(ip) || [];
  if (recent.filter((timestamp) => now - timestamp < WINDOW_MS).length >= MAX_REQUESTS_PER_WINDOW) {
    return response.status(429).json({ error: "The chat is busy right now. Please try again later or contact Gina directly." });
  }
  if (now - (lastRequestAt.get(ip) || 0) < MIN_REQUEST_INTERVAL_MS) {
    return response.status(429).json({ error: "Please wait a moment before sending another question." });
  }

  const body = request.body || {};
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return response.status(400).json({ error: `Please enter a question between 1 and ${MAX_MESSAGE_LENGTH} characters.` });
  }

  if (!env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY environment variable.");
    return response.status(500).json({ error: "The AI assistant is temporarily unavailable. Please contact Gina directly." });
  }

  const model = env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const history = cleanHistory(body.history);
  const contents = [...history, { role: "user", parts: [{ text: message }] }];
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;

  requestLog.set(ip, [...recent.filter((timestamp) => now - timestamp < WINDOW_MS), now]);
  lastRequestAt.set(ip, now);

  let geminiResponse;
  try {
    geminiResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: portfolioKnowledge }] },
        contents,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 350,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ],
      }),
    });
  } catch (error) {
    console.error("Gemini request failed:", error);
    return response.status(502).json({ error: "The AI assistant could not connect. Please try again later." });
  }

  if (!geminiResponse.ok) {
    const details = await geminiResponse.text();
    console.error("Gemini API error:", geminiResponse.status, details);
    const status = geminiResponse.status === 429 ? 429 : 502;
    return response.status(status).json({ error: status === 429 ? "The AI assistant has reached its free-tier limit for now. Please try again later." : "The AI assistant could not answer right now. Please contact Gina directly." });
  }

  const result = await geminiResponse.json();
  const answer = result.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();
  if (!answer) return response.status(502).json({ error: "The AI assistant returned no answer. Please contact Gina directly." });

  return response.status(200).json({ answer });
}
