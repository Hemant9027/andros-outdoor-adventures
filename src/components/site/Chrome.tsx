"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, CalendarCheck2, Fish, ThumbsUp, MapPin } from "lucide-react";
import { useBooking } from "@/components/providers";
import { SITE } from "@/lib/data";

/* ------------------------------ NAVBAR ------------------------------ */

const NAV_LINKS = [
  { href: "/#experiences", label: "Experiences" },
  { href: "/#guide", label: "Captain Shawn" },
  { href: "/#andros", label: "Explore Andros" },
  { href: "/#conservation", label: "Conservation" },
  { href: "/journal", label: "Field Journal" },
  { href: "/plan", label: "Plan Your Trip" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const booking = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "bg-ink/85 backdrop-blur-lg border-b border-bone/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Andros Outdoor Adventures home">
            <span className="w-10 h-10 rounded-full bg-clay/15 border border-clay/40 grid place-items-center text-clay group-hover:bg-clay group-hover:text-ink transition-all duration-300">
              <Fish size={18} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg tracking-tight">Andros</span>
              <span className="block text-[0.55rem] tracking-[0.34em] uppercase text-bone/55 mt-0.5">
                Outdoor Adventures
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[0.78rem] tracking-wide text-bone/70 hover:text-bone link-sweep transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="hidden md:inline-flex items-center gap-2 text-[0.78rem] text-bone/70 hover:text-bone transition"
            >
              <Phone size={14} className="text-clay" /> {SITE.phone}
            </a>
            <button
              onClick={() => booking.openBooking()}
              className="inline-flex items-center gap-2 bg-clay text-ink text-[0.78rem] font-bold px-5 py-2.5 rounded-full hover:bg-gold transition"
            >
              <CalendarCheck2 size={14} /> Book now
            </button>
            <button
              className="lg:hidden w-10 h-10 rounded-full border border-bone/20 grid place-items-center"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[75] bg-ink flex flex-col fade-in" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between px-5 py-5 border-b border-bone/10">
            <p className="font-display text-lg">Andros Outdoor Adventures</p>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 rounded-full border border-bone/20 grid place-items-center"
            >
              <X size={17} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile">
            <ul className="space-y-1">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-3.5 border-b border-bone/8 group"
                  >
                    <span className="text-[0.65rem] text-clay font-mono">0{i + 1}</span>
                    <span className="font-display text-3xl group-hover:text-clay transition">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  booking.openBooking();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-clay text-ink font-bold px-6 py-4 rounded-full"
              >
                <CalendarCheck2 size={17} /> Check dates & book
              </button>
              <a
                href={SITE.phoneHref}
                className="w-full inline-flex items-center justify-center gap-2 border border-bone/20 px-6 py-4 rounded-full text-sm"
              >
                <Phone size={15} className="text-clay" /> {SITE.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

/* ------------------------------ SCROLL PROGRESS ------------------------------ */

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 h-[2.5px] z-[70] bg-transparent" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-clay to-gold origin-left"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

/* ------------------------------ MOBILE BOOKING BAR ------------------------------ */

export function MobileBookingBar() {
  const [show, setShow] = useState(false);
  const booking = useBooking();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show || booking.open) return null;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-[65] px-4 pb-4 pt-8 bg-gradient-to-t from-ink via-ink/85 to-transparent">
      <div className="flex gap-2.5 rounded-2xl border border-bone/10 bg-pine/95 backdrop-blur-lg p-2.5 shadow-2xl">
        <button
          onClick={() => booking.openBooking()}
          className="flex-1 inline-flex items-center justify-center gap-2 border border-bone/20 rounded-xl py-3.5 text-sm font-semibold"
        >
          <CalendarCheck2 size={16} className="text-lagoon" /> Check dates
        </button>
        <button
          onClick={() => booking.openBooking("full-day-fly-fishing-charter")}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-clay text-ink rounded-xl py-3.5 text-sm font-bold"
        >
          Book the charter
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ FOOTER ------------------------------ */

const FOOTER_COLS = [
  {
    title: "Fishing",
    links: [
      { href: "/bonefishing-andros", label: "Bonefishing in Andros" },
      { href: "/andros-fly-fishing", label: "Fly-Fishing" },
      { href: "/andros-fishing-charters", label: "Fishing Charters" },
      { href: "/andros-fish-camp", label: "Fish Camp Adventures" },
    ],
  },
  {
    title: "Nature",
    links: [
      { href: "/andros-kayaking", label: "Kayaking" },
      { href: "/andros-blue-holes", label: "Blue Holes" },
      { href: "/andros-snorkeling", label: "Snorkeling" },
      { href: "/andros-hiking", label: "Hiking & Biking" },
    ],
  },
  {
    title: "Plan",
    links: [
      { href: "/plan", label: "Plan Your Adventure" },
      { href: "/journal", label: "The Field Journal" },
      { href: "/experiences/full-day-fly-fishing-charter", label: "Full Day Charter" },
      { href: "/experiences/overnight-fish-camp-adventure", label: "Overnight Fish Camp" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-pine border-t border-bone/10 grain overflow-hidden">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-clay/15 border border-clay/40 grid place-items-center text-clay">
                <Fish size={19} />
              </span>
              <div>
                <p className="font-display text-xl leading-none">Andros Outdoor Adventures</p>
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-bone/50 mt-1">Andros Island · The Bahamas</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-bone/60 leading-relaxed max-w-sm">
              Expert-guided fishing, kayaking, snorkeling and hiking on The Bahamas' largest island — combining
              expert guidance with a commitment to sustainability and community engagement.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-bone/65">
              <li>
                <a href={SITE.phoneHref} className="inline-flex items-center gap-2.5 hover:text-clay transition">
                  <Phone size={14} className="text-clay" /> {SITE.phone} <span className="text-bone/40">(Bahamas)</span>
                </a>
              </li>
              <li>
                <a href={SITE.phoneAltHref} className="inline-flex items-center gap-2.5 hover:text-clay transition">
                  <Phone size={14} className="text-clay" /> {SITE.phoneAlt} <span className="text-bone/40">(US)</span>
                </a>
              </li>
              <li>
                <a href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-clay transition">
                  <ThumbsUp size={14} className="text-clay" /> Facebook — {SITE.facebook}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5">
                <MapPin size={14} className="text-clay" /> Andros Island, The Bahamas
              </li>
            </ul>
          </div>

          {FOOTER_COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[0.62rem] tracking-[0.3em] uppercase text-bone/40 mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-bone/65 hover:text-bone link-sweep transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-bone/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative h-10 w-28 opacity-90">
            <Image src="/images/bonezilla.jpg" alt="Bonezilla — Shawn A Leadon" fill sizes="112px" className="object-contain object-left" />
          </div>
          <p className="text-[0.68rem] text-bone/40 max-w-xl leading-relaxed">
            Interactive redesign concept demonstrating a search-first, direct-booking experience. Availability,
            pricing calculators and payments shown here are simulated demos — verify everything with AOA directly.
          </p>
          <p className="text-[0.68rem] text-bone/40">
            © {new Date().getFullYear()} Andros Outdoor Adventures
          </p>
        </div>
      </div>
    </footer>
  );
}
