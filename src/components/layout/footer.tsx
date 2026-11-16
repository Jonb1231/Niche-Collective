import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top"><div className="footer-brand"><Image src="/brand/wordmark.png" alt="Niche Collective" width={2162} height={720} /><p>Independent by design.<br />Established 2026.</p></div>
      <div><p className="eyebrow muted">Explore</p><Link href="/shop">Shop all</Link><Link href="/collections">Collections</Link><Link href="/lookbook">Lookbook</Link><Link href="/about">Our story</Link></div>
      <div><p className="eyebrow muted">Information</p><Link href="/contact">Contact</Link><Link href="/shipping">Shipping</Link><Link href="/returns">Returns</Link><Link href="/privacy">Privacy</Link></div>
      <div><p className="eyebrow muted">Stay connected</p><Link href="/#newsletter">Enter the collective <ArrowUpRight size={13} /></Link><Link href="/contact#instagram">Instagram <ArrowUpRight size={13} /></Link><p className="footer-note">A new perspective.<br />An independent collective.</p></div>
    </div><div className="footer-bottom"><span>© 2026 Niche Collective</span><span>Collection preview · Purchases unavailable</span><span>Australia / AUD $</span></div>
  </footer>;
}
