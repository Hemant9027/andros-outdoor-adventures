"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Trash2, CalendarCheck2, ArrowRight, Compass } from "lucide-react";
import { useTrip, useBooking } from "@/components/providers";
import { getExperience, fmtUSD } from "@/lib/data";
import { useEffect, useState } from "react";

export default function TripDrawer() {
  const trip = useTrip();
  const booking = useBooking();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = mounted ? trip.items.length : 0;

  const estimated = trip.items.reduce((sum, i) => {
    const e = getExperience(i.slug);
    return sum + (e?.price.amount ?? 0);
  }, 0);

  return (
    <>
      {/* Floating button */}
      {count > 0 && !booking.open && !trip.drawerOpen && (
        <button
          onClick={() => trip.setDrawerOpen(true)}
          aria-label={`Open My Trip, ${count} saved experiences`}
          className="fixed bottom-24 sm:bottom-8 right-4 sm:right-6 z-[70] pop-in
            flex items-center gap-2.5 bg-bone text-ink pl-4 pr-5 py-3 rounded-full
            shadow-[0_10px_40px_rgba(0,0,0,0.45)] hover:bg-sand transition font-semibold text-sm"
        >
          <span className="relative">
            <Compass size={18} />
            <span className="absolute -top-2 -right-2 w-4.5 h-4.5 min-w-4 px-0.5 rounded-full bg-clay text-ink text-[0.6rem] font-bold grid place-items-center">
              {count}
            </span>
          </span>
          My Trip
        </button>
      )}

      {/* Drawer */}
      {trip.drawerOpen && (
        <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="My Trip">
          <button
            aria-label="Close My Trip"
            onClick={() => trip.setDrawerOpen(false)}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm fade-in cursor-default"
          />
          <aside className="drawer-in absolute right-0 top-0 h-full w-full max-w-md bg-pine border-l border-bone/10 flex flex-col">
            <header className="flex items-center justify-between px-6 py-5 border-b border-bone/10">
              <div>
                <p className="text-[0.62rem] tracking-[0.3em] uppercase text-lagoon">Your Trip</p>
                <p className="font-display text-2xl mt-1">
                  {count === 0 ? "Nothing saved yet" : `${count} experience${count > 1 ? "s" : ""}`}
                </p>
              </div>
              <button
                onClick={() => trip.setDrawerOpen(false)}
                aria-label="Close drawer"
                className="w-10 h-10 rounded-full border border-bone/15 grid place-items-center hover:border-bone/50 transition"
              >
                <X size={16} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {count === 0 ? (
                <div className="text-center py-16">
                  <Compass size={30} className="mx-auto text-bone/30 mb-4" />
                  <p className="text-bone/55 text-sm leading-relaxed max-w-[16rem] mx-auto">
                    Tap “Add to My Trip” on any experience to start building your Andros itinerary.
                  </p>
                  <Link
                    href="/#experiences"
                    onClick={() => trip.setDrawerOpen(false)}
                    className="mt-6 inline-flex items-center gap-2 text-clay text-sm link-sweep"
                  >
                    Browse experiences <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                trip.items.map((i) => {
                  const e = getExperience(i.slug);
                  if (!e) return null;
                  return (
                    <article key={i.slug} className="flex gap-4 rounded-2xl border border-bone/10 bg-moss/40 p-3.5">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <Image src={e.image} alt={e.imageAlt} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/experiences/${e.slug}`}
                          onClick={() => trip.setDrawerOpen(false)}
                          className="font-display text-base leading-tight hover:text-clay transition"
                        >
                          {e.shortName}
                        </Link>
                        <p className="text-[0.72rem] text-bone/50 mt-1">{e.duration}</p>
                        <p className="text-[0.72rem] text-lagoon mt-0.5">
                          {e.price.amount ? `From ${fmtUSD(e.price.amount)}` : "Custom quote"}
                        </p>
                      </div>
                      <button
                        onClick={() => trip.remove(i.slug)}
                        aria-label={`Remove ${e.shortName} from My Trip`}
                        className="self-start p-2 text-bone/40 hover:text-ember transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </article>
                  );
                })
              )}
            </div>

            {count > 0 && (
              <footer className="border-t border-bone/10 px-6 py-5 space-y-4">
                {estimated > 0 && (
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-bone/55">Estimated subtotal</span>
                    <span className="font-display text-xl">{fmtUSD(estimated)}</span>
                  </div>
                )}
                <p className="text-[0.68rem] text-bone/40 leading-relaxed">
                  Priced experiences shown at listed rates; custom experiences are quoted by AOA. Multi-experience itineraries are arranged directly.
                </p>
                <button
                  onClick={() => {
                    const first = trip.items[0]?.slug;
                    trip.setDrawerOpen(false);
                    booking.openBooking(first);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-clay text-ink font-bold px-6 py-4 rounded-full hover:bg-gold transition"
                >
                  <CalendarCheck2 size={17} /> Continue to booking
                </button>
              </footer>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
