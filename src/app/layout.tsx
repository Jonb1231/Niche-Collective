import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/features/cart/provider";
import "./globals.css";
const sans = Geist({ subsets: ["latin"], variable: "--font-grotesk" });
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-editorial" });
export const metadata: Metadata = {
  title: { default: "Niche Collective — Independent by Design", template: "%s | Niche Collective" },
  description: "Independent luxury streetwear. An exploration of form, identity and individuality. Discover Niche Collective, established 2026.",
  robots: { index: false, follow: false },
  openGraph: { title: "Niche Collective", description: "Independent by design. Established 2026.", type: "website" },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${sans.variable} ${display.variable}`}><body>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <CartProvider><Header /><div id="main-content" tabIndex={-1}>{children}</div><Footer /></CartProvider>
  </body></html>;
}
