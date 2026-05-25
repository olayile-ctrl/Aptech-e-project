/* src/components/GalleryFilter/GalleryFilter.jsx */

export default function GalleryFilter({ filters, active, onFilter }) {
  return (
    /* <nav> is correct here — this is a set of navigation controls */
    <nav
      aria-label="Gallery filters"
      style={{
        borderBottom: "1px solid var(--border-default)",
        display: "flex",
        marginBottom: "16px",
      }}
    >
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => onFilter(f.id)}
          aria-current={active === f.id ? "true" : undefined}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-caption-size)",
            letterSpacing: "0.08em",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-primary)",
            opacity: active === f.id ? 1 : 0.45,
            fontWeight: active === f.id ? 600 : 400,
            padding: "8px 0 10px",
            borderBottom: active === f.id
              ? "1.5px solid var(--text-primary)"
              : "1.5px solid transparent",
            marginRight: "28px",
            transition: "all 0.25s",
          }}
        >
          {f.label}
        </button>
      ))}
    </nav>
  );
}