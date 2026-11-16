import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogue } from "@/features/catalogue/storefront";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductCard } from "@/components/product/product-card";
export const ensureStatic = "navigation";
export async function generateStaticParams() { return (await catalogue.list()).map(product => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const product = await catalogue.find(slug);
  return { title: product?.name ?? "Piece not found", description: product?.description };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const product = await catalogue.find(slug); if (!product) notFound();
  const related = (await catalogue.list()).filter(p => p.id !== product.id);
  return <main className="page-shell product-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/shop">Collection 001</Link><span>/</span><span>{product.name}</span></nav><ProductDetail product={product} /><section className="related-products"><div className="section-heading"><h2>IN GOOD <em>COMPANY.</em></h2><Link href="/shop" className="text-link">View all pieces ↗</Link></div><div className="product-grid related-grid">{related.map(p => <ProductCard product={p} key={p.id} />)}</div></section></main>;
}
