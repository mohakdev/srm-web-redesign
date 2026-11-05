import Image from "next/image";
import type { Photo as PhotoData } from "@/content/photos";

/**
 * A captioned photograph. Square corners, a gold hairline on top, and (with
 * motion on) a reveal that wipes upward as it scrolls into view.
 */
export function Photo({
  photo,
  sizes = "(max-width: 860px) 100vw, 640px",
  className = "",
  priority,
}: {
  photo: PhotoData;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`photo ${className}`}>
      <div className="photo-frame">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          priority={priority}
        />
      </div>
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}

/** Two or three photos side by side; the first can be made wider. */
export function Gallery({
  items,
  layout = "even",
}: {
  items: PhotoData[];
  layout?: "even" | "lead";
}) {
  return (
    <div className={`gallery gallery-${items.length} gallery-${layout}`}>
      {items.map((p) => (
        <div
          key={p.src}
          className={`gallery-item${p.width < p.height ? " is-portrait" : ""}`}
          // Grow in proportion to aspect ratio so every photo shares one height.
          style={
            { "--ar": (p.width / p.height).toFixed(3) } as React.CSSProperties
          }
        >
          <Photo photo={p} sizes="(max-width: 860px) 100vw, 560px" />
        </div>
      ))}
    </div>
  );
}
