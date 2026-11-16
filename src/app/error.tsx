"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
 return <main className="page-shell"><div className="empty-state"><p className="eyebrow">A brief interruption</p><h1 style={{ fontSize: 40, margin: "25px 0" }}>Unable to load this page.</h1><p>Please try again in a moment.</p><button className="button button-dark" onClick={reset}>Try again</button></div></main>;
}
