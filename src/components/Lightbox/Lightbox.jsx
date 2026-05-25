/* src/components/Lightbox/Lightbox.jsx */

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  return (
    /*
     * role="dialog" + aria-modal tells screen readers this is a modal.
     * aria-label gives it an accessible name.
     * Clicking the dark backdrop (the outer div) closes the lightbox.
     */
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${item.name}`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,10,10,0.97)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "wg-lb-in 0.25s ease",
      }}
    >
      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous site"
        style={{
          position: "absolute", top: "50%", left: "16px",
          transform: "translateY(-50%)",
          width: "46px", height: "46px",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff", fontSize: "22px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", backdropFilter: "blur(4px)",
        }}
      >
        ‹
      </button>

      {/* Main content — stopPropagation so clicking here doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", maxWidth: "90vw", padding: "20px",
          animation: "wg-img-in 0.3s ease",
        }}
      >
        {/*
         * <figure> + <figcaption> is semantically correct for
         * an image with descriptive text below it.
         */}
        <figure style={{ margin: 0 }}>
          <img
            key={item.id}
            src={item.images[0]}
            alt={item.name}
            style={{
              display: "block",
              maxWidth: "75vw",
              maxHeight: "62vh",
              objectFit: "contain",
            }}
          />

          <figcaption style={{ color: "#fff", textAlign: "center", marginTop: "22px" }}>
            {/* Eyebrow line */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                letterSpacing: "0.18em",
                opacity: 0.4,
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              {item.continent} · {item.yearBuilt}
            </p>

            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(22px, 3vw, 34px)",
                fontWeight: 300,
              }}
            >
              {item.name}
            </h2>

            {/* Location */}
            <address
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                opacity: 0.4,
                letterSpacing: "0.07em",
                marginTop: "4px",
                fontStyle: "normal",
              }}
            >
              {item.city}, {item.country}
            </address>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                opacity: 0.55,
                marginTop: "14px",
                maxWidth: "460px",
                lineHeight: 1.85,
                fontWeight: 300,
              }}
            >
              {item.shortDescription}
            </p>

            {/* Rating */}
            {item.ratings && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", opacity: 0.4, marginTop: "10px" }}>
                ★ {item.ratings.average} · {item.ratings.reviewCount.toLocaleString()} reviews
              </p>
            )}
          </figcaption>
        </figure>

        {/* Counter */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.25)",
            fontSize: "10px",
            marginTop: "20px",
            letterSpacing: "0.12em",
          }}
        >
          {index + 1} / {items.length}
        </p>
      </div>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next site"
        style={{
          position: "absolute", top: "50%", right: "16px",
          transform: "translateY(-50%)",
          width: "46px", height: "46px",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff", fontSize: "22px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", backdropFilter: "blur(4px)",
        }}
      >
        ›
      </button>

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: "absolute", top: "18px", right: "18px",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff", width: "34px", height: "34px",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px",
        }}
      >
        ✕
      </button>
    </div>
  );
}