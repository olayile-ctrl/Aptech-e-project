/* src/components/GalleryCard/GalleryCard.jsx */
import { useState } from "react";

/* Derive a short display label from the JSON data */
function getLabel(item) {
  if (item.isWorldWonder) return "WORLD WONDER";
  const naturalTags = ["nature", "mountain", "adventure", "volcanic"];
  if (item.tags?.some((t) => naturalTags.includes(t))) return "NATURAL";
  return "HISTORICAL";
}

export default function GalleryCard({ item, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const label = getLabel(item);

  return (
    /*
     * <article> is the right semantic tag here — each card is a
     * self-contained piece of content (a heritage site) that makes
     * sense on its own, like a newspaper article.
     */
    <article
      className="wg-grid-item"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        background: "var(--bg-muted)",
        height: "100%",
      }}
    >
      {/*
       * <figure> wraps media + its caption — perfect for an image card.
       * <figcaption> is the overlay text that describes the image.
       */}
      <figure style={{ margin: 0, width: "100%", height: "100%" }}>
        <img
          src={item.images[0]}
          alt={item.name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        {/* Always-visible category badge */}
        <span
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            fontFamily: "var(--font-body)",
            fontSize: "8px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: "#fff",
            background: "rgba(0,0,0,0.28)",
            backdropFilter: "blur(6px)",
            padding: "3px 8px",
          }}
        >
          {label}
        </span>

        {/* Gradient overlay with title — fades in on hover */}
        <figcaption
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)",
            padding: "18px 14px 14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            transition: "background 0.35s",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.07em",
              marginBottom: "3px",
            }}
          >
            {item.city}, {item.country}
          </p>

          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "20px",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {item.name}
          </h3>

          <button
            onClick={(e) => { e.stopPropagation(); onOpen(); }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "9px",
              letterSpacing: "0.12em",
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.5)",
              color: "#fff",
              background: "transparent",
              padding: "5px 12px",
              cursor: "pointer",
              width: "fit-content",
              marginTop: "10px",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.3s, transform 0.3s, background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}
          >
            View Chapter
          </button>
        </figcaption>
      </figure>
    </article>
  );
}