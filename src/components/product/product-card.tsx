import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/catalogue";
import { ProductImage } from "./product-image";
import { formatPrice } from "@/lib/format";
export function ProductCard({ product }: { product: Product }) {
  const images = product.colours[0].images;
  return <article className="product-card"><Link href={`/products/${product.slug}`} className="product-card-link"><div className="product-card-visual"><ProductImage image={images[0]} />{images[1] && <ProductImage image={images[1]} className="alternate-image" />}<span className="product-badge">Collection 001</span><span className="product-open" aria-hidden="true"><ArrowUpRight size={19} /></span></div><div className="product-card-title"><h3>{product.name}</h3><span>{formatPrice(product.price)} <small>AUD</small></span></div></Link><div className="product-card-meta"><span className="colour-dots">{product.colours.map(colour => <span key={colour.name} style={{ background: colour.hex }} title={colour.name} aria-label={colour.name} />)}<span>{product.colours.length === 1 ? product.colours[0].name : `${product.colours.length} colours`}</span></span><span>Preview</span></div></article>;
}
