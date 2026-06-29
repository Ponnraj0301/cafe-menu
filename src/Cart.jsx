import { useEffect, useRef } from "react";

/**
 * Cart — floating cart system
 * Props:
 *   items        : array of { ...item, qty }
 *   isOpen       : bool
 *   onOpen       : fn
 *   onClose      : fn
 *   onIncrement  : fn(id)
 *   onDecrement  : fn(id)
 *   onRemove     : fn(id)
 *   onClear      : fn
 *   totalCount   : number
 *   totalPrice   : number
 */
export default function Cart({
  items,
  isOpen,
  onOpen,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
  totalCount,
  totalPrice,
}) {
  const panelRef = useRef(null);

  /* Trap focus inside panel when open */
  useEffect(() => {
    if (!isOpen) return;
    const el = panelRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    const handler = e => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
    };
    el.addEventListener("keydown", handler);
    first?.focus();
    return () => el.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* Prevent body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const tax  = +(totalPrice * 0.05).toFixed(2);
  const delivery = totalPrice > 0 ? (totalPrice >= 299 ? 0 : 40) : 0;
  const grand = +(totalPrice + tax + delivery).toFixed(2);

  return (
    <>
      {/* FAB trigger */}
      <button
        className="cart-fab"
        onClick={onOpen}
        aria-label={`Open cart, ${totalCount} item${totalCount !== 1 ? "s" : ""}`}
        aria-expanded={isOpen}
      >
        🛒
        {totalCount > 0 && (
          <span className="cart-badge" aria-hidden key={totalCount}>
            {totalCount > 99 ? "99+" : totalCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      <div
        className={`cart-overlay${isOpen ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <section
        ref={panelRef}
        className={`cart-panel${isOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
      >
        {/* Mobile drag handle */}
        <div className="cart-handle" aria-hidden="true" />

        {/* Header */}
        <div className="cart-header">
          <div>
            <h2 className="cart-title">Your Order</h2>
            {totalCount > 0 && (
              <p className="cart-count">{totalCount} item{totalCount !== 1 ? "s" : ""}</p>
            )}
          </div>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {/* Items */}
        <div className="cart-items" role="list">
          {items.length === 0 ? (
            <div className="cart-empty" role="status">
              <span className="cart-empty-icon">☕</span>
              <p>Your cart is empty.<br />Add something delicious!</p>
            </div>
          ) : (
            items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onIncrement={() => onIncrement(item.id)}
                onDecrement={() => onDecrement(item.id)}
                onRemove={() => onRemove(item.id)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotals">
              <div className="cart-row">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="cart-row">
                <span>GST (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="cart-row">
                <span>Delivery{delivery === 0 ? " 🎉" : ""}</span>
                <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
              </div>
              {delivery > 0 && (
                <div className="cart-row" style={{ fontSize: 11, color: "var(--caramel)", marginTop: 2 }}>
                  <span>Add ₹{299 - totalPrice} more for free delivery</span>
                </div>
              )}
              <div className="cart-row total">
                <span>Total</span>
                <span>₹{grand.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="cart-checkout"
              onClick={() => alert(`Order placed! Total: ₹${grand.toFixed(2)}\n\nThis is a demo checkout. Connect a payment gateway for production.`)}
              aria-label={`Place order for ₹${grand.toFixed(2)}`}
            >
              Place Order · ₹{grand.toFixed(2)}
            </button>

            <button className="cart-clear" onClick={onClear} aria-label="Clear cart">
              Clear cart
            </button>
          </div>
        )}
      </section>
    </>
  );
}

/* ── Cart Item Row ── */
function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="ci-row" role="listitem">
      <img
        src={item.image_url || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&q=70"}
        alt={item.name}
        className="ci-img"
        onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&q=70"; }}
      />
      <div className="ci-info">
        <p className="ci-name" title={item.name}>{item.name}</p>
        <p className="ci-unit-price">₹{item.price} each</p>
        <div className="ci-controls">
          <button
            className="ci-qty-btn"
            onClick={onDecrement}
            aria-label={`Decrease ${item.name} quantity`}
          >−</button>
          <span className="ci-qty" aria-label={`Quantity: ${item.qty}`}>{item.qty}</span>
          <button
            className="ci-qty-btn"
            onClick={onIncrement}
            aria-label={`Increase ${item.name} quantity`}
          >+</button>
        </div>
      </div>
      <span className="ci-line-total" aria-label={`Total: ₹${(item.price * item.qty).toFixed(2)}`}>
        ₹{(item.price * item.qty).toFixed(2)}
      </span>
      <button className="ci-remove" onClick={onRemove} aria-label={`Remove ${item.name}`} title="Remove">
        🗑
      </button>
    </div>
  );
}
