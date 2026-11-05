import {
  type ChatTurn,
  findSources,
  groqConfigured,
  LIMITS,
  streamAnswer,
} from "@/lib/ai";

/**
 * POST /api/ask  { mode: "chat" | "search", messages: ChatTurn[] }
 * Streams a plain-text answer. The sources used are sent first, in the
 * `X-Sources` header, so the page can list them while the answer arrives.
 */

// Best-effort per-visitor limit. On serverless each instance keeps its own
// count, so this slows abuse rather than stopping it outright.
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS = 20;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

function clean(
  body: unknown,
): { mode: "chat" | "search"; turns: ChatTurn[] } | null {
  if (!body || typeof body !== "object") return null;
  const { mode, messages } = body as { mode?: unknown; messages?: unknown };
  if (mode !== "chat" && mode !== "search") return null;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const turns = messages
    .slice(-LIMITS.turns)
    .filter(
      (m): m is ChatTurn =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, LIMITS.messageChars * 2),
    }));
  const last = turns.at(-1);
  if (
    !last ||
    last.role !== "user" ||
    last.content.length > LIMITS.messageChars
  )
    return null;
  return { mode, turns };
}

export async function POST(request: Request) {
  // Only this site's own pages may call the endpoint.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!groqConfigured()) {
    console.error(
      "[ask] GROQ_API_KEY is not set; add it to .env.local or the Vercel project.",
    );
    return Response.json(
      { error: "The assistant is not available right now." },
      { status: 503 },
    );
  }
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many questions at once. Try again in a few minutes." },
      { status: 429 },
    );
  }

  const input = clean(await request.json().catch(() => null));
  if (!input) {
    return Response.json(
      { error: `Questions can be up to ${LIMITS.messageChars} characters.` },
      { status: 400 },
    );
  }

  const sources = findSources(input.turns);
  try {
    const stream = await streamAnswer(input.mode, input.turns, sources);
    const list = sources.map((s) => ({
      title: s.title,
      url: s.url,
      page: s.page,
    }));
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Sources": encodeURIComponent(JSON.stringify(list)),
      },
    });
  } catch (error) {
    console.error("[ask]", error);
    return Response.json(
      { error: "The assistant could not answer just now." },
      { status: 502 },
    );
  }
}
