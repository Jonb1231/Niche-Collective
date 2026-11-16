import type { Metadata } from "next";
import { CartView } from "@/features/cart/cart-view";
export const metadata: Metadata = { title: "Your Bag" };
export default function Cart() { return <main className="page-shell"><header className="page-heading"><p className="eyebrow">Your considered selection</p><h1>THE <em>BAG.</em></h1></header><CartView /></main>; }
