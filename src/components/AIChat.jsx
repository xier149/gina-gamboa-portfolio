import { useEffect, useRef, useState } from "react";
import { Bot, Eraser, MessageCircle, Send, Sparkles, X } from "lucide-react";

const suggestedQuestions = [
  "What is Gina's current role?",
  "Which projects has Gina built?",
  "What technologies does Gina use?",
  "What opportunities is Gina open to?",
];

const initialMessage = {
  role: "model",
  text: "Hi! I’m Gina’s AI assistant. Ask me about her background, projects, skills, or certifications.",
};

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    inputRef.current?.focus();
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isLoading]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const sendMessage = async (event, suggestedMessage) => {
    event?.preventDefault();
    const text = (suggestedMessage ?? message).trim();
    if (!text || isLoading) return;

    setError("");
    setMessage("");
    const history = messages.slice(-8).map(({ role, text: historyText }) => ({ role, text: historyText }));
    setMessages((current) => [...current, { role: "user", text }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const fallback = response.status === 429
          ? "The AI assistant is temporarily rate-limited. Please try again later."
          : response.status >= 500
            ? "The AI assistant is temporarily unavailable. Please contact Gina directly."
            : "Please check your question and try again.";
        throw new Error(result.error || fallback);
      }
      setMessages((current) => [...current, { role: "model", text: result.answer }]);
    } catch (requestError) {
      setError(requestError.message || "The AI assistant could not answer right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (isLoading) return;
    setMessages([initialMessage]);
    setMessage("");
    setError("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-[80] flex flex-col items-end sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          className="mb-3 flex h-[min(560px,calc(100dvh-6rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-primary/30 bg-card/95 shadow-2xl shadow-background/70 backdrop-blur-xl"
          role="dialog"
          aria-modal="false"
          aria-labelledby="ai-chat-title"
        >
          <header className="flex items-center justify-between border-b border-border/70 bg-surface/60 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 id="ai-chat-title" className="truncate text-sm font-semibold text-foreground">Ask Gina&apos;s AI</h2>
                <p className="text-[11px] text-muted-foreground">Portfolio knowledge assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={clearChat} disabled={isLoading} aria-label="Clear chat" className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <Eraser className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close AI chat" className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-3 sm:p-4" aria-live="polite">
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${item.role === "user" ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md border border-border/70 bg-surface/70 text-foreground"}`}>
                  {item.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start" aria-label="Gina's AI is thinking">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border/70 bg-surface/70 px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && !isLoading && (
            <div className="border-t border-border/50 px-3 pb-2 pt-2 sm:px-4">
              <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Try asking</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((question) => (
                  <button key={question} type="button" onClick={(event) => sendMessage(event, question)} className="rounded-full border border-primary/25 bg-primary/5 px-2.5 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <p role="alert" className="border-t border-red-500/20 bg-red-500/10 px-4 py-2 text-xs leading-5 text-red-300">{error}</p>}

          <form onSubmit={sendMessage} className="flex items-end gap-2 border-t border-border/70 bg-surface/40 p-3 sm:p-4">
            <label htmlFor="ai-chat-input" className="sr-only">Ask Gina&apos;s AI a question</label>
            <textarea ref={inputRef} id="ai-chat-input" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={600} rows={1} placeholder="Ask about Gina..." disabled={isLoading} className="min-h-11 max-h-24 flex-1 resize-none rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm leading-5 text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60" onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(event); } }} />
            <button type="submit" disabled={!message.trim() || isLoading} aria-label="Send question" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}

      <button type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Close Ask Gina's AI" : "Open Ask Gina's AI"} aria-expanded={isOpen} className="group ml-auto inline-flex min-h-14 min-w-14 items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary px-4 text-primary-foreground shadow-xl shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        {isOpen ? <X className="h-5 w-5" /> : <><Bot className="h-5 w-5" /><span className="hidden text-sm font-semibold sm:inline">Ask Gina&apos;s AI</span></>}
      </button>
    </div>
  );
};

export default AIChat;
