import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { catalogue } from "@/features/catalogue/storefront";
import { ProductCard } from "@/components/product/product-card";
import { Newsletter } from "@/components/home/newsletter";
import { Reveal } from "@/components/ui/reveal";
export default async function Home() {
  const products = await catalogue.list();
  return <main>
    <section className="hero" aria-labelledby="hero-heading"><Image src="/images/campaign-concept.png" alt="Campaign concept: two models in dark streetwear beneath a raw concrete structure" fill sizes="(max-width: 600px) 150vh, 100vw" preload className="hero-image" /><div className="hero-shade" />
      <div className="hero-topline eyebrow"><span>Independent luxury streetwear</span><span>Est. 2026</span></div>
      <div className="hero-copy"><p className="eyebrow hero-reveal">A new collective. A different perspective.</p><h1 id="hero-heading" className="hero-reveal">NOT MADE<br />FOR <em>EVERYONE.</em></h1><Link href="/shop" className="button button-light hero-reveal">Explore the collection <ArrowUpRight size={17} /></Link></div>
      <div className="hero-bottom"><span className="eyebrow">Collection 001 / The beginning</span><a href="#first-collection" className="scroll-link">Discover below <ArrowDown size={15} /></a><span className="hero-caption">AI campaign concept</span></div>
    </section>
    <div className="brand-strip"><span>Niche Collective</span><span>Form. Identity. Expression.</span><span>Independent by design.</span></div>
    <section id="first-collection" className="collection-section section-space"><Reveal><div className="section-heading"><div><p className="eyebrow">01 / The beginning</p><h2>THE FIRST <em>COLLECTION.</em></h2><p>An exploration of form, identity and individuality.</p></div><Link className="text-link" href="/shop">View all pieces <ArrowUpRight size={17} /></Link></div></Reveal><div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div><p className="preview-note">An early look at Collection 001. Concept imagery and illustrative AUD prices. Pieces are not yet available to purchase.</p></section>
    <section className="statement"><div className="statement-art"><div className="label-frame"><Image src="/brand/signature-label.png" alt="Original Niche Collective woven label concept, established 2026" width={664} height={243} /></div><span className="eyebrow">The signature / A study in detail</span></div><Reveal className="statement-copy"><p className="eyebrow">The Niche perspective</p><h2>INDIVIDUALITY<br />IS THE <em>STANDARD.</em></h2><p>A point of view, not a uniform. Niche Collective explores the space between quiet restraint and individual expression. Considered forms. Distinctive details. Room to make it your own.</p><Link href="/about" className="text-link light-link">Inside the collective <ArrowUpRight size={17} /></Link></Reveal></section>
    <section className="campaign-section section-space"><div className="campaign-header"><p className="eyebrow">The visual journal</p><span className="eyebrow">Chapter one / 2026</span></div><Link href="/lookbook" className="campaign-photo"><Image src="/images/campaign-concept.png" alt="Collection 001 campaign concept in architectural light and shadow" fill sizes="(max-width: 768px) 100vw, 90vw" /><div className="campaign-photo-shade" /><div className="campaign-title"><p className="eyebrow">Form / Identity / Expression</p><h2>COLLECTION <em>001.</em></h2></div><span className="round-link" aria-label="Explore the lookbook"><ArrowUpRight /></span><span className="campaign-disclosure">AI-generated campaign study</span></Link><div className="campaign-footer"><p>The first chapter. An independent point of view.</p><Link href="/lookbook" className="text-link">Explore the lookbook <ArrowRight size={17} /></Link></div></section>
    <Newsletter />
  </main>;
}
