import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { information, type InformationSlug } from "@/data/information";
export const ensureStatic = "navigation";
export function generateStaticParams() { return Object.keys(information).map(info => ({ info })); }
function findPage(info: string) { return Object.hasOwn(information, info) ? information[info as InformationSlug] : undefined; }
export async function generateMetadata({ params }: { params: Promise<{ info: string }> }): Promise<Metadata> { const { info } = await params; return { title: findPage(info)?.title ?? "Page not found" }; }
export default async function InformationPage({ params }: { params: Promise<{ info: string }> }) {
 const { info } = await params; const page = findPage(info); if (!page) notFound();
 return <main className="page-shell prose-page"><header className="page-heading"><p className="eyebrow">Niche Collective / Information</p><h1><em>{page.title}.</em></h1><p>{page.intro}</p></header>{page.sections.map(section => <section key={section.heading} id={"id" in section ? section.id : undefined}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<Link href="/shop" className="text-link">Back to the collection ↗</Link></main>;
}
