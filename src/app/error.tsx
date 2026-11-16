"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="p-8"><h1>Unable to load this page</h1><p>Please try again or check the service configuration.</p><button className="border p-3 mt-4" onClick={reset}>Try again</button></main>;
}
