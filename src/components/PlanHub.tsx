"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, CalendarCheck2, ChevronDown, Fish, Leaf,
  MessageCircleQuestion, Moon, Sunrise, Sunset, Tent, Waves,
} from "lucide-react";
import { useBooking } from "@/components/providers";
import { Reveal } from "@/components/motion";
import { PLAN_FAQS, SEO_PAGES } from "@/lib/data";

/* ------------------------- TOPIC CLUSTERS ------------------------- */

const CLUSTERS = [
  {
    title: "Andros Fishing",
    icon: Fish,
    pages: ["bonefishing-andros", "andros-fly-fishing", "andros-fishing-charters", "andros-fish-camp"],
  },
  {
    title: "Andros Nature",
    icon: Waves,
    pages: ["andros-kayaking", "andros-blue-holes", "andros-snorkeling", "andros-hiking"],
  },
];

export function TopicClusters() {
  return (
    <section className="py-16 lg:py-24" aria-label="Andros topic clusters">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-lagoon">The knowledge map</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] tracking-tight max-w-2xl">
            Everything about Andros, organized the way travelers search
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {CLUSTERS.map((c, ci) => (
            <Reveal key={c.title} delay={ci * 120}>
              <div className="h-full rounded-3xl border border-bone/10 bg-pine/70 p-7">
                <p className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-clay/15 border border-clay/40 grid place-items-center text-clay">
                    <c.icon size={18} />
                  </span>
                  <span className="font-display text-2xl">{c.title}</span>
                </p>
                <ul className="mt-6 space-y-1">
                  {c.pages.map((slug) => {
                    const p = SEO_PAGES.find((s) => s.slug === slug)!;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/${slug}`}
                          className="group flex items-center justify-between gap-3 px-4 py-3 -mx-4 rounded-xl hover:bg-moss/60 transition"
                        >
                          <span className="text-sm text-bone/75 group-hover:text-clay transition">{p.h1}</span>
                          <ArrowUpRight size={14} className="text-bone/35 group-hover:text-clay transition shrink-0" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-6 rounded-3xl border border-fern/30 bg-moss/40 p-7 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-fern/20 border border-fern/40 grid place-items-center text-sage shrink-0">
                <Leaf size={18} />
              </span>
              <div>
                <p className="font-display text-xl">Andros Conservation</p>
                <p className="text-sm text-bone/55 mt-0.5">Sustainable tourism, research partnerships, community education, habitat protection.</p>
              </div>
            </div>
            <Link href="/#conservation" className="inline-flex items-center gap-2 text-sm text-sage link-sweep shrink-0">
              See the four pillars <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------- QUESTION HUB ------------------------- */

export function QuestionHub() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16 lg:py-24 bg-pine/60 grain" aria-label="Questions about Andros adventures">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
        <div className="lg:sticky lg:top-28 self-start">
          <Reveal>
            <p className="eyebrow text-lagoon">Ask, answered</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] tracking-tight">
              The questions every Andros traveler asks
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-5 text-bone/60 text-sm leading-relaxed max-w-sm">
              Straight answers built from AOA's own charter information, policies and guides —
              written so both people and answer engines can trust them.
            </p>
          </Reveal>
        </div>

        <div className="space-y-2.5">
          {PLAN_FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className={`rounded-2xl border transition-colors duration-300 ${isOpen ? "border-clay/40 bg-moss/50" : "border-bone/10 bg-pine/50"}`}>
                  <button
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="flex items-start gap-3.5">
                      <MessageCircleQuestion size={18} className="text-clay shrink-0 mt-1" />
                      <span className="font-display text-lg leading-snug">{f.q}</span>
                    </span>
                    <ChevronDown size={17} className={`shrink-0 text-clay transition-transform duration-300 mt-1 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className="acc-panel" data-open={isOpen}>
                    <div>
                      <div className="px-6 pb-6 pl-[3.9rem]">
                        <p className="text-sm text-bone/65 leading-relaxed">{f.a}</p>
                        <Link href={f.link} className="mt-4 inline-flex items-center gap-2 text-[0.74rem] tracking-[0.18em] uppercase text-clay hover:text-gold transition">
                          {f.linkLabel} <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- BUILD YOUR ANDROS DAY ------------------------- */

type SlotKey = "morning" | "afternoon" | "evening";

const DAY_SLOTS: Record<
  SlotKey,
  { icon: typeof Sunrise; label: string; options: { id: string; name: string; note: string; bookSlug?: string }[] }
> = {
  morning: {
    icon: Sunrise,
    label: "Morning",
    options: [
      { id: "fish", name: "Guided flats fishing", note: "Tide-timed session with Captain Shawn", bookSlug: "full-day-fly-fishing-charter" },
      { id: "kayak", name: "Mangrove kayaking", note: "Calm creeks, best light of the day", bookSlug: "mangrove-kayaking" },
      { id: "hike", name: "Hiking to ruins & caves", note: "Early start — cooler hours", bookSlug: "hiking-biking-tours" },
    ],
  },
  afternoon: {
    icon: Sunset,
    label: "Afternoon",
    options: [
      { id: "bluehole", name: "Blue hole swim", note: "The site's own advice: cool off after a morning of fishing", bookSlug: "blue-hole-exploration" },
      { id: "snorkel", name: "Barrier reef snorkeling", note: "Turtles, rays and coral gardens", bookSlug: "snorkeling-excursions" },
      { id: "fish2", name: "Keep fishing the full day", note: "~8 hours across multiple flats", bookSlug: "full-day-fly-fishing-charter" },
    ],
  },
  evening: {
    icon: Moon,
    label: "Evening",
    options: [
      { id: "camp", name: "West coast fish camp", note: "Sunset dinner & stargazing (Nov–Apr)", bookSlug: "overnight-fish-camp-adventure" },
      { id: "return", name: "Return & swap stories", note: "Back at the dock — plan tomorrow" },
    ],
  },
};

export function DayBuilder() {
  const booking = useBooking();
  const [sel, setSel] = useState<Record<SlotKey, string>>({
    morning: "fish",
    afternoon: "bluehole",
    evening: "return",
  });

  const chosen = (Object.keys(DAY_SLOTS) as SlotKey[]).map((k) =>
    DAY_SLOTS[k].options.find((o) => o.id === sel[k])!
  );
  const bookTarget =
    chosen.find((o) => o.bookSlug)?.bookSlug ?? "full-day-fly-fishing-charter";

  return (
    <section className="py-16 lg:py-24" aria-label="Build your Andros day">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <Reveal>
              <p className="eyebrow text-gold">Interactive itinerary</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] tracking-tight">
                Build your Andros day
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-5 text-bone/60 text-sm leading-relaxed max-w-md">
                Stack a morning, an afternoon and an evening from the experiences AOA
                actually runs. It even suggests the pairings the guides themselves
                recommend — like a blue hole swim after a morning on the flats.
              </p>
            </Reveal>

            <div className="mt-10 space-y-7">
              {(Object.keys(DAY_SLOTS) as SlotKey[]).map((k, i) => (
                <Reveal key={k} delay={i * 110}>
                  <fieldset>
                    <legend className="flex items-center gap-2.5 text-[0.66rem] tracking-[0.28em] uppercase text-bone/50 mb-3">
                      {(() => { const I = DAY_SLOTS[k].icon; return <I size={14} className="text-gold" />; })()}
                      {DAY_SLOTS[k].label}
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {DAY_SLOTS[k].options.map((o) => {
                        const active = sel[k] === o.id;
                        return (
                          <button
                            key={o.id}
                            aria-pressed={active}
                            onClick={() => setSel((s) => ({ ...s, [k]: o.id }))}
                            className={`px-4 py-2.5 rounded-full text-[0.78rem] font-medium border transition-all duration-300
                              ${active ? "bg-clay border-clay text-ink font-bold" : "border-bone/15 text-bone/70 hover:border-bone/45"}`}
                          >
                            {o.name}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Itinerary preview */}
          <Reveal delay={200} variant="fade">
            <div className="lg:sticky lg:top-28 rounded-3xl border border-bone/10 bg-pine/80 p-7 sm:p-9">
              <p className="text-[0.62rem] tracking-[0.28em] uppercase text-lagoon mb-7">Your day on Andros</p>
              <ol className="relative space-y-7 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-bone/15">
                {(Object.keys(DAY_SLOTS) as SlotKey[]).map((k) => {
                  const o = DAY_SLOTS[k].options.find((x) => x.id === sel[k])!;
                  return (
                    <li key={`${k}-${o.id}`} className="relative pl-8 step-in">
                      <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-clay bg-ink" aria-hidden />
                      <p className="text-[0.62rem] tracking-[0.26em] uppercase text-bone/40">{DAY_SLOTS[k].label}</p>
                      <p className="font-display text-xl mt-1">{o.name}</p>
                      <p className="text-sm text-bone/55 mt-1">{o.note}</p>
                    </li>
                  );
                })}
              </ol>
              <button
                onClick={() => booking.openBooking(bookTarget)}
                className="mt-9 w-full inline-flex items-center justify-center gap-2.5 bg-clay text-ink font-bold px-6 py-4 rounded-full hover:bg-gold transition"
              >
                <Tent size={16} /> Book this experience
              </button>
              <p className="mt-3 text-center text-[0.68rem] text-bone/40">
                Multi-activity days are arranged directly with AOA — every trip is customized.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
