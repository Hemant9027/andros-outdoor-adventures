"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CalendarCheck2, Check, ChevronDown,
  CreditCard, Landmark, Minus, Quote, X as XIcon,
} from "lucide-react";
import { useBooking } from "@/components/providers";
import { Parallax, Reveal, RevealImage } from "@/components/motion";
import ExperienceCard from "@/components/ExperienceCard";
import { BOOKING_POLICY, EXPERIENCES, JOURNAL, TESTIMONIALS, SITE } from "@/lib/data";

/* ===================== EXPERIENCE MARKETPLACE ===================== */

export function Marketplace() {
  const scroller = useRef<HTMLDivElement>(null);

  const nudge = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 460), behavior: "smooth" });
  };

  return (
    <section id="experiences" className="relative py-20 lg:py-28 bg-pine grain overflow-hidden" aria-label="All experiences">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow text-lagoon">The collection</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tight">
                The full <em className="not-italic text-clay">collection</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200} variant="fade">
            <div className="flex items-center gap-3">
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-bone/40 hidden sm:block mr-2">Scroll sideways</p>
              <button onClick={() => nudge(-1)} aria-label="Scroll experiences left" className="w-12 h-12 rounded-full border border-bone/15 grid place-items-center hover:border-clay hover:text-clay transition">
                <ArrowLeft size={18} />
              </button>
              <button onClick={() => nudge(1)} aria-label="Scroll experiences right" className="w-12 h-12 rounded-full border border-bone/15 grid place-items-center hover:border-clay hover:text-clay transition">
                <ArrowRight size={18} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={200} variant="fade">
        <div
          ref={scroller}
          className="snap-row no-scrollbar mt-10 flex gap-5 overflow-x-auto px-5 sm:px-8 pb-4"
          style={{ scrollbarWidth: "none" }}
          aria-label="Experience cards"
        >
          {EXPERIENCES.map((e) => (
            <ExperienceCard key={e.slug} exp={e} wide />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ===================== BEFORE YOU BOOK ===================== */

const PREBOOK = [
  { k: "Included", v: "Professional guide, fully equipped flats boat, all fly-fishing tackle, expert instruction, premier locations", yes: true },
  { k: "Not included", v: "Airfare, taxi, hotel, food & drinks, gratuities (recommended)", yes: false },
  { k: "Duration", v: "Full day ≈ 8 hours on the water" },
  { k: "Capacity", v: "Maximum 2 anglers per boat — every trip is personal" },
  { k: "Target species", v: "Bonefish (primary), tarpon, permit — 100% catch & release" },
  { k: "Experience level", v: "All levels welcome, first cast to 1000th fish" },
  { k: "Season", v: "Charters run year-round · Fish camp November – April" },
  { k: "Payment terms", v: "50% deposit to confirm · balance due 60 days before departure" },
];

export function BeforeYouBook() {
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    {
      title: "Deposit & balance",
      body: (
        <>
          <p>{BOOKING_POLICY.deposit} {BOOKING_POLICY.depositMin}</p>
          <p className="mt-3">{BOOKING_POLICY.balance}</p>
          <p className="mt-3 text-bone/50 text-[0.82rem]">
            Example: a $950 charter needs a $475 deposit today; the $475 balance is due 60 days before you fish.
          </p>
        </>
      ),
    },
    {
      title: "Payment methods",
      body: (
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-4 py-2 text-sm"><CreditCard size={14} className="text-clay" /> Visa</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-4 py-2 text-sm"><CreditCard size={14} className="text-clay" /> Mastercard</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-4 py-2 text-sm"><Landmark size={14} className="text-clay" /> Wire transfer</span>
        </div>
      ),
    },
    {
      title: "Cancellation windows",
      body: (
        <ul className="space-y-3">
          {BOOKING_POLICY.cancellation.map((c) => (
            <li key={c.window} className="flex gap-3">
              <span className="shrink-0 text-[0.66rem] font-bold tracking-[0.14em] uppercase text-gold w-32 pt-0.5">{c.window}</span>
              <span className="text-bone/65">{c.detail}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Weather policy",
      body: <p>{BOOKING_POLICY.weather}</p>,
    },
    {
      title: "Trip insurance & guarantees",
      body: <p>{BOOKING_POLICY.insurance}</p>,
    },
  ];

  return (
    <section id="policy" className="relative py-20 lg:py-28 bg-deep/30 grain" aria-label="Before you book">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <Reveal>
              <p className="eyebrow text-lagoon">Zero surprises</p>
            </Reveal>
            <Reveal delay={110}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] tracking-tight">
                Before you book
              </h2>
            </Reveal>
            <Reveal delay={210}>
              <p className="mt-4 text-bone/60 leading-relaxed max-w-md">
                The details that decide a trip — straight from AOA's own charter information.
              </p>
            </Reveal>
            <div className="mt-9 grid sm:grid-cols-2 gap-3">
              {PREBOOK.map((f, i) => (
                <Reveal key={f.k} delay={i * 70}>
                  <div className="h-full rounded-2xl border border-bone/10 bg-pine/70 p-5">
                    <p className="flex items-center gap-2 text-[0.62rem] tracking-[0.26em] uppercase text-bone/45">
                      {f.yes === true ? <Check size={12} className="text-fern" strokeWidth={3} /> :
                       f.yes === false ? <XIcon size={12} className="text-ember" strokeWidth={3} /> :
                       <Minus size={12} className="text-lagoon" strokeWidth={3} />}
                      {f.k}
                    </p>
                    <p className="text-sm text-bone/75 leading-relaxed mt-2.5">{f.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:pt-24">
            <Reveal delay={150}>
              <p className="text-[0.62rem] tracking-[0.28em] uppercase text-bone/45 mb-4">The booking policy — in plain view</p>
            </Reveal>
            <div className="space-y-2.5">
              {items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={item.title} delay={i * 80}>
                    <div className={`rounded-2xl border transition-colors duration-400 ${isOpen ? "border-clay/40 bg-pine/80" : "border-bone/10 bg-pine/50"}`}>
                      <button
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="font-display text-lg">{item.title}</span>
                        <ChevronDown size={17} className={`shrink-0 text-clay transition-transform duration-400 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div className="acc-panel" data-open={isOpen}>
                        <div>
                          <div className="px-6 pb-6 text-sm text-bone/70 leading-relaxed">{item.body}</div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== FIELD JOURNAL ===================== */

export function FieldJournal() {
  return (
    <section className="relative py-20 lg:py-28 bg-ink" aria-label="The Andros Field Journal">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <p className="eyebrow text-lagoon">Stories from the flats</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tight">
                The Andros <em className="not-italic text-clay">Field Journal</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={220}>
            <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-clay link-sweep">
              All journal entries <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {JOURNAL.map((j, i) => (
            <Reveal key={j.slug} delay={i * 110}>
              <Link href={`/journal/${j.slug}`} className="group flex flex-col h-full rounded-3xl border border-bone/10 bg-moss/40 overflow-hidden hover:border-bone/25 transition-colors duration-500 media-zoom">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={j.image} alt={j.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="absolute top-4 left-4 text-[0.6rem] tracking-[0.24em] uppercase bg-ink/60 backdrop-blur px-3 py-1.5 rounded-full border border-bone/10">
                    {j.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl leading-snug group-hover:text-clay transition-colors">{j.title}</h3>
                  <p className="text-sm text-bone/55 leading-relaxed mt-3 line-clamp-3">{j.excerpt}</p>
                  <p className="mt-auto pt-5 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase text-clay">
                    Read entry <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS ===================== */

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];

  return (
    <section className="relative py-20 lg:py-28 bg-pine grain overflow-hidden" aria-label="Guest stories">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <div>
            <Reveal>
              <p className="eyebrow text-lagoon">Client stories</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] tracking-tight">
                What our guests say
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-4 text-bone/60 text-sm leading-relaxed max-w-sm">
                Real words from anglers and adventurers who explored Andros with AOA.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex gap-2.5" role="tablist" aria-label="Testimonials">
                {TESTIMONIALS.map((item, i) => (
                  <button
                    key={item.name}
                    role="tab"
                    aria-selected={i === idx}
                    aria-label={`Testimonial from ${item.name}`}
                    onClick={() => setIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "w-10 bg-clay" : "w-4 bg-bone/20 hover:bg-bone/40"}`}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <figure className="relative rounded-3xl border border-bone/10 bg-moss/40 p-8 sm:p-12 min-h-[20rem] flex flex-col justify-between">
              <Quote size={34} className="text-clay/60 mb-6" aria-hidden />
              <div key={idx} className="step-in">
                <blockquote className="font-display text-[clamp(1.25rem,2.4vw,1.8rem)] leading-snug text-bone/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="font-semibold">{t.name}</span>
                  <span className="w-1 h-1 rounded-full bg-clay" aria-hidden />
                  <span className="text-sm text-bone/55">{t.location}</span>
                  <span className="text-[0.64rem] tracking-[0.22em] uppercase text-lagoon border border-lagoon/30 rounded-full px-3 py-1">
                    {t.experience}
                  </span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ===================== FINAL CTA ===================== */

export function FinalCta() {
  const booking = useBooking();
  return (
    <section className="relative py-24 lg:py-40 overflow-hidden grain" aria-label="Book your adventure">
      <Parallax speed={0.1} className="absolute inset-0">
        <Image
          src="/images/charter-3.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40 scale-110"
          aria-hidden
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/55 to-ink" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <Reveal>
          <p className="eyebrow justify-center text-gold">Andros awaits</p>
        </Reveal>
        <Reveal delay={150}>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] tracking-tight">
            The flats are calling.<br />
            <em className="not-italic text-clay">Answer with a date.</em>
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-6 text-bone/65 leading-relaxed max-w-xl mx-auto">
            Every trip is customized to your preferences. Pick an experience, choose a date,
            and put down a 50% deposit to hold it — the adventure is real.
          </p>
        </Reveal>
        <Reveal delay={450}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => booking.openBooking()}
              className="inline-flex items-center gap-2.5 bg-clay text-ink font-bold px-9 py-4.5 rounded-full hover:bg-gold transition text-base"
            >
              <CalendarCheck2 size={18} /> Check availability
            </button>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 border border-bone/30 px-9 py-4.5 rounded-full hover:border-bone/70 transition text-base"
            >
              Call {SITE.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
