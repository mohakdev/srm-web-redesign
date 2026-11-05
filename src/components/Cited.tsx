import type { AskSource } from "@/lib/ask-client";

/** Renders answer text, turning [n] citations into links to that source. */
export function Cited({
  text,
  sources,
}: {
  text: string;
  sources: AskSource[];
}) {
  const parts = text.split(/(\[\d+\](?:\s*\[\d+\])*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const nums = part.match(/\d+/g);
        if (!/^\[\d+\]/.test(part) || !nums) {
          // biome-ignore lint/suspicious/noArrayIndexKey: parts are positional.
          return <span key={i}>{part}</span>;
        }
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: parts are positional.
          <span key={i} className="cite-group">
            {nums.map((n) => {
              const s = sources[Number(n) - 1];
              return s ? (
                <a key={n} className="cite" href={s.url} title={s.title}>
                  {n}
                </a>
              ) : null;
            })}
          </span>
        );
      })}
    </>
  );
}
