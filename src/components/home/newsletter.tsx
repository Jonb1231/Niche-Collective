"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export function Newsletter() {
  const [message, setMessage] = useState("");
  return <section className="newsletter section-space" id="newsletter"><div><p className="eyebrow">An open invitation</p><h2>ENTER THE<br /><em>COLLECTIVE.</em></h2><p>Collection announcements, early access and future releases.</p></div><form onSubmit={event => { event.preventDefault(); setMessage("Preview only — your email has not been saved or subscribed. Sign-up will open with the first release."); }}>
    <p className="eyebrow muted">Newsletter preview — sign-up coming soon</p><label className="sr-only" htmlFor="newsletter-email">Email address</label><div className="email-field"><input id="newsletter-email" name="email" type="email" placeholder="Your email address" autoComplete="email" required maxLength={254} /><button type="submit" aria-label="Preview newsletter signup"><ArrowRight size={24} /></button></div>
    <label className="consent"><input type="checkbox" required name="consent" /><span>I agree to receive emails from Niche Collective and have read the <Link href="/privacy">privacy notice</Link>.</span></label><p role="status" className="form-message">{message}</p>
  </form></section>;
}
