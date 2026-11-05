"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import type { Outcome } from "@/content/site";
import { useInView, useMotion, useTween } from "@/lib/motion";
import { OutcomesChart } from "./OutcomesChart";

export function OutcomesPanel({ outcomes }: { outcomes: Outcome[] }) {
  const [active, setActive] = useState(0);
  const current = outcomes[active];
  const fmt = new Intl.NumberFormat("en-IN");
  const motion = useMotion();
  const [figRef, figsInView] = useInView<HTMLDListElement>();
  const [rate, median, employers] = useTween(
    [current.placementRate, current.medianPackage, current.employers],
    { ready: figsInView, duration: 1000 },
  );

  // One gold underline that slides to the selected tab (motion only).
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(
    null,
  );
  useEffect(() => {
    if (!motion) {
      setIndicator(null);
      return;
    }
    const measure = () => {
      const tab = tabsRef.current?.querySelector<HTMLElement>(
        `#outcome-tab-${active}`,
      );
      if (tab) setIndicator({ x: tab.offsetLeft, w: tab.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, motion]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + outcomes.length) % outcomes.length;
    setActive(next);
    document.getElementById(`outcome-tab-${next}`)?.focus();
  }

  return (
    <>
      <div
        ref={tabsRef}
        className={`tabs${indicator ? " has-indicator" : ""}`}
        role="tablist"
        aria-label="College"
        onKeyDown={onKeyDown}
      >
        {outcomes.map((o, i) => (
          <button
            key={o.college}
            id={`outcome-tab-${i}`}
            type="button"
            role="tab"
            className="tab"
            aria-selected={i === active}
            aria-controls="outcome-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {o.college}
          </button>
        ))}
        {indicator && (
          <span
            className="tab-indicator"
            aria-hidden="true"
            style={{
              width: indicator.w,
              transform: `translateX(${indicator.x}px)`,
            }}
          />
        )}
      </div>

      <div
        id="outcome-panel"
        role="tabpanel"
        aria-labelledby={`outcome-tab-${active}`}
      >
        <dl className="figures" ref={figRef}>
          <div className="figure">
            <dt className="figure-label">Placement rate</dt>
            <dd>
              <span className="num">
                {Math.round(rate)}
                <span className="unit">per cent</span>
              </span>
            </dd>
          </div>
          <div className="figure">
            <dt className="figure-label">Median package</dt>
            <dd>
              <span className="num">
                {median.toFixed(1)}
                <span className="unit">lakh a year</span>
              </span>
            </dd>
          </div>
          <div className="figure">
            <dt className="figure-label">Employers who hired</dt>
            <dd>
              <span className="num">{fmt.format(Math.round(employers))}</span>
            </dd>
          </div>
        </dl>

        <div className="outcome-body">
          <OutcomesChart years={current.years} college={current.college} />
          <div className="outcome-notes">
            <p>
              The space between the two bars is not unemployment. It is mostly
              students who chose higher study, started a company or are
              preparing for the civil services, and so stopped looking for an
              offer.
            </p>
            <p>
              We do not lead with the highest package. One exceptional offer
              says nothing about your own odds; the median and the rate do.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
