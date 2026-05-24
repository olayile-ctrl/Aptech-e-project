import { useState, useEffect, useCallback } from "react";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

/* ─── Data ──────────────────────────────────────────────────── */
const LANDMARKS = [
  {
    id: 1,
    title: "Taj Mahal",
    location: "Agra, India",
    category: "ancient",
    label: "ANCIENT",
    year: "1643 AD",
    img: "src/assets/TAJ_MAHAL.png",
    desc: "A symbol of eternal love, this ivory-white marble mausoleum stands as one of humanity's greatest architectural wonders.",
  },
  {
    id: 2,
    title: "Burj Khalifa",
    location: "Dubai, UAE",
    category: "modern",
    label: "MODERN",
    year: "2010 AD",
    img: "src/assets/BURJ_KHALIFA.png",
    desc: "At 828 metres, the world's tallest structure is a dazzling feat of modern engineering rising from the Arabian desert.",
  },
  {
    id: 3,
    title: "Yosemite Valley",
    location: "California, USA",
    category: "natural",
    label: "NATURAL",
    year: "Timeless",
    img: "src/assets/YOSEMITE_VALLEY.png",
    desc: "Carved by ancient glaciers, Yosemite's soaring granite walls and thundering waterfalls are nature's own cathedral.",
  },
  {
    id: 4,
    title: "The Parthenon",
    location: "Athens, Greece",
    category: "ancient",
    label: "ANCIENT",
    year: "438 BC",
    img: "src/assets/THE_PARTHENON.png",
    desc: "The crowning achievement of ancient Greek civilisation stands atop the sacred Acropolis — a temple to wisdom and democracy.",
  },
  {
    id: 5,
    title: "Eiffel Tower",
    location: "Paris, France",
    category: "modern",
    label: "MODERN",
    year: "1889 AD",
    img: "src/assets/EFFIEL_TOWER.png",
    desc: "Originally built as a temporary structure, Gustave Eiffel's iron lattice tower became the eternal icon of Paris.",
  },
  {
    id: 6,
    title: "The Great Wall",
    location: "China",
    category: "ancient",
    label: "ANCIENT",
    year: "7th c. BC",
    img: "src/assets/GREAT_WALL_CHINA.png",
    desc: "Stretching over 21 000 kilometres through mountains and desert, this extraordinary fortification defines human ambition.",
  },
];

const FILTERS = [
  { id: "all",     label: "All Works" },
  { id: "ancient", label: "Ancient"   },
  { id: "modern",  label: "Modern"    },
  { id: "natural", label: "Natural"   },
];

/* ─── Styles ────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap');

  .wg-page { font-family:'Jost',sans-serif; background:#F5F0E8; min-height:100vh; color:#1C1C1C; }

  .wg-filter-bar { border-bottom:1px solid rgba(0,0,0,.1); display:flex; }
  .wg-filter-tab { font-family:'Jost',sans-serif; font-size:11px; letter-spacing:.08em; background:none; border:none; cursor:pointer; color:#1C1C1C; opacity:.45; padding:8px 0 10px; border-bottom:1.5px solid transparent; margin-right:28px; transition:all .25s; }
  .wg-filter-tab:hover { opacity:.75; }
  .wg-filter-tab.active { opacity:1; border-bottom-color:#1C1C1C; font-weight:600; }

  .wg-card { overflow:hidden; cursor:pointer; position:relative; background:#E0DBD3; height:100%; }
  .wg-card img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .75s cubic-bezier(.25,.46,.45,.94); }
  .wg-card:hover img { transform:scale(1.06); }
  .wg-card-label { position:absolute; top:10px; left:10px; font-family:'Jost',sans-serif; font-size:8px; font-weight:600; letter-spacing:.14em; color:#fff; background:rgba(0,0,0,.28); backdrop-filter:blur(6px); padding:3px 8px; }
  .wg-card-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.08) 55%, transparent 100%); padding:18px 14px 14px; display:flex; flex-direction:column; justify-content:flex-end; transition:background .35s; }
  .wg-card:hover .wg-card-overlay { background:linear-gradient(to top, rgba(0,0,0,.82) 0%, rgba(0,0,0,.18) 55%, transparent 100%); }
  .wg-card-loc { font-family:'Jost',sans-serif; font-size:10px; color:rgba(255,255,255,.6); letter-spacing:.07em; margin-bottom:3px; }
  .wg-card-title { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:300; color:#fff; line-height:1.2; }
  .wg-card-btn { font-family:'Jost',sans-serif; font-size:9px; letter-spacing:.12em; font-weight:500; border:1px solid rgba(255,255,255,.5); color:#fff; background:transparent; padding:5px 12px; cursor:pointer; width:fit-content; margin-top:10px; opacity:0; transform:translateY(6px); transition:opacity .3s, transform .3s, background .2s, color .2s; }
  .wg-card:hover .wg-card-btn { opacity:1; transform:translateY(0); }
  .wg-card-btn:hover { background:#fff; color:#1C1C1C; border-color:#fff; }

  @keyframes wg-slide-in { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  .wg-grid-item { opacity:0; animation:wg-slide-in .5s ease forwards; }
  .wg-grid-item:nth-child(1) { animation-delay:.00s; }
  .wg-grid-item:nth-child(2) { animation-delay:.06s; }
  .wg-grid-item:nth-child(3) { animation-delay:.12s; }
  .wg-grid-item:nth-child(4) { animation-delay:.18s; }
  .wg-grid-item:nth-child(5) { animation-delay:.24s; }
  .wg-grid-item:nth-child(6) { animation-delay:.30s; }

  @keyframes wg-lb-in  { from{opacity:0;} to{opacity:1;} }
  @keyframes wg-img-in { from{opacity:0;transform:scale(.95);} to{opacity:1;transform:scale(1);} }
  .wg-lb { position:fixed; inset:0; background:rgba(10,10,10,.97); z-index:9999; display:flex; align-items:center; justify-content:center; animation:wg-lb-in .25s ease; }
  .wg-lb-inner { display:flex; flex-direction:column; align-items:center; max-width:90vw; padding:20px; }
  .wg-lb-img { display:block; max-width:75vw; max-height:62vh; object-fit:contain; animation:wg-img-in .3s ease; }
  .wg-lb-meta { color:#fff; text-align:center; margin-top:22px; }
  .wg-lb-eyebrow { font-family:'Jost',sans-serif; font-size:9px; letter-spacing:.18em; opacity:.4; margin-bottom:8px; }
  .wg-lb-name { font-family:'Cormorant Garamond',serif; font-size:clamp(22px,3vw,34px); font-weight:300; }
  .wg-lb-loc { font-family:'Jost',sans-serif; font-size:12px; opacity:.4; letter-spacing:.07em; margin-top:4px; }
  .wg-lb-desc { font-family:'Jost',sans-serif; font-size:12px; opacity:.55; margin-top:14px; max-width:460px; line-height:1.85; font-weight:300; }
  .wg-lb-counter { font-family:'Jost',sans-serif; color:rgba(255,255,255,.25); font-size:10px; margin-top:20px; letter-spacing:.12em; }
  .wg-lb-nav { position:absolute; top:50%; transform:translateY(-50%); width:46px; height:46px; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.12); color:#fff; font-size:22px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .2s; backdrop-filter:blur(4px); }
  .wg-lb-nav:hover { background:rgba(255,255,255,.16); }
  .wg-lb-nav.prev { left:16px; }
  .wg-lb-nav.next { right:16px; }
  .wg-lb-close { position:absolute; top:18px; right:18px; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.12); color:#fff; width:34px; height:34px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; transition:background .2s; }
  .wg-lb-close:hover { background:rgba(255,255,255,.16); }

  .wg-cta { background:#253447; color:#fff; padding:58px 40px; text-align:center; margin-top:12px; }
  .wg-cta h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(26px,4vw,38px); font-weight:300; margin-bottom:14px; letter-spacing:.01em; }
  .wg-cta p { font-family:'Jost',sans-serif; font-size:12px; opacity:.62; line-height:1.9; max-width:360px; margin:0 auto; font-weight:300; }

  @media (max-width:700px) {
    .wg-main { padding:28px 16px 60px !important; }
    .wg-cta { padding:44px 20px; }
    .wg-grid-row { grid-template-columns:1fr !important; height:auto !important; }
    .wg-grid-row .wg-grid-item { height:210px; }
    .wg-lb-img { max-width:92vw; max-height:52vh; }
    .wg-lb-nav.prev { left:6px; }
    .wg-lb-nav.next { right:6px; }
  }
  @media (max-width:480px) {
    .wg-lb-desc { display:none; }
  }
`;

/* ─── Sub-components ────────────────────────────────────────── */

function ImageCard({ item, onOpen }) {
  return (
    <div className="wg-card wg-grid-item" onClick={onOpen}>
      <img src={item.img} alt={item.title} loading="lazy" />
      <div className="wg-card-label">{item.label}</div>
      <div className="wg-card-overlay">
        <div className="wg-card-loc">{item.location}</div>
        <div className="wg-card-title">{item.title}</div>
        <button
          className="wg-card-btn"
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
        >
          View Chapter
        </button>
      </div>
    </div>
  );
}

function GalleryGrid({ items, onOpen }) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push({ pair: items.slice(i, i + 2), rowIdx: Math.floor(i / 2) });
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {rows.map(({ pair, rowIdx }) => {
        const isEven = rowIdx % 2 === 0;
        const cols   = pair.length === 1 ? "1fr" : isEven ? "2fr 1fr" : "1fr 2fr";
        const h      = isEven ? "clamp(190px,22vw,300px)" : "clamp(170px,20vw,270px)";
        return (
          <div
            key={rowIdx}
            className="wg-grid-row"
            style={{ display: "grid", gridTemplateColumns: cols, gap: "8px", height: h }}
          >
            {pair.map((item) => (
              <ImageCard
                key={item.id}
                item={item}
                onOpen={() => onOpen(items.indexOf(item))}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];
  return (
    <div className="wg-lb" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image lightbox">
      <button className="wg-lb-nav prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">‹</button>
      <div className="wg-lb-inner" onClick={(e) => e.stopPropagation()}>
        <img key={item.id} className="wg-lb-img" src={item.img} alt={item.title} />
        <div className="wg-lb-meta">
          <div className="wg-lb-eyebrow">{item.label} · {item.year}</div>
          <div className="wg-lb-name">{item.title}</div>
          <div className="wg-lb-loc">{item.location}</div>
          <p className="wg-lb-desc">{item.desc}</p>
        </div>
        <div className="wg-lb-counter">{index + 1} / {items.length}</div>
      </div>
      <button className="wg-lb-nav next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">›</button>
      <button className="wg-lb-close" onClick={onClose} aria-label="Close">✕</button>
    </div>
  );
}

/* ─── ✅ FIXED: named export matching App.jsx's import { Gallery } ── */
export const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [gridKey, setGridKey]           = useState(0);
  const [lightbox, setLightbox]         = useState(null);

  useEffect(() => {
    const id = "wg-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = CSS;
      document.head.appendChild(tag);
    }
    return () => document.getElementById(id)?.remove();
  }, []);

  const filtered =
    activeFilter === "all"
      ? LANDMARKS
      : LANDMARKS.filter((l) => l.category === activeFilter);

  const handleFilter = (f) => {
    setActiveFilter(f);
    setGridKey((k) => k + 1);
    setLightbox(null);
  };

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

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <Header />

      <div className="wg-page">
        <main className="wg-main" style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>

          <div style={{ marginBottom: "30px" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px, 6vw, 58px)", fontWeight: 300, lineHeight: 1.05, marginBottom: "14px", letterSpacing: "-0.01em" }}>
              World Gallery
            </h1>
            <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.75, maxWidth: "430px", fontWeight: 300 }}>
              A curated collection of humanity's greatest achievements, from the dawn
              of civilization to the wonders of the modern era.
            </p>
          </div>

          <div className="wg-filter-bar" style={{ marginBottom: "16px" }}>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`wg-filter-tab${activeFilter === f.id ? " active" : ""}`}
                onClick={() => handleFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <GalleryGrid key={gridKey} items={filtered} onOpen={openLb} />

          <div className="wg-cta">
            <h2>Preserve the Legacy</h2>
            <p>
              Our global community of historians and explorers document and celebrate
              the architectural triumphs of civilization.
            </p>
          </div>
        </main>
      </div>

      <Footer />

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