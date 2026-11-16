"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import type { Category, Product } from "@/types/catalogue";
import { sizes } from "@/data/catalogue";
const categories: ("All pieces" | Category)[] = ["All pieces", "T-shirts", "Long sleeves", "Shorts", "Pants"];
export function CatalogueBrowser({ products }: { products: Product[] }) {
  const search = useSearchParams();
  const [category, setCategory] = useState("All pieces");
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");
  const [sort, setSort] = useState(search.get("sort") === "newest" ? "newest" : "featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const colours = [...new Set(products.flatMap(p => p.colours.map(c => c.name)))];
  const filtered = useMemo(() => {
    const result = products.filter(p => (category === "All pieces" || p.category === category) && (!size || p.sizes.some(s => s === size)) && (!colour || p.colours.some(c => c.name === colour)));
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [products, category, size, colour, sort]);
  function reset() { setCategory("All pieces"); setSize(""); setColour(""); }
  return <><div className="catalogue-toolbar"><div className="category-tabs" aria-label="Product categories">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><button className="filter-toggle" aria-expanded={filtersOpen} aria-controls="catalogue-filters" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={15} /> Filters {(size || colour) && <span>•</span>}</button></div>
    <div className="filter-panel" id="catalogue-filters" hidden={!filtersOpen}><label htmlFor="filter-size"><span>Size</span><select id="filter-size" aria-label="Size" value={size} onChange={e => setSize(e.target.value)}><option value="">All sizes</option>{sizes.map(s => <option key={s}>{s}</option>)}</select></label><label htmlFor="filter-colour"><span>Colour</span><select id="filter-colour" aria-label="Colour" value={colour} onChange={e => setColour(e.target.value)}><option value="">All colours</option>{colours.map(c => <option key={c}>{c}</option>)}</select></label><button onClick={reset} className="text-link">Clear filters <X size={14} /></button></div>
    <div className="catalogue-count"><p role="status">{filtered.length} {filtered.length === 1 ? "piece" : "pieces"} / Collection preview</p><label>Sort by<select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="newest">New arrivals</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A–Z</option></select></label></div>
    {filtered.length ? <div className="product-grid">{filtered.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><p className="eyebrow">A different perspective</p><h2>No pieces match.</h2><p>Try another colour or category to explore the collection.</p><button className="button button-dark" onClick={reset}>Clear filters</button></div>}
    <p className="preview-note">Concept imagery and illustrative AUD prices. All sizes are demonstration options, not confirmed stock. New arrivals shows the inaugural collection; release dates are unconfirmed.</p>
  </>;
}
