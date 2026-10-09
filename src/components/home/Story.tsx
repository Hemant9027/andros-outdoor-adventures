"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck2, Fish, Leaf, Quote } from "lucide-react";
import { useBooking } from "@/components/providers";
import { Reveal, RevealImage, Parallax } from "@/components/motion";
import { CONSERVATION_PILLARS, CONSERVATION_PARTNERS, WHY_ANDROS } from "@/lib/data";

/* ===================== CAPTAIN SHAWN — AUTHORITY ===================== */

const LEGACY_STEPS = [
  {
    era: "Early 1980s",
    title: "A pioneer sees what others miss",
    body: "When most of the world didn't know Andros existed, Captain Rupert Leadon saw its potential. With a borrowed boat and an intimate knowledge of the tides, he began taking anglers to places no one had fished before.",
  },
  {
    era: "Two decades",
    title: "The ghost of the flats obeys",
    body: "Captain Rupert (1945–2012) became internationally known — instrumental in establishing the fly-fishing industry throughout The Bahamas. His principle: take only what you need, give back more than you take, leave it better than you found it.",
  },
  {
    era: "Today",
    title: "Captain Shawn carries the tide",
    body: "Since his youth, Shawn worked alongside his father learning the coastal environment of Andros. Over the last decade he has become deeply active in sustainable tourism and environmental conservation.",
  },
];

export function CaptainSection() {
  const booking = useBooking();
  return (
    <section id="guide" className="relative py-20 lg:py-32 bg-ink grain overflow-hidden" aria-label="Meet Captain Shawn Leadon">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-start">
          {/* Editorial copy column */}
          <div>
            <Reveal>
              <p className="eyebrow text-lagoon">Our legacy</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.9rem)] leading-[1.0] tracking-tight">
                Meet Captain<br />
                <em className="not-italic text-clay">Shawn Leadon</em>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 text-lg text-bone/70 leading-relaxed max-w-xl">
                Captain Shawn proudly continues the legacy established by his father, Captain Rupert
                Leadon, over 30 years ago — one of the pioneers who helped put Bahamian bonefishing
                on the world map.
              </p>
            </Reveal>

            <Reveal delay={300} variant="fade">
              <figure className="mt-8 border-l-2 border-clay pl-6 py-1 max-w-xl">
                <Quote size={18} className="text-clay mb-3" />
                <blockquote className="font-display text-xl leading-snug text-bone/85 italic">
                  Rupert didn't just show you fish. He taught you to read the water, respect the
                  environment, and understand why Andros was worth protecting.
                </blockquote>
                <figcaption className="mt-3 text-[0.7rem] tracking-[0.22em] uppercase text-bone/45">
                  Long-time client · 1992
                </figcaption>
              </figure>
            </Reveal>

            <div className="mt-10 space-y-0 max-w-xl">
              {LEGACY_STEPS.map((s, i) => (
                <Reveal key={s.era} delay={i * 120}>
                  <div className="relative pl-8 pb-8 border-l border-bone/15 last:pb-0">
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-clay" aria-hidden />
                    <p className="text-[0.64rem] tracking-[0.28em] uppercase text-gold">{s.era}</p>
                    <h3 className="font-display text-xl mt-1.5">{s.title}</h3>
                    <p className="text-sm text-bone/60 leading-relaxed mt-2">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap gap-4">
                <button
                  onClick={() => booking.openBooking("full-day-fly-fishing-charter")}
                  className="inline-flex items-center gap-2.5 bg-clay text-ink font-bold px-7 py-4 rounded-full hover:bg-gold transition text-sm"
                >
                  <Fish size={16} /> Fish with Captain Shawn
                </button>
                <Link
                  href="/#conservation"
                  className="inline-flex items-center gap-2 border border-bone/25 px-7 py-4 rounded-full hover:border-bone/60 transition text-sm"
                >
                  His conservation work <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Imagery column */}
          <div className="relative lg:sticky lg:top-24">
            <RevealImage className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Parallax speed={0.05} className="absolute inset-0">
                <Image
                  src="/images/captain-shawn.jpg"
                  alt="Captain Shawn Leadon at the helm of his flats boat on Andros"
                  fill
                  sizes="(max-width:1024px) 100vw, 42vw"
                  className="object-cover scale-110"
                />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="font-display text-xl">Capt. Shawn Leadon</p>
                  <p className="text-[0.66rem] tracking-[0.24em] uppercase text-bone/60 mt-1">Head guide &amp; owner</p>
                </div>
              </figcaption>
            </RevealImage>

            <Reveal delay={250} className="absolute -bottom-10 -left-4 sm:-left-8 w-40 sm:w-48">
              <div className="rounded-2xl overflow-hidden border-8 border-ink shadow-2xl aspect-[3/4] relative rotate-[-3deg]">
                <Image
                  src="/images/about-hero.jpg"
                  alt="Fishing boat on calm waters in Andros, representing the Leadon family guiding legacy"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-[0.62rem] tracking-[0.22em] uppercase text-bone/45 text-center">
                Capt. Rupert Leadon · 1945–2012
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== WHY ANDROS — QUALITATIVE DATA STORY ===================== */

export function WhyAndros() {
  return (
    <section className="relative py-20 lg:py-32 bg-pine grain overflow-hidden" aria-label="Why Andros Island">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="max-w-2xl mb-14">
          <Reveal>
            <p className="eyebrow text-lagoon">Discover Andros</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tight">
              Why Andros Island?
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-5 text-bone/60 leading-relaxed">
              The ultimate destination for outdoor adventures in The Bahamas — told in the
              superlatives that are actually true of this island.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[19rem]">
          {WHY_ANDROS.map((w, i) => (
            <Reveal
              key={w.title}
              delay={i * 110}
              className={i === 0 ? "lg:col-span-2 lg:row-span-2 lg:auto-rows-auto min-h-[19rem] lg:min-h-0" : i === 3 ? "lg:col-span-2" : ""}
            >
              <figure className="group relative h-full w-full rounded-3xl overflow-hidden border border-bone/10 media-zoom">
                <Image
                  src={w.image}
                  alt={w.alt}
                  fill
                  sizes={i === 0 ? "(max-width:1024px) 100vw, 50vw" : "(max-width:768px) 100vw, 25vw"}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[0.62rem] tracking-[0.28em] uppercase text-gold">{w.kicker}</p>
                  <h3 className={`font-display mt-2 leading-tight ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{w.title}</h3>
                  <p className={`text-sm text-bone/65 leading-relaxed mt-2.5 max-w-md transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-40 lg:group-hover:opacity-100 overflow-hidden`}>
                    {w.detail}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CONSERVATION PILLAR ===================== */

export function Conservation() {
  const [open, setOpen] = useState(0);

  return (
    <section id="conservation" className="relative py-20 lg:py-32 bg-ink grain overflow-hidden" aria-label="Conservation and stewardship">
      <span className="pointer-events-none select-none absolute top-10 right-0 font-display text-[clamp(5rem,14vw,13rem)] leading-none text-bone/[0.035] whitespace-nowrap" aria-hidden>
        Stewardship
      </span>
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14">
          <div className="lg:sticky lg:top-28 self-start">
            <Reveal>
              <p className="eyebrow text-fern">Our commitment</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tight">
                Conservation &amp; <em className="not-italic text-fern">stewardship</em>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-5 text-bone/60 leading-relaxed max-w-md">
                Protecting Andros' natural resources through sustainable practices and partnerships —
                because the flats only stay world-class if someone fights for them.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <Link
                href="/plan"
                className="mt-8 inline-flex items-center gap-2.5 bg-fern/90 text-bone font-bold px-7 py-4 rounded-full hover:bg-fern transition text-sm"
              >
                <Leaf size={16} /> Explore sustainable adventures
              </Link>
            </Reveal>

            <Reveal delay={400} variant="fade">
              <div className="mt-10 rounded-3xl border border-bone/10 bg-moss/40 p-6">
                <p className="text-[0.62rem] tracking-[0.28em] uppercase text-bone/40 mb-5">
                  Trusted conservation partners
                </p>
                <ul className="space-y-4">
                  {CONSERVATION_PARTNERS.map((p) => (
                    <li key={p.name} className="flex items-center gap-4 group cursor-default">
                      <span className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-bone/95 grid place-items-center p-1">
                        <Image src={p.logo} alt={`${p.name} logo`} fill sizes="48px" className="object-contain" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold leading-tight group-hover:text-clay transition">{p.name}</span>
                        <span className="block text-[0.7rem] text-bone/50 mt-0.5">{p.role}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Numbered interactive pillars */}
          <div className="space-y-3" role="list">
            {CONSERVATION_PILLARS.map((p, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={p.index} delay={i * 100}>
                  <button
                    role="listitem"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(i)}
                    className={`w-full text-left rounded-3xl border transition-all duration-500 px-6 sm:px-8 py-6 sm:py-7 group
                      ${isOpen ? "border-fern/50 bg-moss/60" : "border-bone/10 hover:border-bone/25 bg-transparent"}`}
                  >
                    <div className="flex items-center gap-6 sm:gap-9">
                      <span className={`big-index transition-colors duration-500 ${isOpen ? "" : "opacity-60"}`} aria-hidden>
                        {p.index}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-xl sm:text-2xl leading-tight">{p.title}</h3>
                        <div className="acc-panel" data-open={isOpen}>
                          <div>
                            <p className="text-sm text-bone/60 leading-relaxed pt-3 max-w-md">
                              {p.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`w-9 h-9 shrink-0 rounded-full border grid place-items-center transition-all duration-500
                          ${isOpen ? "border-clay text-clay rotate-45" : "border-bone/20 text-bone/50"}`}
                        aria-hidden
                      >
                        +
                      </span>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
