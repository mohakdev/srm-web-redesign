"use client";

import { useEffect, useRef, useState } from "react";

/** True once the motion controller has confirmed this visitor gets animation. */
export function motionOn() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("motion")
  );
}

/** Re-renders when motion is switched on or off (e.g. the OS setting changes). */
export function useMotion() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setOn(el.classList.contains("motion"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return on;
}

export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

/**
 * Tweens an array of numbers towards `target`. Until `ready` is true the
 * values rest at zero (when motion is on), so a chart can grow in once it
 * scrolls into view. Without motion it returns `target` unchanged.
 */
export function useTween(
  target: number[],
  {
    ready,
    duration = 900,
    stagger = 0,
  }: { ready: boolean; duration?: number; stagger?: number },
) {
  const motion = useMotion();
  const [values, setValues] = useState(target);
  const current = useRef(target);
  const started = useRef(false);
  const key = target.join(",");

  // biome-ignore lint/correctness/useExhaustiveDependencies: `key` stands in for `target`.
  useEffect(() => {
    if (!motion) {
      current.current = target;
      setValues(target);
      return;
    }
    if (!ready) {
      if (!started.current) {
        current.current = target.map(() => 0);
        setValues(current.current);
      }
      return;
    }
    started.current = true;
    const from =
      current.current.length === target.length
        ? current.current
        : target.map(() => 0);
    const t0 = performance.now();
    let raf = 0;
    const total = duration + stagger * target.length;
    const step = (now: number) => {
      const next = target.map((to, i) => {
        const local = Math.min(
          1,
          Math.max(0, (now - t0 - i * stagger) / duration),
        );
        return from[i] + (to - from[i]) * easeInOutCubic(local);
      });
      current.current = next;
      setValues(next);
      if (now - t0 < total) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [key, ready, motion, duration, stagger]);

  return values;
}

/** Becomes true the first time the element is a quarter visible. */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen] as const;
}
