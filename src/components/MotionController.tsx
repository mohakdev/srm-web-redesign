"use client";

import { useEffect } from "react";
import { easeOutExpo } from "@/lib/motion";

/**
 * Elements that rise into place as they scroll into view. The CSS hides them
 * only while <html> has the `motion` class, so the static site is untouched.
 * Keep this list in sync with the reveal block in globals.css.
 */
const REVEAL = [
  ".margin-note",
  ".section-rule",
  ".section h2",
  ".section-lede",
  ".prose",
  ".sub-heading",
  ".ruled",
  ".ruled > li",
  ".stats",
  ".stats > li",
  ".tag-index",
  ".tag-index > li",
  ".data-table",
  ".data-table tbody tr",
  ".club-index",
  ".club-group",
  ".tabs",
  ".figures",
  ".chart",
  ".outcome-notes",
  ".source",
  ".actions",
  ".contact",
  ".marquee-band",
  ".footer-grid > *",
  ".footer-base",
  ".search-results > li",
  ".photo",
].join(",");

/** Numbers that count up from zero when they appear. */
const COUNT = [
  ".facts .num",
  ".stats .num",
  ".entry-meta .num",
  ".college-count .num",
  ".club-group-head .num",
  ".marquee-head .num",
].join(",");

const NUMERIC = /^(\d{1,3}(?:,\d{2,3})*|\d+)(\.\d+)?/;

function countUp(el: Element) {
  const node = el.firstChild;
  if (!node || node.nodeType !== Node.TEXT_NODE) return;
  const text = node.nodeValue ?? "";
  const match = text.match(NUMERIC);
  if (!match) return;
  const [whole, intPart, decPart = ""] = match;
  const target = Number(whole.replace(/,/g, ""));
  // Years and other identifiers read wrong when they count; leave them be.
  if (!intPart.includes(",") && !decPart && target >= 1900 && target <= 2100)
    return;
  if (target === 0) return;
  const rest = text.slice(whole.length);
  const decimals = decPart ? decPart.length - 1 : 0;
  const fmt = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: intPart.includes(","),
  });
  const duration = Math.min(1800, 900 + Math.log10(target + 1) * 260);
  const t0 = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    node.nodeValue = fmt.format(target * easeOutExpo(t)) + rest;
    if (t < 1) requestAnimationFrame(step);
    else node.nodeValue = text;
  };
  requestAnimationFrame(step);
}

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;
    root.classList.add("motion-live");

    // Turn motion off live if the visitor switches on reduced motion.
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const onPref = () => {
      if (mq.matches) root.classList.remove("motion", "motion-live");
    };
    mq.addEventListener("change", onPref);

    // Everything below writes to the DOM, so it waits until React has
    // finished hydrating the page; otherwise React sees attributes it did
    // not render. Reveal state lives in `data-in`, which React never writes,
    // so later re-renders of client components cannot undo it.
    let stop = () => {};
    let cancelled = false;
    const begin = () => {
      if (cancelled) return;
      stop = start();
    };
    const idle = () => {
      if (typeof window.requestIdleCallback === "function")
        window.requestIdleCallback(begin, { timeout: 600 });
      else setTimeout(begin, 150);
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", idle);
      mq.removeEventListener("change", onPref);
      stop();
    };
  }, []);

  return null;
}

function start() {
  const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        el.setAttribute("data-in", "");
        io.unobserve(el);
        for (const n of el.matches(COUNT) ? [el] : el.querySelectorAll(COUNT)) {
          if (!(n as HTMLElement).dataset.counted) {
            (n as HTMLElement).dataset.counted = "1";
            countUp(n);
          }
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  for (const el of targets) io.observe(el);

  // Hero facts sit in the first screen; count them once the intro settles.
  const heroTimer = window.setTimeout(() => {
    for (const n of document.querySelectorAll<HTMLElement>(
      ".hero .facts .num",
    )) {
      if (!n.dataset.counted) {
        n.dataset.counted = "1";
        countUp(n);
      }
    }
  }, 200);

  // Results and other late arrivals: observe anything new that matches.
  const mo = new MutationObserver((records) => {
    for (const r of records) {
      for (const node of r.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        const found = node.matches(REVEAL) ? [node] : [];
        found.push(...node.querySelectorAll<HTMLElement>(REVEAL));
        for (const el of found) io.observe(el);
      }
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Depth: scroll parallax and pointer drift on navy grounds.
  const heroes = Array.from(
    document.querySelectorAll<HTMLElement>("[data-depth]"),
  );
  const finePointer = matchMedia("(pointer: fine)").matches;
  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const vh = window.innerHeight;
      for (const h of heroes) {
        const rect = h.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) continue;
        const p = Math.min(
          1,
          Math.max(-1, -rect.top / Math.max(rect.height, 1)),
        );
        h.style.setProperty("--scroll", p.toFixed(4));
      }
    });
  };
  const onPointer = (e: PointerEvent) => {
    const target = (e.currentTarget as HTMLElement) ?? null;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    target.style.setProperty("--mx", x.toFixed(3));
    target.style.setProperty("--my", y.toFixed(3));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (finePointer)
    for (const h of heroes) h.addEventListener("pointermove", onPointer);

  return () => {
    io.disconnect();
    mo.disconnect();
    window.clearTimeout(heroTimer);
    window.removeEventListener("scroll", onScroll);
    for (const h of heroes) h.removeEventListener("pointermove", onPointer);
    cancelAnimationFrame(raf);
  };
}
