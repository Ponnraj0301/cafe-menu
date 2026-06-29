import { useState, useMemo, useCallback, useEffect } from "react";
import MenuCard from "./MenuCard.jsx";
import Cart from "./Cart.jsx";
import "./DigitalMenu.css";

/* ─────────────────────────────────────────────────────────────
   MENU DATA
   Drop your real data source here (API, CMS, Supabase, etc.)
   Shape: { id, name, category, description, price, image_url,
            type ("veg"|"nonveg"), badge, available }
───────────────────────────────────────────────────────────── */
const menuItems = [
  {
    id: 1, name: "Espresso Classico", category: "Coffee",
    description: "Bold single-origin espresso pulled at 9 bar. Earthy, bright, with a golden crema that lingers.",
    price: 120, type: "veg", badge: "Bestseller", available: true,
    image_url: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&q=80",
  },
  {
    id: 2, name: "Oat Milk Latte", category: "Coffee",
    description: "Velvety steamed oat milk swirled through a double ristretto. Naturally sweet, zero dairy.",
    price: 185, type: "veg", badge: "New", available: true,
    image_url: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80",
  },
  {
    id: 3, name: "Cold Brew Tonic", category: "Coffee",
    description: "18-hour cold-steeped brew, topped with sparkling tonic. A bracing citrus-bitter finish.",
    price: 210, type: "veg", badge: "Hot", available: true,
    image_url: "https://images.unsplash.com/photo-1545696968-1a5245650b36?w=500&q=80",
  },
  {
    id: 4, name: "Caramel Macchiato", category: "Coffee",
    description: "Warm steamed milk marked with espresso shots and a drizzle of house caramel sauce.",
    price: 195, type: "veg", badge: null, available: true,
    image_url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80",
  },
  {
    id: 5, name: "Affogato al Caffè", category: "Coffee",
    description: "A scoop of vanilla gelato drowned in a hot espresso shot. Italy in a cup.",
    price: 220, type: "veg", badge: "Bestseller", available: false,
    image_url: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&q=80",
  },
  {
    id: 6, name: "Matcha Ceremonial Latte", category: "Tea & More",
    description: "First-flush ceremonial-grade matcha whisked smooth with steamed almond milk.",
    price: 210, type: "veg", badge: "New", available: true,
    image_url: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&q=80",
  },
  {
    id: 7, name: "Masala Chai", category: "Tea & More",
    description: "Hand-ground spices — cardamom, ginger, clove — simmered with Assam CTC and whole milk.",
    price: 90, type: "veg", badge: "Bestseller", available: true,
    image_url: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=500&q=80",
  },
  {
    id: 8, name: "Hibiscus Iced Tea", category: "Tea & More",
    description: "Dried hibiscus flowers steeped cold with a hint of rose water and a citrus wedge.",
    price: 150, type: "veg", badge: null, available: true,
    image_url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
  },
  {
    id: 9, name: "Avocado Toast", category: "All-Day Bites",
    description: "Smashed Hass avocado on sourdough with chilli flakes, micro herbs, and a lemon squeeze.",
    price: 260, type: "veg", badge: "Bestseller", available: true,
    image_url: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=500&q=80",
  },
  {
    id: 10, name: "Grilled Chicken Panini", category: "All-Day Bites",
    description: "Herb-marinated chicken breast, melted provolone, sun-dried tomatoes in a pressed focaccia.",
    price: 310, type: "nonveg", badge: "Hot", available: true,
    image_url: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&q=80",
  },
  {
    id: 11, name: "Mushroom Bruschetta", category: "All-Day Bites",
    description: "Sautéed wild mushrooms, thyme, truffle oil on ciabatta toasts. Earthy and light.",
    price: 230, type: "veg", badge: null, available: true,
    image_url: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&q=80",
  },
  {
    id: 12, name: "Croissant au Beurre", category: "Bakery",
    description: "Laminated with French AOP butter, 72-hour fermented dough. Shatteringly crisp outside.",
    price: 145, type: "veg", badge: "Bestseller", available: true,
    image_url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80",
  },
  {
    id: 13, name: "Blueberry Cheesecake", category: "Bakery",
    description: "New York–style cream cheese filling on a graham cracker crust, topped with blueberry compote.",
    price: 195, type: "veg", badge: "New", available: true,
    image_url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80",
  },
  {
    id: 14, name: "Dark Chocolate Tart", category: "Bakery",
    description: "70% Valrhona ganache in a buttery pâte sablée. Finished with sea-salt flakes.",
    price: 175, type: "veg", badge: null, available: false,
    image_url: "https://images.unsplash.com/photo-1473662150720-c94ab68bc0c7?w=500&q=80",
  },
  {
    id: 15, name: "Seasonal Smoothie Bowl", category: "Healthy",
    description: "Blended acai and mango base, topped with granola, banana, chia seeds, and coconut flakes.",
    price: 290, type: "veg", badge: "Hot", available: true,
    image_url: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&q=80",
  },
  {
    id: 16, name: "Green Detox Juice", category: "Healthy",
    description: "Cold-pressed spinach, cucumber, apple, ginger, and lemon. Bright, alive, no preservatives.",
    price: 180, type: "veg", badge: "New", available: true,
    image_url: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500&q=80",
  },
];

/* ─────────────────────────────────────────────────────────────
   HELPER — derive unique categories in insertion order
───────────────────────────────────────────────────────────── */
function deriveCategories(items) {
  const seen = new Set();
  const cats = ["All"];
  items.forEach(({ category }) => {
    if (!seen.has(category)) { seen.add(category); cats.push(category); }
  });
  return cats;
}

/* ─────────────────────────────────────────────────────────────
   CART HELPERS
───────────────────────────────────────────────────────────── */
function addToCart(prev, item) {
  const existing = prev.find(ci => ci.id === item.id);
  if (existing) return prev.map(ci => ci.id === item.id ? { ...ci, qty: ci.qty + 1 } : ci);
  return [...prev, { ...item, qty: 1 }];
}
function incrementQty(prev, id) {
  return prev.map(ci => ci.id === id ? { ...ci, qty: ci.qty + 1 } : ci);
}
function decrementQty(prev, id) {
  return prev
    .map(ci => ci.id === id ? { ...ci, qty: ci.qty - 1 } : ci)
    .filter(ci => ci.qty > 0);
}

/* ─────────────────────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────────────────────── */
export default function DigitalMenu() {
  const [search,        setSearch]        = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartItems,     setCartItems]     = useState([]);
  const [cartOpen,      setCartOpen]      = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState(new Set());

  const categories = useMemo(() => deriveCategories(menuItems), []);

  /* Filtered items */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return menuItems.filter(item => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      const matchSearch = !q || item.name.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  /* Group filtered by category for section labels */
  const grouped = useMemo(() => {
    if (activeCategory !== "All" || search.trim()) return null; // flat in search/filter mode
    const map = new Map();
    filtered.forEach(item => {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category).push(item);
    });
    return map;
  }, [filtered, activeCategory, search]);

  /* Cart actions */
  const handleAddToCart = useCallback((item) => {
    setCartItems(prev => addToCart(prev, item));
    setRecentlyAdded(prev => new Set(prev).add(item.id));
    setTimeout(() => setRecentlyAdded(prev => {
      const next = new Set(prev); next.delete(item.id); return next;
    }), 600);
  }, []);

  const handleIncrement = useCallback((id) => setCartItems(prev => incrementQty(prev, id)), []);
  const handleDecrement = useCallback((id) => setCartItems(prev => decrementQty(prev, id)), []);
  const handleRemove    = useCallback((id) => setCartItems(prev => prev.filter(ci => ci.id !== id)), []);
  const handleClear     = useCallback(() => setCartItems([]), []);

  const totalCount = cartItems.reduce((s, ci) => s + ci.qty, 0);
  const totalPrice = cartItems.reduce((s, ci) => s + ci.price * ci.qty, 0);

  /* Reset category when searching */
  useEffect(() => { if (search.trim()) setActiveCategory("All"); }, [search]);

  /* Render grid (flat or grouped) */
  const renderGrid = (items) => (
    <div className="dm-grid">
      {items.map(item => (
        <MenuCard
          key={item.id}
          item={item}
          onAddToCart={handleAddToCart}
          added={recentlyAdded.has(item.id)}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* ── Header ── */}
      <header className="dm-header">
        <p className="dm-header-logo">☕ Café Brûlée</p>
        <h1 className="dm-header-title">Our Menu</h1>
        <p className="dm-header-sub">Crafted with love · Fresh every day</p>
      </header>

      {/* ── Search ── */}
      <div className="dm-search-wrap">
        <span className="dm-search-icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          className="dm-search"
          placeholder="Search for coffee, food, desserts…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search menu"
        />
        {search && (
          <button
            className="dm-search-clear"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >✕</button>
        )}
      </div>

      {/* ── Category Bar ── */}
      <nav className="dm-category-wrap" aria-label="Menu categories">
        <div className="dm-category-bar" role="list">
          {categories.map(cat => (
            <button
              key={cat}
              role="listitem"
              className={`dm-cat-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => { setActiveCategory(cat); setSearch(""); }}
              aria-pressed={activeCategory === cat}
              aria-label={`Filter by ${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="dm-layout" id="main-content">
        {filtered.length === 0 ? (
          <div className="dm-empty" role="status" aria-live="polite">
            <span className="dm-empty-icon">🍃</span>
            <h3>Nothing found</h3>
            <p>
              We couldn't find "{search}" in our menu.
              Try a different word or browse by category.
            </p>
          </div>
        ) : grouped ? (
          /* Grouped by category (default view) */
          Array.from(grouped.entries()).map(([cat, items]) => (
            <section key={cat} aria-labelledby={`section-${cat}`}>
              <h2 className="dm-section-label" id={`section-${cat}`}>{cat}</h2>
              {renderGrid(items)}
            </section>
          ))
        ) : (
          /* Flat grid for search / single-category filter */
          <section aria-label={activeCategory === "All" ? "Search results" : activeCategory}>
            {activeCategory !== "All" && (
              <h2 className="dm-section-label">{activeCategory}</h2>
            )}
            {renderGrid(filtered)}
          </section>
        )}
      </main>

      {/* ── Cart ── */}
      <Cart
        items={cartItems}
        isOpen={cartOpen}
        onOpen={() => setCartOpen(true)}
        onClose={() => setCartOpen(false)}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
        onClear={handleClear}
        totalCount={totalCount}
        totalPrice={totalPrice}
      />
    </>
  );
}
