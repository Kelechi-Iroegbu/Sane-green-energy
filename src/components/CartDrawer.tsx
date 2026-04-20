import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, clear } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-border/50 bg-card shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-border/50 px-6 py-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">// Your cart</span>
                <h2 className="font-display text-lg font-bold">
                  {items.length} item{items.length !== 1 && "s"}
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-md p-2 text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground/40" />
                  <p className="font-display text-lg font-semibold">Your cart is empty</p>
                  <p className="mt-1 text-sm text-muted-foreground">Add products to see them here.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((i) => (
                    <li key={i.id} className="flex gap-4 rounded-lg border border-border/50 bg-background p-3">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-secondary/30">
                        <img src={i.img} alt={i.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-sm font-semibold leading-snug line-clamp-2">{i.name}</h3>
                          <button
                            onClick={() => removeItem(i.id)}
                            aria-label="Remove"
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="inline-flex items-center rounded-md border border-border/50">
                            <button
                              onClick={() => updateQty(i.id, i.qty - 1)}
                              aria-label="Decrease"
                              className="px-2 py-1 text-muted-foreground hover:text-primary"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 font-mono text-xs">{i.qty}</span>
                            <button
                              onClick={() => updateQty(i.id, i.qty + 1)}
                              aria-label="Increase"
                              className="px-2 py-1 text-muted-foreground hover:text-primary"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-display text-sm font-bold text-primary">
                            ${(i.price * i.qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-border/50 px-6 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Subtotal</span>
                  <span className="font-display text-2xl font-bold text-primary">${subtotal.toLocaleString()}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Shipping & taxes calculated at checkout.</p>
                <button className="mt-4 w-full rounded-md bg-primary py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground shadow-glow-sm hover:shadow-glow">
                  Checkout
                </button>
                <button
                  onClick={clear}
                  className="mt-2 w-full rounded-md py-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-destructive"
                >
                  Clear cart
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
