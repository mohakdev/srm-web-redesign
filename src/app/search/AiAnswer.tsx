"use client";

import { useEffect } from "react";
import { Cited } from "@/components/Cited";
import { useAsk } from "@/lib/ask-client";

/**
 * A short AI summary above the search results. It runs only when a search is
 * submitted (or arrives in the URL), never on each keystroke, to keep calls
 * and cost down. If the assistant is not configured it stays out of the way.
 */
export function AiAnswer({ query }: { query: string }) {
  const { ask, answer, sources, status, error } = useAsk();

  useEffect(() => {
    if (query) ask("search", [{ role: "user", content: query }]);
  }, [query, ask]);

  if (!query || status === "idle") return null;
  if (status === "error" && /not available/i.test(error)) return null;

  return (
    <aside
      className="ai-answer"
      aria-live="polite"
      aria-busy={status === "loading" || status === "streaming"}
    >
      <p className="ai-label">
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"
            fill="currentColor"
          />
        </svg>
        AI answer
      </p>
      {status === "error" ? (
        <p className="ai-text chat-error">{error}</p>
      ) : answer ? (
        <p className="ai-text">
          <Cited text={answer} sources={sources} />
          {status === "streaming" && (
            <span className="chat-caret" aria-hidden="true" />
          )}
        </p>
      ) : (
        <p className="ai-text chat-thinking">Reading the site</p>
      )}
      {status === "done" && (
        <p className="ai-note">
          Generated from this site. Check fees and deadlines on srmist.edu.in.
        </p>
      )}
    </aside>
  );
}
