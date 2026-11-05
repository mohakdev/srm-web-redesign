"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Depth } from "@/components/Depth";
import { searchIndex, suggestions } from "@/content/search-index";
import { highlight, prepare, search } from "@/lib/search";
import { AiAnswer } from "./AiAnswer";

const docs = prepare(searchIndex);

const KIND_LABEL: Record<string, string> = {
  Section: "section",
  Programme: "programme",
  Department: "department",
  Research: "research",
  Campus: "facility",
  Club: "club",
  Innovation: "innovation",
  About: "record",
  Recruiter: "recruiter",
};

function Marked({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlight(text, query).map((p, i) =>
        p.hit ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: parts are positional.
          <mark key={i}>{p.text}</mark>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: parts are positional.
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}

export function SearchApp() {
  const params = useSearchParams();
  const [query, setQuery] = useState(() => params.get("q") ?? "");
  // The AI answer follows submitted searches only, not every keystroke.
  const [asked, setAsked] = useState(() => (params.get("q") ?? "").trim());
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => search(docs, query), [query]);
  const trimmed = query.trim();

  // Keep the address shareable without reloading the page on every keystroke.
  useEffect(() => {
    const url = trimmed
      ? `/search?q=${encodeURIComponent(trimmed)}`
      : "/search";
    window.history.replaceState(null, "", url);
  }, [trimmed]);

  // Press "/" anywhere to jump to the field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== input.current) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <SearchHero
        query={query}
        onChange={setQuery}
        onSubmit={() => setAsked(query.trim())}
        inputRef={input}
        autoFocus={!trimmed}
      />
      <section className="section on-white search-section" aria-live="polite">
        <div className="container section-grid">
          <aside className="margin-note">
            <strong>Searching this site</strong>
            Results cover programmes, scholarships, research, campus life and
            the statutory disclosures. Press the slash key to search from
            anywhere on this page.
          </aside>
          <div>
            {asked && asked === trimmed && <AiAnswer query={asked} />}
            {trimmed ? (
              <p className="search-count">
                <span className="num">{results.length}</span>{" "}
                {results.length === 1 ? "result" : "results"} for{" "}
                <q>{trimmed}</q>
              </p>
            ) : (
              <p className="search-count">Try one of these.</p>
            )}

            {trimmed && results.length > 0 && (
              <ol className="ruled search-results" key={trimmed}>
                {results.map((r) => (
                  <li key={`${r.title}|${r.url}`}>
                    <a className="result" href={r.url}>
                      <span className="result-title">
                        <Marked text={r.title} query={trimmed} />
                      </span>
                      <span className="result-text">
                        <Marked text={r.text} query={trimmed} />
                      </span>
                      <span className="result-where">
                        {r.page}
                        {KIND_LABEL[r.kind] ? `, ${KIND_LABEL[r.kind]}` : ""}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            )}

            {trimmed && results.length === 0 && (
              <p className="search-empty">
                Nothing on the site matches that. Check the spelling, use fewer
                words, or start from one of these.
              </p>
            )}

            {(!trimmed || results.length === 0) && (
              <ul className="suggestions">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      className="text-link suggestion"
                      onClick={() => {
                        setQuery(s);
                        setAsked(s);
                        input.current?.focus();
                      }}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export function SearchHero({
  query,
  onChange,
  inputRef,
  autoFocus,
  onSubmit,
}: {
  query: string;
  onChange?: (q: string) => void;
  onSubmit?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  autoFocus?: boolean;
}) {
  return (
    <section
      className="hero page-hero search-hero"
      aria-labelledby="page-heading"
      data-depth
    >
      <Depth />
      <div className="container">
        <h1 id="page-heading">Search</h1>
        <search>
          <form
            className="search"
            action="/search"
            method="get"
            onSubmit={(e) => {
              if (onChange) {
                e.preventDefault();
                onSubmit?.();
              }
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.75"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <path
                d="M15.5 15.5L20.5 20.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
            <label htmlFor="search-page-input" className="visually-hidden">
              Search programmes, people and pages
            </label>
            <input
              ref={inputRef}
              id="search-page-input"
              name="q"
              type="search"
              placeholder="Search programmes, fees, people"
              autoComplete="off"
              // biome-ignore lint/a11y/noAutofocus: the page exists to be typed into.
              autoFocus={autoFocus}
              value={onChange ? query : undefined}
              defaultValue={onChange ? undefined : query}
              onChange={(e) => onChange?.(e.target.value)}
            />
            <button type="submit" className="btn btn-gold">
              Search
            </button>
          </form>
        </search>
      </div>
    </section>
  );
}
