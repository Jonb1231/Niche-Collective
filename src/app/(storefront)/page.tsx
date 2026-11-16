import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
 return <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-8 px-8 py-24">
  <p className="text-xs uppercase tracking-[0.3em]">Independent luxury streetwear</p>
  <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">Niche Collective</h1>
  <p className="max-w-xl text-lg">Considered pieces. Individual expression. A new collective is taking shape.</p>
  <div><Button asChild><Link href="/products">Explore the catalogue</Link></Button></div>
 </main>;
}
