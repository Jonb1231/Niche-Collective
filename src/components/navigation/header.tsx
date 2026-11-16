"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/features/cart/provider";
const links = [["Shop", "/shop"], ["New arrivals", "/shop?sort=newest"], ["Collections", "/collections"], ["Lookbook", "/lookbook"], ["About", "/about"]];
export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={`site-header ${pathname === "/" && !scrolled ? "header-overlay" : "header-solid"}`}>
    <Link href="/" className="brand-link" aria-label="Niche Collective home"><Image src="/brand/wordmark.png" alt="Niche Collective" width={2162} height={720} className="wordmark" preload /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link href={href} key={label} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav>
    <div className="header-actions"><Link href="/account" className="account-link">Account</Link><Link href="/cart" className="bag-link" aria-label={`Bag (${count})`}><ShoppingBag size={16} strokeWidth={1.3} /><span>Bag ({count})</span></Link>
      <Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger asChild><button className="menu-toggle icon-button" aria-label="Open navigation"><Menu size={23} strokeWidth={1.3} /></button></Dialog.Trigger>
        <Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="mobile-menu"><div className="mobile-menu-top"><Dialog.Title className="eyebrow">Niche Collective</Dialog.Title><Dialog.Close asChild><button className="icon-button" aria-label="Close navigation"><X /></button></Dialog.Close></div><Dialog.Description className="sr-only">Explore the collection and discover Niche Collective.</Dialog.Description><nav aria-label="Mobile navigation">{[...links, ["Account", "/account"]].map(([label, href], index) => <Link key={label} href={href} onClick={() => setOpen(false)}><span className="menu-index">0{index + 1}</span>{label}<ArrowUpRight size={24} /></Link>)}</nav><p className="eyebrow">Independent by design. / Est. 2026</p></Dialog.Content></Dialog.Portal>
      </Dialog.Root>
    </div>
  </header>;
}
