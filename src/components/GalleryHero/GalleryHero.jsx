/* src/components/GalleryHero/GalleryHero.jsx */

export default function GalleryHero() {
  return (
    <section style={{ marginBottom: "32px" }}>
      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(38px, 6vw, 58px)",
          fontWeight: 300,
          lineHeight: 1.05,
          marginBottom: "14px",
          letterSpacing: "-0.01em",
          color: "var(--text-primary)",
        }}
      >
        World Gallery
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-body-size)",
          lineHeight: "var(--text-body-line-height)",
          color: "var(--text-muted)",
          maxWidth: "430px",
          fontWeight: 300,
        }}
      >
        A curated collection of humanity's greatest achievements, from the dawn
        of civilization to the wonders of the modern era.
      </p>
    </section>
  );
}