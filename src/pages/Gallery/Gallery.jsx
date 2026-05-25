/* src/pages/Gallery/Gallery.jsx */
import { useState, useEffect, useCallback } from "react";

import Header    from "../../components/Header/Header";
import Footer    from "../../components/Footer/Footer";

/* ── Our new split-out gallery components ── */
import GalleryHero   from "../../components/GalleryHero/GalleryHero";
import GalleryFilter from "../../components/GalleryFilter/GalleryFilter";
import GalleryGrid   from "../../components/GalleryGrid/GalleryGrid";
import Lightbox      from "../../components/Lightbox/Lightbox";

/* ── Real data from the JSON your team provided ── */
import worldwonder from "../../data/worldwonder.json";

/* ─── Filter definitions ─────────────────────────────────────
   We filter by "zone" (north / east / south Africa) because
   every item in the JSON has that field and it makes geographic sense.
   ─────────────────────────────────────────────────────────── */
const FILTERS = [
  { id: "all",   label: "All Works"    },
  { id: "north", label: "North Africa" },
  { id: "east",  label: "East Africa"  },
  { id: "south", label: "South Africa" },
];

/* ─── Gallery-specific CSS ───────────────────────────────────
   We inject this once into <head> so it's available to all
   child components via className. We use CSS variables from
   global.css / the design token file your team set up.
   ─────────────────────────────────────────────────────────── */
const GALLERY_CSS = `
  @keyframes wg-slide-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes wg-lb-in  { from { opacity: 0; }               to { opacity: 1; } }
  @keyframes wg-img-in { from { opacity: 0; transform: scale(0.95); }
                         to   { opacity: 1; transform: scale(1);    } }

  /* Staggered fade-in for each grid card */
  .wg-grid-item { opacity: 0; animation: wg-slide-in 0.5s ease forwards; }
  .wg-grid-item:nth-child(1) { animation-delay: 0.00s; }
  .wg-grid-item:nth-child(2) { animation-delay: 0.06s; }
  .wg-grid-item:nth-child(3) { animation-delay: 0.12s; }
  .wg-grid-item:nth-child(4) { animation-delay: 0.18s; }
  .wg-grid-item:nth-child(5) { animation-delay: 0.24s; }
  .wg-grid-item:nth-child(6) { animation-delay: 0.30s; }

  /* On mobile, collapse the alternating grid to a single column */
  @media (max-width: 700px) {
    .wg-grid-row { grid-template-columns: 1fr !important; height: auto !important; }
    .wg-grid-row .wg-grid-item { height: 210px; }
  }
`;

/* ─── Main Gallery page ──────────────────────────────────────── */
export const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [gridKey,      setGridKey]      = useState(0);
  const [lightbox,     setLightbox]     = useState(null); // index | null

  /* Inject gallery CSS once on mount, clean up on unmount */
  useEffect(() => {
    const id = "gallery-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = GALLERY_CSS;
      document.head.appendChild(tag);
    }
    return () => document.getElementById(id)?.remove();
  }, []);

  /* Lock body scroll when lightbox is open */
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  /* Filter the JSON data by zone */
  const filtered =
    activeFilter === "all"
      ? worldwonder
      : worldwonder.filter((item) => item.zone === activeFilter);

  const handleFilter = (id) => {
    setActiveFilter(id);
    setGridKey((k) => k + 1); // remount grid so the fade-in animation replays
    setLightbox(null);
  };

  /* Lightbox controls */
  const openLb  = useCallback((idx) => setLightbox(idx), []);
  const closeLb = useCallback(() => setLightbox(null), []);
  const prevLb  = useCallback(
    () => setLightbox((i) => (i - 1 + filtered.length) % filtered.length),
    [filtered.length]
  );
  const nextLb  = useCallback(
    () => setLightbox((i) => (i + 1) % filtered.length),
    [filtered.length]
  );

  /* Keyboard navigation for lightbox */
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape")     closeLb();
      if (e.key === "ArrowLeft")  prevLb();
      if (e.key === "ArrowRight") nextLb();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLb, prevLb, nextLb]);

  return (
    <>
      <Header />

      {/*
       * <main> is correct here — this is the primary content of the page.
       * There should only ever be ONE <main> per page.
       */}
      <main style={{ background: "var(--bg-page)", minHeight: "100vh", color: "var(--text-primary)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>

          {/* Hero — title + subtitle */}
          <GalleryHero />

          {/* Filter tabs */}
          <GalleryFilter
            filters={FILTERS}
            active={activeFilter}
            onFilter={handleFilter}
          />

          {/*
           * key={gridKey} forces GalleryGrid to fully remount
           * every time the filter changes, which re-triggers the
           * staggered CSS animation on each card.
           */}
          <GalleryGrid
            key={gridKey}
            items={filtered}
            onOpen={openLb}
          />

          {/* "Preserve the Legacy" call-to-action */}
          <section
            aria-label="Call to action"
            style={{
              background: "var(--color-primary-900)",
              color: "var(--text-inverse)",
              padding: "58px 40px",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(26px, 4vw, 38px)",
                fontWeight: 300,
                marginBottom: "14px",
                letterSpacing: "0.01em",
              }}
            >
              Preserve the Legacy
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-small-size)",
                opacity: 0.62,
                lineHeight: 1.9,
                maxWidth: "360px",
                margin: "0 auto",
                fontWeight: 300,
              }}
            >
              Our global community of historians and explorers document and
              celebrate the architectural triumphs of civilization.
            </p>
          </section>
        </div>
      </main>

      <Footer />

      {/* Lightbox — rendered outside <main> so it can overlay everything */}
      {lightbox !== null && (
        <Lightbox
          items={filtered}
          index={lightbox}
          onClose={closeLb}
          onPrev={prevLb}
          onNext={nextLb}
        />
      )}
    </>
  );
};