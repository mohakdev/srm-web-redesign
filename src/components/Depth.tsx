/**
 * Layered background for navy and blue grounds: drifting colour fields and a
 * fine dot grid that move at different speeds as you scroll. Hidden entirely
 * unless motion is on, so the static site keeps its flat gradient.
 */
export function Depth({ tone = "navy" }: { tone?: "navy" | "blue" }) {
  return (
    <div className={`depth depth-${tone}`} aria-hidden="true">
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="orb orb-c" />
      <span className="dots" />
    </div>
  );
}
