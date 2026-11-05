#!/usr/bin/env node
/**
 * Saves a text snapshot of a short list of official srmist.edu.in pages, so
 * the AI assistant can answer from them and cite them.
 *
 *   npm run refresh:srm
 *
 * Fetches only the pages listed below, one at a time with a pause between
 * requests, then writes src/content/srmist-snapshot.json. Nothing is fetched
 * when the site is built or when a visitor asks a question.
 */
import { writeFile } from "node:fs/promises";

const BASE = "https://www.srmist.edu.in";

// Key pages only: admissions, programmes and fees, scholarships, hostels.
const PAGES = [
  "/admissions/",
  "/admission-india/",
  "/admission-international/",
  "/admission-india/engineering/",
  "/admission-india/engineering/scholarships/",
  "/admission-india/medicine-health-sciences/",
  "/admission-india/management/",
  "/admission-india/science-and-humanities/",
  "/admission-india/law/",
  "/admission-india/agricultural-science/",
  "/admission-india/hotel-and-catering-management/",
  "/admission-india/phd/",
  "/srm-hostels/",
  "/srm-hostels/hostel-for-men/",
  "/srm-hostels/hostel-for-women/",
  "/srm-hostels/international-hostel/",
  "/srm-hostels/dining-eateries/",
];

const PAUSE_MS = 1500;
const CHUNK_CHARS = 700;
const OUT = new URL("../src/content/srmist-snapshot.json", import.meta.url);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  hellip: "…",
  bull: "•",
};
function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCodePoint(Number.parseInt(n, 16)),
    )
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}

const CAMPUSES = {
  KTR: "Kattankulathur",
  RMP: "Ramapuram",
  VDP: "Vadapalani",
  NCR: "Delhi NCR",
  TRP: "Tiruchirappalli",
};
const cellText = (html) =>
  decode(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
const rupees = (v) =>
  /^\d{4,}$/.test(v) ? `₹${Number(v).toLocaleString("en-IN")}` : v;

/**
 * Tables become one labelled line per row ("Campus: …; Annual Fees: …"),
 * so a fee is never separated from the programme and column it belongs to.
 */
function tablesToText(html) {
  return html.replace(/<table[\s\S]*?<\/table>/gi, (table) => {
    const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
      [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((c) =>
        cellText(c[1]),
      ),
    );
    if (!rows.length) return " ";
    const headed = /<thead/i.test(table) || /<th[\s>]/i.test(table);
    const header = headed ? rows.shift() : null;
    const lines = rows
      .filter((cells) => cells.some(Boolean))
      .map((cells) =>
        cells
          .map((v, i) => {
            if (!v) return "";
            const label = header?.[i];
            let value = label && /campus/i.test(label) ? (CAMPUSES[v] ?? v) : v;
            if (label && /fee/i.test(label)) value = rupees(value);
            return label ? `${label}: ${value}` : value;
          })
          .filter(Boolean)
          .join("; "),
      );
    return `\n${lines.join("\n")}\n`;
  });
}

/** HTML to lines of text, keeping headings marked with "#". */
function toLines(html) {
  const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "")
    .replace(/\s*[-|]\s*SRMIST\s*$/i, "")
    .trim();
  const body = tablesToText(
    html.replace(
      /<(script|style|noscript|svg|header|footer|nav|form)[^>]*>[\s\S]*?<\/\1>/gi,
      " ",
    ),
  )
    .replace(/<br\s*\/?>|<\/(p|div|li|tr|section|h[1-6]|td|th)>/gi, "\n")
    .replace(/<h([1-6])[^>]*>/gi, "\n# ")
    .replace(/<[^>]+>/g, " ");
  const lines = decode(body)
    .split("\n")
    .map((l) =>
      l
        .replace(/[ \t ]+/g, " ")
        .replace(/^(\s*\|\s*)+/, "")
        .trim(),
    )
    .filter((l) => l && l !== "#");
  return { title, lines };
}

/** Group lines under their headings into passages of roughly CHUNK_CHARS. */
function toChunks(lines) {
  const chunks = [];
  let heading = "";
  let buf = [];
  const flush = () => {
    const text = buf.join(" ").replace(/\s+/g, " ").trim();
    if (text.length > 25) chunks.push({ heading, text });
    buf = [];
  };
  for (const line of lines) {
    if (line.startsWith("# ")) {
      flush();
      heading = line.slice(2).trim();
      continue;
    }
    // A labelled table row ("Campus: …; Annual Fees: …") is a passage of its own.
    if (/^[^:;]{2,40}: [^;]+;/.test(line)) {
      flush();
      buf.push(line);
      flush();
      continue;
    }
    buf.push(line);
    if (buf.join(" ").length > CHUNK_CHARS) flush();
  }
  flush();
  return chunks;
}

const fetched = [];
for (const [i, path] of PAGES.entries()) {
  if (i) await sleep(PAUSE_MS);
  const url = BASE + path;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; srm-web-redesign snapshot; manual refresh)",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { title, lines } = toLines(await res.text());
    fetched.push({ url, title, lines });
    console.log(`ok   ${path}  (${lines.length} lines)`);
  } catch (e) {
    console.log(`skip ${path}  (${e.message})`);
  }
}

// Menus and footers repeat on every page; drop lines found on most pages.
const counts = new Map();
for (const p of fetched)
  for (const l of new Set(p.lines)) counts.set(l, (counts.get(l) ?? 0) + 1);
const boilerplate = (l) =>
  fetched.length > 3 && (counts.get(l) ?? 0) >= fetched.length * 0.6;

const pages = fetched
  .map((p) => ({
    url: p.url,
    title: p.title,
    chunks: toChunks(p.lines.filter((l) => !boilerplate(l))),
  }))
  .filter((p) => p.chunks.length);

await writeFile(
  OUT,
  `${JSON.stringify({ fetchedAt: new Date().toISOString(), pages }, null, 2)}\n`,
);
const total = pages.reduce((n, p) => n + p.chunks.length, 0);
console.log(
  `\nSaved ${pages.length} of ${PAGES.length} pages, ${total} passages, to src/content/srmist-snapshot.json`,
);
