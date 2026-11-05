"use client";

import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { type AskSource, type Turn, useAsk } from "@/lib/ask-client";
import { Cited } from "./Cited";

type Message = Turn & { sources?: AskSource[]; failed?: boolean };

const STARTERS = [
  "How do SRMJEEE scholarships work?",
  "How many students do the hostels hold?",
  "What did last year's graduates get?",
  "Where do I go to start a company?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const { ask, stop, answer, sources, status, error } = useAsk();
  const input = useRef<HTMLInputElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const busy = status === "loading" || status === "streaming";

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  // Keep the newest text in view as it streams in.
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll whenever the text changes.
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages, answer]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcher.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const history: Message[] = [
      ...messages,
      { role: "user", content: question },
    ];
    setMessages(history);
    setDraft("");
    const reply = await ask(
      "chat",
      history
        .filter((m) => !m.failed)
        .map(({ role, content }) => ({ role, content })),
    );
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        content: reply.text,
        sources: reply.sources,
        failed: !reply.text,
      },
    ]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(draft);
  }

  const streaming = busy && messages.at(-1)?.role === "user";

  return (
    <>
      <button
        ref={launcher}
        type="button"
        className={`chat-launcher${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="chat-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"
            fill="currentColor"
          />
          <path
            d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"
            fill="currentColor"
          />
        </svg>
        {open ? "Close" : "Ask SRM"}
      </button>

      {open && (
        <section
          id="chat-panel"
          className="chat-panel"
          role="dialog"
          aria-labelledby={titleId}
        >
          <header className="chat-head">
            <h2 id={titleId}>Ask about SRM</h2>
            <button
              type="button"
              className="chat-close"
              aria-label="Close the assistant"
              onClick={() => {
                setOpen(false);
                launcher.current?.focus();
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div className="chat-log" ref={log} aria-live="polite">
            {messages.length === 0 && (
              <div className="chat-intro">
                <p>
                  Ask anything about admissions, scholarships, hostels, research
                  or campus life. Answers come from this site, with links to
                  where they were found.
                </p>
                <ul>
                  {STARTERS.map((s) => (
                    <li key={s}>
                      <button type="button" onClick={() => send(s)}>
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                // biome-ignore lint/suspicious/noArrayIndexKey: messages only append.
                <p key={i} className="chat-q">
                  {m.content}
                </p>
              ) : (
                // biome-ignore lint/suspicious/noArrayIndexKey: messages only append.
                <div key={i} className="chat-a">
                  {m.failed ? (
                    <p className="chat-error">
                      {error || "The assistant could not answer just now."}
                    </p>
                  ) : (
                    <p>
                      <Cited text={m.content} sources={m.sources ?? []} />
                    </p>
                  )}
                  {!!m.sources?.length && !m.failed && (
                    <SourceList sources={m.sources} text={m.content} />
                  )}
                </div>
              ),
            )}

            {streaming && (
              <div className="chat-a">
                {answer ? (
                  <p>
                    <Cited text={answer} sources={sources} />
                    <span className="chat-caret" aria-hidden="true" />
                  </p>
                ) : (
                  <p className="chat-thinking">Looking through the site</p>
                )}
              </div>
            )}
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <label htmlFor="chat-input" className="visually-hidden">
              Your question
            </label>
            <input
              ref={input}
              id="chat-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask a question"
              maxLength={500}
              autoComplete="off"
            />
            {busy ? (
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={stop}
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-gold"
                disabled={!draft.trim()}
              >
                Ask
              </button>
            )}
          </form>
          <p className="chat-note">
            AI answers can be wrong. Check fees and deadlines on srmist.edu.in.
          </p>
        </section>
      )}
    </>
  );
}

/** Only the sources the answer actually cited, in citation order. */
function SourceList({ sources, text }: { sources: AskSource[]; text: string }) {
  const cited = Array.from(
    new Set(
      (text.match(/\[(\d+)\]/g) ?? []).map((c) => Number(c.slice(1, -1))),
    ),
  )
    .map((n) => ({ n, s: sources[n - 1] }))
    .filter((x) => x.s);
  if (!cited.length) return null;
  return (
    <ol className="chat-sources">
      {cited.map(({ n, s }) => (
        <li key={n}>
          <a href={s.url}>
            <span className="cite">{n}</span>
            {s.title}
            <span className="chat-source-page">{s.page}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
