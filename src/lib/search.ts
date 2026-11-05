import type { SearchDoc } from "@/content/search-index";

/** Lowercase, drop dots, hyphens and apostrophes so "B.Tech" finds "btech". */
export function normalise(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.\-'’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const SYNONYMS: Record<string, string[]> = {
  fee: ["scholarship", "tuition"],
  fees: ["scholarship", "tuition"],
  accommodation: ["hostel"],
  hostel: ["accommodation"],
  placement: ["career", "offers"],
  placements: ["career", "offers"],
  job: ["placement", "career"],
  jobs: ["placement", "career"],
  bus: ["transport"],
  doctorate: ["phd"],
  startup: ["incubation", "entrepreneurship"],
  startups: ["incubation", "entrepreneurship"],
  ranking: ["nirf"],
  rankings: ["nirf"],
  engineering: ["btech"],
  graduate: ["placements", "offers"],
  graduates: ["placements", "offers"],
  salary: ["ctc", "placements"],
  package: ["ctc", "placements"],
  packages: ["ctc", "placements"],
  ctc: ["placements"],
  recruiters: ["placements", "companies"],
  company: ["startup", "incubation"],
};

const KIND_WEIGHT: Record<SearchDoc["kind"], number> = {
  Page: 6,
  Section: 4,
  Programme: 2,
  Department: 1,
  Research: 1,
  Campus: 1,
  Club: 0,
  Innovation: 1,
  About: 1,
  Recruiter: 0,
  Disclosure: 1,
};

type Prepared = SearchDoc & { nTitle: string; nText: string };

export function prepare(docs: SearchDoc[]): Prepared[] {
  return docs.map((d) => ({
    ...d,
    nTitle: ` ${normalise(d.title)} `,
    nText: ` ${normalise(`${d.text} ${d.page}`)} `,
  }));
}

function scoreToken(doc: Prepared, token: string) {
  let best = 0;
  if (doc.nTitle.includes(` ${token} `)) best = 10;
  else if (doc.nTitle.includes(` ${token}`)) best = 9;
  else if (doc.nTitle.includes(token)) best = 4;
  if (!best) {
    if (doc.nText.includes(` ${token}`)) best = 3;
    else if (token.length > 3 && doc.nText.includes(token)) best = 1;
  }
  return best;
}

/** Every word must match, directly or through a synonym. */
export function search(docs: Prepared[], query: string, limit = 40) {
  const q = normalise(query);
  if (!q) return [];
  const tokens = q.split(" ");
  const results: { doc: Prepared; score: number }[] = [];
  for (const doc of docs) {
    let score = 0;
    let ok = true;
    for (const t of tokens) {
      let s = scoreToken(doc, t);
      if (!s)
        for (const alt of SYNONYMS[t] ?? [])
          s = Math.max(s, scoreToken(doc, alt) * 0.7);
      if (!s) {
        ok = false;
        break;
      }
      score += s;
    }
    if (!ok) continue;
    if (doc.nTitle.includes(` ${q} `)) score += 12;
    score += KIND_WEIGHT[doc.kind];
    results.push({ doc, score });
  }
  // Drop exact duplicates (same title and destination).
  const seen = new Set<string>();
  return results
    .sort((a, b) => b.score - a.score)
    .filter(({ doc }) => {
      const k = `${doc.title}|${doc.url}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, limit)
    .map((r) => r.doc);
}

/** Split text into plain and matched parts for highlighting. */
export function highlight(text: string, query: string) {
  const words = normalise(query)
    .split(" ")
    .filter((w) => w.length > 1);
  if (!words.length) return [{ text, hit: false }];
  const esc = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${esc.join("|")})`, "gi");
  return text
    .split(re)
    .filter(Boolean)
    .map((part) => ({ text: part, hit: words.includes(part.toLowerCase()) }));
}

const STOPWORDS = new Set(
  "a an and are as at be by can do does for from how i in is it me my of on or so tell that the there this to was what when where which who why will with you your about any much many give list".split(
    " ",
  ),
);

/**
 * Looser ranking for the AI: drops filler words and scores partial matches,
 * so a question like "what is the bus fee" still finds the transport section.
 */
export function retrieve(docs: Prepared[], query: string, k = 10) {
  const tokens = normalise(query)
    .split(" ")
    .filter((t) => t && !STOPWORDS.has(t));
  if (!tokens.length) return [];
  const scored = docs
    .map((doc) => {
      let score = 0;
      let hits = 0;
      for (const t of tokens) {
        let s = scoreToken(doc, t);
        if (!s)
          for (const alt of SYNONYMS[t] ?? [])
            s = Math.max(s, scoreToken(doc, alt) * 0.7);
        if (s) hits++;
        score += s;
      }
      return {
        doc,
        score:
          score * (hits / tokens.length) +
          (hits ? KIND_WEIGHT[doc.kind] * 0.3 : 0),
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  return scored
    .filter(({ doc }) => {
      const key = `${doc.title}|${doc.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, k)
    .map((r) => r.doc);
}
