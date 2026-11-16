import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niche Collective",
  description: "Independent luxury streetwear. Niche Collective.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <header className="flex flex-wrap justify-between gap-6 border-b p-6">
          <Link href="/" className="font-semibold uppercase tracking-widest">Niche Collective</Link>
          <nav aria-label="Main navigation" className="flex flex-wrap gap-6">
            <Link href="/products">Products</Link><Link href="/collections">Collections</Link>
            <Link href="/cart">Bag</Link><Link href="/account">Account</Link>
          </nav>
        </header>{children}
      </body>
    </html>
  );
}
