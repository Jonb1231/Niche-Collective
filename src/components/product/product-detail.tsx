"use client";
import { useState } from "react";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { ArrowRight, Check, X } from "lucide-react";
import type { Product, Size } from "@/types/catalogue";
import { ProductImage } from "./product-image";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/features/cart/provider";
import { shortsMeasurements } from "@/data/catalogue";
import { itemKey, MAX_QUANTITY } from "@/features/cart/store";
export function ProductDetail({ product }: { product: Product }) {
  const [colourIndex, setColourIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState<Size | "">("");
  const [message, setMessage] = useState("");
  const { add, items, ready } = useCart();
  const colour = product.colours[colourIndex];
  const atLimit = !!size && items.some(row => itemKey(row) === itemKey({ productId: product.id, colour: colour.name, size }) && row.quantity >= MAX_QUANTITY);
  return <div className="product-detail"><div className="product-gallery"><div className="gallery-main"><ProductImage image={colour.images[imageIndex]} sizes="(max-width: 768px) 100vw, 55vw" preload /><span className="gallery-caption">Design preview / {String(imageIndex + 1).padStart(2, "0")}</span></div>{colour.images.length > 1 && <div className="gallery-thumbs">{colour.images.map((image, index) => <button key={image.alt} aria-label={`View ${index === 0 ? "front" : index === 1 ? "back" : "detail"} image`} aria-pressed={imageIndex === index} onClick={() => setImageIndex(index)}><ProductImage image={image} sizes="120px" /></button>)}</div>}<p className="preview-note">{product.provenance}</p></div>
    <div className="product-info"><p className="eyebrow">Collection 001 / {product.category}</p><h1>{product.name}</h1><p className="detail-price">{formatPrice(product.price)} AUD <span>Illustrative price</span></p><p className="product-description">{product.description}</p>
      <fieldset className="variant-group"><legend>Colour — {colour.name}</legend><div className="colour-options">{product.colours.map((c, index) => <button key={c.name} type="button" aria-label={c.name} aria-pressed={index === colourIndex} style={{ "--swatch": c.hex } as React.CSSProperties} onClick={() => { setColourIndex(index); setImageIndex(0); setMessage(""); }}><span /></button>)}</div></fieldset>
      <div className="size-heading"><span>Size {size && `— ${size}`}</span><Dialog.Root><Dialog.Trigger className="underlined">Size guide</Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="size-dialog"><div className="dialog-title-row"><Dialog.Title>Size guide</Dialog.Title><Dialog.Close asChild><button className="icon-button" aria-label="Close size guide"><X /></button></Dialog.Close></div><Dialog.Description>{product.category === "Shorts" ? "NC–DS001 concept measurements in centimetres. Half waist is measured flat. Final production measurements may change." : "Final garment measurements are not yet available. Size options are for the website preview only; please wait for the confirmed size guide before ordering."}</Dialog.Description>{product.category === "Shorts" && <div className="table-scroll"><table><thead><tr><th>Size</th><th>Half waist</th><th>Outseam</th><th>Hem</th></tr></thead><tbody>{shortsMeasurements.map(row => <tr key={row.size}><th>{row.size}</th><td>{row.waist}</td><td>{row.length}</td><td>{row.hem}</td></tr>)}</tbody></table></div>}</Dialog.Content></Dialog.Portal></Dialog.Root></div>
      <fieldset className="size-options"><legend className="sr-only">Select size</legend>{product.sizes.map(s => <button key={s} aria-pressed={size === s} onClick={() => { setSize(s); setMessage(""); }}>{s}</button>)}</fieldset><p className="availability">Preview only · Availability to be confirmed</p>
      <button className="button button-dark add-button" disabled={!ready || atLimit} onClick={() => { if (!size) { setMessage("Choose a size to add this piece to your preview bag."); return; } add({ productId: product.id, colour: colour.name, size }); setMessage("Added to your preview bag."); }}>{atLimit ? "Preview quantity limit reached" : "Add to preview bag"}{message === "Added to your preview bag." ? <Check size={17} /> : <ArrowRight size={17} />}</button>
      <div className="add-status" role="status">{message}{message === "Added to your preview bag." && <> <Link href="/cart" className="underlined">View bag</Link></>}</div>
      <p className="purchase-note">This is a collection preview. No payment will be taken.</p>
      <div className="product-accordions"><details open><summary>Design & fabric</summary><p>{product.fabric}</p></details><details><summary>Care</summary><p>{product.care}</p></details><details><summary>Shipping & returns</summary><p>Shipping destinations, rates and return terms will be published before orders open. This preview does not accept purchases.</p><Link href="/shipping" className="underlined">Shipping information</Link></details></div>
    </div>
  </div>;
}
