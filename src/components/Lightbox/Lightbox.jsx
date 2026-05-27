/* src/components/Lightbox/Lightbox.jsx */
import "./Lightbox.css";

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${item.name}`}
      onClick={onClose}
    >
      {/* Prev */}
      <button
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous site"
      >
        ‹
      </button>

      {/* Main content */}
      <div
        className="lightbox__inner"
        onClick={(e) => e.stopPropagation()}
      >
        <figure className="lightbox__figure" key={item.id}>
          <img
            className="lightbox__img"
            src={item.images[0]}
            alt={item.name}
          />

          <figcaption className="lightbox__meta">
            <p className="lightbox__eyebrow">
              {item.continent} · {item.yearBuilt}
            </p>
            <h2 className="lightbox__title">{item.name}</h2>
            <address className="lightbox__location">
              {item.city}, {item.country}
            </address>
            <p className="lightbox__desc">{item.shortDescription}</p>
            {item.ratings && (
              <p className="lightbox__rating">
                ★ {item.ratings.average} · {item.ratings.reviewCount.toLocaleString()} reviews
              </p>
            )}
          </figcaption>
        </figure>

        <p className="lightbox__counter">
          {index + 1} / {items.length}
        </p>
      </div>

      {/* Next */}
      <button
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next site"
      >
        ›
      </button>

      {/* Close */}
      <button
        className="lightbox__close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>
    </div>
  );
}