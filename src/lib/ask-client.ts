"use client";

import { useCallback, useRef, useState } from "react";

export type Turn = { role: "user" | "assistant"; content: string };
export type AskSource = { title: string; url: string; page: string };
type Status = "idle" | "loading" | "streaming" | "done" | "error";

/** Sends a question to /api/ask and streams the answer into state. */
export function useAsk() {
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<AskSource[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const abort = useRef<AbortController | null>(null);

  const ask = useCallback(async (mode: "chat" | "search", messages: Turn[]) => {
    abort.current?.abort();
    const controller = new AbortController();
    abort.current = controller;
    setAnswer("");
    setSources([]);
    setError("");
    setStatus("loading");
    let text = "";
    let found: AskSource[] = [];
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, messages }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error || "The assistant could not answer just now.",
        );
      }
      const header = res.headers.get("X-Sources");
      if (header) {
        found = JSON.parse(decodeURIComponent(header));
        setSources(found);
      }
      setStatus("streaming");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setAnswer(text);
      }
      setStatus("done");
      return { text, sources: found };
    } catch (e) {
      if (controller.signal.aborted) {
        setStatus("done");
        return { text, sources: found };
      }
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
      return { text: "", sources: found };
    }
  }, []);

  const stop = useCallback(() => abort.current?.abort(), []);
  return { ask, stop, answer, sources, status, error };
}
