import type { ReactNode } from "react";
import { Depth } from "./Depth";

type Surface = "white" | "mist" | "navy" | "blue";

type SectionProps = {
  id: string;
  surface: Surface;
  noteTitle: string;
  note: string;
  heading: string;
  children?: ReactNode;
  className?: string;
};

/** A content section: sticky margin note on the left, main content right. */
export function Section({
  id,
  surface,
  noteTitle,
  note,
  heading,
  children,
  className = "",
}: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`section on-${surface} ${className}`}
      data-depth={surface === "navy" || surface === "blue" ? "" : undefined}
    >
      {(surface === "navy" || surface === "blue") && <Depth tone={surface} />}
      <div className="container section-grid">
        <aside className="margin-note">
          <strong>{noteTitle}</strong>
          {note}
        </aside>
        <div>
          <span className="section-rule" aria-hidden="true" />
          <h2 id={headingId}>{heading}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}
