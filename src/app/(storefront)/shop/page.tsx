import type { Metadata } from "next";
import { Suspense } from "react";
import { catalogue } from "@/features/catalogue/storefront";
import { CatalogueBrowser } from "@/features/catalogue/catalogue-browser";
export const metadata: Metadata = { title: "Shop Collection 001" };
export default async function Shop() {
  const products = await catalogue.list();
  return <main className="page-shell"><header className="page-heading"><p className="eyebrow">Collection 001 / Preview</p><h1>THE FIRST <em>COLLECTION.</em></h1><p>An exploration of form, identity and individuality.</p></header><Suspense fallback={<p role="status" className="loading-state">Preparing the collection…</p>}><CatalogueBrowser products={products} /></Suspense></main>;
}
