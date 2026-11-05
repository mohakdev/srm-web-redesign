import Image from "next/image";
import type { ReactNode } from "react";
import { Depth } from "./Depth";

export type Stat = { value: string; label: string };
export type Entry = {
  name: string;
  description?: string;
  /** Numeral shown in gold before `meta`, e.g. "7,500" + "places". */
  num?: string;
  meta?: ReactNode;
  href?: string;
};

/** Navy page opener: title, lede, optional photo and a row of facts. */
export function PageHero({
  title,
  lede,
  facts,
  photo,
}: {
  title: string;
  lede: string;
  facts?: Stat[];
  photo?: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <section
      className={`hero page-hero${photo ? " has-photo" : ""}`}
      aria-labelledby="page-heading"
      data-depth
    >
      <Depth />
      <div className="container">
        <div className="page-hero-grid">
          <div>
            <h1 id="page-heading">{title}</h1>
            <p className="hero-lede">{lede}</p>
          </div>
          {photo && (
            <figure className="page-photo">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 960px) 100vw, 560px"
                priority
              />
            </figure>
          )}
        </div>
        {facts && <Stats items={facts} className="facts" itemClass="fact" />}
      </div>
    </section>
  );
}

export function Stats({
  items,
  className = "stats",
  itemClass = "stat",
}: {
  items: Stat[];
  className?: string;
  itemClass?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.label} className={itemClass}>
          <span className="num">{item.value}</span>
          <span className="fact-label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Rows separated by hairlines: name, description, right-aligned meta. */
export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="ruled">
      {entries.map((entry) => (
        <li key={entry.name} className="entry">
          <span className="entry-name">
            {entry.href ? (
              <a href={entry.href} className="entry-link">
                {entry.name}
              </a>
            ) : (
              entry.name
            )}
          </span>
          <span className="entry-desc">{entry.description}</span>
          <span className="entry-meta">
            {entry.num && <span className="num">{entry.num}</span>}
            {entry.num && entry.meta ? " " : null}
            {entry.meta}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Year on the left in gold Newsreader, event on the right. */
export function Timeline({
  items,
}: {
  items: { year: string; text: string }[];
}) {
  return (
    <ol className="ruled timeline">
      {items.map((item) => (
        <li key={`${item.year}-${item.text}`}>
          <span className="num">{item.year}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ol>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="sub-heading">{children}</h3>;
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose">{children}</div>;
}
