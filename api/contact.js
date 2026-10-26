const DESTINATION_EMAIL = "gina18gamboa@gmail.com";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const requestLog = new Map();
const processedRequests = new Map();

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const getClientIp = (request) => {
  const forwarded = request.headers["x-forwarded-for"];
  return (forwarded ? forwarded.split(",")[0] : request.socket?.remoteAddress || "unknown").trim();
};

const prune = (map, now) => {
  for (const [key, timestamp] of map) {
    if (now - timestamp > WINDOW_MS) map.delete(key);
  }
};

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });

  const env = globalThis.process?.env ?? {};
  const now = Date.now();
  prune(requestLog, now);
  prune(processedRequests, now);

  const ip = getClientIp(request);
  const recentRequests = requestLog.get(ip) || [];
  if (recentRequests.filter((timestamp) => now - timestamp < WINDOW_MS).length >= MAX_REQUESTS_PER_WINDOW) {
    return response.status(429).json({ error: "Too many messages from this connection. Please try again later." });
  }

  const { name, email, message, website, formStartedAt, requestId } = request.body || {};
  if (website) return response.status(400).json({ error: "Unable to send this message." });
  if (!requestId || typeof requestId !== "string" || processedRequests.has(requestId)) {
    return response.status(409).json({ error: "This message was already submitted. Please wait before trying again." });
  }

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    cleanName.length < 2 || cleanName.length > 100 ||
    !emailPattern.test(cleanEmail) || cleanEmail.length > 254 ||
    cleanMessage.length < 10 || cleanMessage.length > 5000
  ) return response.status(400).json({ error: "Please provide a valid name, email, and message." });

  if (typeof formStartedAt === "number" && now - formStartedAt < 1200) {
    return response.status(400).json({ error: "Please take a moment to complete the form and try again." });
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL environment variable.");
    return response.status(500).json({ error: "The contact form is temporarily unavailable. Please try again later." });
  }

  requestLog.set(ip, [...recentRequests.filter((timestamp) => now - timestamp < WINDOW_MS), now]);
  processedRequests.set(requestId, now);

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeMessage = escapeHtml(cleanMessage).replaceAll("\n", "<br />");
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `portfolio-contact-${requestId}`,
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: [DESTINATION_EMAIL],
      reply_to: cleanEmail,
      subject: `Portfolio contact from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      html: `<h2>New portfolio contact</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><hr /><p>${safeMessage}</p>`,
    }),
  });

  if (!resendResponse.ok) {
    const details = await resendResponse.text();
    console.error("Resend email error:", resendResponse.status, details);
    return response.status(502).json({ error: "We could not deliver your message. Please try again later." });
  }

  return response.status(200).json({ ok: true });
}
