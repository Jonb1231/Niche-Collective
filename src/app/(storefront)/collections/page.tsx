import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = { title: "Collections" };
export default function Collections() {
 return <main className="page-shell"><header className="page-heading"><p className="eyebrow">The chapters of Niche Collective</p><h1>THE <em>COLLECTIONS.</em></h1><p>Each chapter, a new perspective. This is where it begins.</p></header><article className="collection-feature"><Link href="/shop" className="collection-feature-photo" aria-label="Explore Collection 001"><Image src="/images/campaign-concept.png" alt="AI-generated Collection 001 campaign study" fill sizes="(max-width: 800px) 100vw, 55vw" preload /></Link><div><p className="eyebrow">Inaugural collection / Design preview</p><h2>COLLECTION<br /><em>001.</em></h2><p>Form. Identity. Expression. An exploration of considered silhouettes and individual perspective, from relaxed carpenter denim to everyday layers.</p><p className="preview-note">Concept imagery and illustrative prices. Release date and availability to be confirmed.</p><Link href="/shop" className="text-link">Explore the pieces <ArrowUpRight size={17} /></Link><Link href="/lookbook" className="text-link">View lookbook <ArrowUpRight size={17} /></Link></div></article></main>;
}
