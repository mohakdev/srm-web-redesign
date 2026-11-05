"use client";

import { useState } from "react";
import type { YearOutcome } from "@/content/site";
import { useInView, useTween } from "@/lib/motion";

const W = 560;
const H = 300;
const PAD = { top: 26, right: 0, bottom: 34, left: 52 };

/** Round a tick step to 1, 2, 2.5 or 5 times a power of ten. */
function niceStep(raw: number) {
  const mag = 10 ** Math.floor(Math.log10(raw));
  const f = raw / mag;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * mag;
}

/**
 * Grouped bars: students who took an offer against students eligible and
 * looking. With motion on, bars grow from the baseline when the chart comes
 * into view and morph between colleges; without it they simply render.
 */
export function OutcomesChart({
  years,
  college,
}: {
  years: YearOutcome[];
  college: string;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const [hover, setHover] = useState<number | null>(null);

  const peak = Math.max(...years.map((d) => d.eligible));
  const step = niceStep(peak / 4);
  const max = Math.ceil(peak / step) * step;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const groupW = innerW / years.length;
  const barW = Math.min(26, groupW * 0.3);
  const gap = 4;
  const base = PAD.top + innerH;
  const y = (v: number) => base - (v / max) * innerH;
  const ticks = Array.from({ length: max / step + 1 }, (_, i) => i * step);
  const fmt = new Intl.NumberFormat("en-IN");

  // Tween heights as a share of the axis so bars glide even when the scale changes.
  const ratios = useTween(
    years.flatMap((d) => [d.eligible / max, d.placed / max]),
    { ready: inView, duration: 900, stagger: 45 },
  );

  return (
    <figure className="chart" ref={ref}>
      <ul className="chart-legend">
        <li>
          <span className="swatch swatch-placed" aria-hidden="true" />
          Took an offer
        </li>
        <li>
          <span className="swatch swatch-eligible" aria-hidden="true" />
          Eligible and looking
        </li>
      </ul>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby="chart-title chart-desc"
        onPointerLeave={() => setHover(null)}
      >
        <title id="chart-title">{`Placement outcomes, ${college}, by graduating year`}</title>
        <desc id="chart-desc">
          {years
            .map(
              (d) =>
                `${d.year}: ${fmt.format(d.placed)} of ${fmt.format(d.eligible)} took an offer`,
            )
            .join("; ")}
        </desc>
        <g className="ticks" key={max}>
          {ticks.map((t) => (
            <g key={t}>
              <line
                className="grid-line"
                x1={PAD.left}
                x2={W}
                y1={y(t)}
                y2={y(t)}
              />
              <text
                className="axis-num"
                x={PAD.left - 12}
                y={y(t)}
                dy="0.35em"
                textAnchor="end"
              >
                {fmt.format(t)}
              </text>
            </g>
          ))}
        </g>
        {years.map((d, i) => {
          const cx = PAD.left + groupW * i + groupW / 2;
          const he = (ratios[i * 2] ?? 0) * innerH;
          const hp = (ratios[i * 2 + 1] ?? 0) * innerH;
          const active = hover === i;
          const dim = hover !== null && !active;
          return (
            <g
              key={d.year}
              className={`bar-group${active ? " is-active" : ""}${dim ? " is-dim" : ""}`}
              onPointerEnter={() => setHover(i)}
            >
              <rect
                className="bar-hit"
                x={cx - groupW / 2}
                y={PAD.top}
                width={groupW}
                height={innerH}
              />
              <rect
                className="bar-eligible"
                x={cx - barW - gap / 2}
                y={base - he}
                width={barW}
                height={Math.max(0, he)}
                rx={2}
              />
              <rect
                className="bar-placed"
                x={cx + gap / 2}
                y={base - hp}
                width={barW}
                height={Math.max(0, hp)}
                rx={2}
              />
              {active && (
                <text
                  className="bar-value"
                  x={cx}
                  y={base - he - 10}
                  textAnchor="middle"
                >
                  {`${fmt.format(d.placed)} of ${fmt.format(d.eligible)}`}
                </text>
              )}
              <text className="axis-num" x={cx} y={H - 8} textAnchor="middle">
                {d.year}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
