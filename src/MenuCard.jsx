import { useEffect, useRef, useState } from "react";

/**
 * MenuCard — purely presentational
 * Props: item (object), onAddToCart (fn), added (bool)
 */
export default function MenuCard({ item, onAddToCart, added }) {
  const cardRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [popKey, setPopKey] = useState(0);

  /* Scroll-reveal via IntersectionObserver */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Pop animation on add */
  useEffect(() => {
    if (added) setPopKey(k => k + 1);
  }, [added]);

  const handleAdd = () => {
    if (!item.available) return;
    onAddToCart(item);
  };

  const badgeClass = {
    Bestseller: "mc-badge-bestseller",
    New:        "mc-badge-new",
    Hot:        "mc-badge-hot",
    Veg:        "mc-badge-veg",
  }[item.badge] || "";

  return (
    <article
      ref={cardRef}
      className={`mc-card${revealed ? " revealed" : ""}${!item.available ? " unavailable" : ""}`}
      aria-label={item.name}
    >
      {/* Image */}
      <div className="mc-image-wrap">
        <img
          src={item.image_url || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80"}
          alt={item.name}
          className="mc-image"
          loading="lazy"
          onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80"; }}
        />

        {/* Sold-out */}
        {!item.available && (
          <div className="mc-soldout-overlay" aria-label="Sold Out">
            <span className="mc-soldout-label">Sold Out</span>
          </div>
        )}

        {/* Badge */}
        {item.badge && (
          <span className={`mc-badge ${badgeClass}`} aria-label={`Badge: ${item.badge}`}>
            {item.badge}
          </span>
        )}

        {/* Veg / Non-veg dot */}
        {item.type && (
          <span
            className={`mc-type-dot ${item.type === "veg" ? "veg" : "nonveg"}`}
            title={item.type === "veg" ? "Vegetarian" : "Non-Vegetarian"}
            aria-label={item.type === "veg" ? "Vegetarian" : "Non-Vegetarian"}
          >
            <span />
          </span>
        )}
      </div>

      {/* Body */}
      <div className="mc-body">
        <h3 className="mc-name">{item.name}</h3>
        {item.description && (
          <p className="mc-desc">{item.description}</p>
        )}

        <div className="mc-footer">
          <span className="mc-price" aria-label={`Price: ₹${item.price}`}>
            <span className="mc-price-symbol">₹</span>
            {item.price}
          </span>

          <button
            className="mc-add-btn"
            onClick={handleAdd}
            disabled={!item.available}
            aria-label={item.available ? `Add ${item.name} to cart` : "Unavailable"}
          >
            {item.available ? (
              <>
                <span key={popKey} className="btn-pop" aria-hidden>+</span>
                Add
              </>
            ) : (
              "Unavailable"
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
