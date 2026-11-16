"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CART_KEY, itemKey, MAX_QUANTITY, parseCart, type CartItem } from "./store";
type CartContextValue = {
  items: CartItem[]; ready: boolean; storageNotice: string; count: number;
  add: (item: Omit<CartItem, "quantity">) => void;
  update: (key: string, quantity: number) => void; remove: (key: string) => void;
};
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState("");
  useEffect(() => {
    const hydrate = () => {
      try { setItems(parseCart(localStorage.getItem(CART_KEY))); }
      catch { setStorageNotice("Your browser cannot save this bag. It will last for this visit only."); }
      setReady(true);
    };
    hydrate();
    const sync = (event: StorageEvent) => { if (event.key === CART_KEY || event.key === null) setItems(parseCart(event.newValue)); };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const commit = useCallback((change: (current: CartItem[]) => CartItem[]) => {
    setItems(current => {
      const next = change(current);
      try { localStorage.setItem(CART_KEY, JSON.stringify(next)); }
      catch { queueMicrotask(() => setStorageNotice("Your browser cannot save this bag. It will last for this visit only.")); }
      return next;
    });
  }, []);
  const add = (item: Omit<CartItem, "quantity">) => commit(current => {
    const key = itemKey(item);
    return current.some(row => itemKey(row) === key) ? current.map(row => itemKey(row) === key ? { ...row, quantity: Math.min(row.quantity + 1, MAX_QUANTITY) } : row) : [...current, { ...item, quantity: 1 }];
  });
  const remove = (key: string) => commit(current => current.filter(row => itemKey(row) !== key));
  const update = (key: string, quantity: number) => commit(current => current.map(row => itemKey(row) === key ? { ...row, quantity: Math.max(1, Math.min(MAX_QUANTITY, Math.trunc(quantity))) } : row));
  return <CartContext.Provider value={{ items, ready, storageNotice, count: items.reduce((sum, row) => sum + row.quantity, 0), add, remove, update }}>{children}</CartContext.Provider>;
}
export function useCart() { const value = useContext(CartContext); if (!value) throw new Error("CartProvider is required"); return value; }
