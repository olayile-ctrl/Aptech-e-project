/* src/components/GalleryGrid/GalleryGrid.jsx */
import GalleryCard from "../GalleryCard/GalleryCard";

export default function GalleryGrid({ items, onOpen }) {
  /* Pair items into rows of 2 */
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push({ pair: items.slice(i, i + 2), rowIdx: Math.floor(i / 2) });
  }

  return (
    /*
     * <section> wraps the whole grid — it's a distinct thematic
     * region of the page, so section is more meaningful than a div.
     */
    <section aria-label="Heritage sites gallery">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {rows.map(({ pair, rowIdx }) => {
          /* Alternate between 2:1 and 1:2 column splits each row */
          const isEven = rowIdx % 2 === 0;
          const cols =
            pair.length === 1 ? "1fr" : isEven ? "2fr 1fr" : "1fr 2fr";
          const h = isEven
            ? "clamp(190px, 22vw, 300px)"
            : "clamp(170px, 20vw, 270px)";

          return (
            <div
              key={rowIdx}
              className="wg-grid-row"
              style={{
                display: "grid",
                gridTemplateColumns: cols,
                gap: "8px",
                height: h,
              }}
            >
              {pair.map((item) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onOpen={() => onOpen(items.indexOf(item))}
                />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}