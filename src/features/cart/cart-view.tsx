"use client";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useCart } from "./provider";
import { itemKey, MAX_QUANTITY } from "./store";
import { demoProducts } from "@/data/catalogue";
import { ProductImage } from "@/components/product/product-image";
import { formatPrice } from "@/lib/format";
export function CartView() {
  const { items, ready, remove, update, storageNotice } = useCart();
  if (!ready) return <p role="status" className="loading-state">Opening your bag…</p>;
  if (!items.length) return <div className="empty-state"><p className="eyebrow">Room for a new perspective</p><h2>Your bag is empty.</h2><p>Discover the first collection and make it your own.</p><Link href="/shop" className="button button-dark">Explore the collection <ArrowRight size={17} /></Link></div>;
  const subtotal = items.reduce((sum, row) => sum + (demoProducts.find(p => p.id === row.productId)?.price ?? 0) * row.quantity, 0);
  return <><p className="preview-note">Preview bag — these pieces are not available to purchase. Quantities do not represent inventory.</p>{storageNotice && <p role="status">{storageNotice}</p>}<div className="cart-layout"><div className="cart-items">{items.map(row => {
    const product = demoProducts.find(p => p.id === row.productId)!;
    const colour = product.colours.find(c => c.name === row.colour)!;
    const key = itemKey(row);
    return <article className="cart-item" key={key}><Link href={`/products/${product.slug}`} className="cart-item-image" aria-label={product.name}><ProductImage image={colour.images[0]} sizes="160px" /></Link><div className="cart-item-content"><p className="eyebrow">Collection 001</p><Link href={`/products/${product.slug}`}><h2>{product.name}</h2></Link><p>{row.colour} / {row.size}</p><div className="quantity-controls"><button aria-label={`Decrease quantity of ${product.name}`} disabled={row.quantity === 1} onClick={() => update(key, row.quantity - 1)}><Minus size={13} /></button><span aria-label="Quantity">{row.quantity}</span><button aria-label={`Increase quantity of ${product.name}`} disabled={row.quantity >= MAX_QUANTITY} onClick={() => update(key, row.quantity + 1)}><Plus size={13} /></button></div><button className="remove-item underlined" aria-label={`Remove ${product.name}`} onClick={() => remove(key)}>Remove</button></div><span className="cart-price">{formatPrice(product.price * row.quantity)} AUD</span></article>;
  })}</div><aside className="cart-summary"><p className="eyebrow">Your selection</p><h2>Order summary</h2><div className="subtotal"><span>Preview subtotal</span><span>{formatPrice(subtotal)} AUD</span></div><p>Shipping and taxes are not calculated in this preview.</p><button className="button button-dark" disabled aria-describedby="checkout-note">Checkout coming soon <ArrowRight size={17} /></button><p id="checkout-note">Purchases are unavailable until the collection is released. No payment or order is created.</p><Link href="/shop" className="text-link">Continue exploring <ArrowRight size={16} /></Link></aside></div></>;
}
