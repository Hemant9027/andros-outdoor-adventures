"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, CalendarCheck2, Check, Clock, Users, Fish,
  Compass, Waves, Shell, Tent, Binoculars, MapPin,
} from "lucide-react";
import { useBooking } from "@/components/providers";
import { Reveal, RevealImage } from "@/components/motion";
import { REGIONS, getExperience, fmtUSD } from "@/lib/data";

/* ===================== FEATURED FISHING ADVENTURE ===================== */

export function FeaturedCharter() {
  const booking = useBooking();
  const exp = getExperience("full-day-fly-fishing-charter")!;

  return (
    <section className="relative py-20 lg:py-32 bg-pine grain overflow-hidden" aria-label="Featured adventure">
      <span className="pointer-events-none select-none absolute -top-6 left-0 font-display text-[clamp(6rem,16vw,15rem)] leading-none text-bone/[0.04] whitespace-nowrap" aria-hidden>
        The Big Three
      </span>
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Imagery: stacked + overlapping */}
          <div className="relative">
            <RevealImage className="relative aspect-[4/5] max-w-[30rem] rounded-3xl overflow-hidden">
              <div className="reveal-img absolute inset-0">
                <Image
                  src="/images/charter-main.jpeg"
                  alt="Tarpon brought boat-side on an Andros fly-fishing charter"
                  fill
                  sizes="(max-width:1024px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            </RevealImage>
            <RevealImage delay={250} className="absolute -bottom-8 -right-2 sm:right-[-6%] w-[46%] aspect-square rounded-2xl overflow-hidden border-8 border-pine shadow-2xl">
              <div className="reveal-img absolute inset-0">
                <Image
                  src="/images/charter-2.jpeg"
                  alt="Angler casting for bonefish on the flats"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </RevealImage>
            <Reveal delay={400} className="absolute top-6 -left-2 sm:left-[-1.5rem] bg-clay text-ink rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-[0.6rem] tracking-[0.26em] uppercase font-bold">From</p>
              <p className="font-display text-3xl leading-none mt-1">{fmtUSD(950)}</p>
              <p className="text-[0.62rem] mt-1 font-semibold">per charter · 50% deposit</p>
            </Reveal>
          </div>

          {/* Copy */}
          <div>
            <Reveal>
              <p className="eyebrow text-lagoon">Featured adventure</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.02] tracking-tight">
                Full Day Fly-Fishing <em className="not-italic text-clay">Charter</em>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 text-bone/65 leading-relaxed max-w-lg">
                Spend ~8 hours with Captain Shawn Leadon stalking the legendary Big 3 — bonefish,
                tarpon and permit — across the largest shallow flats on Earth. More time on the
                water means more locations, more adaptations to conditions, and a far better
                shot at the fish of a lifetime.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3 max-w-lg">
                {[
                  "100% catch & release",
                  "Maximum 2 anglers per boat",
                  "Year-round availability",
                  "All tackle & instruction included",
                ].map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-bone/75">
                    <Check size={15} className="text-fern mt-0.5 shrink-0" strokeWidth={3} /> {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={420}>
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-bone/10 py-5 max-w-lg">
                <div>
                  <dt className="text-[0.6rem] tracking-[0.26em] uppercase text-bone/40 flex items-center gap-1.5"><Clock size={11} /> Duration</dt>
                  <dd className="font-display text-lg mt-1">~8 hours</dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] tracking-[0.26em] uppercase text-bone/40 flex items-center gap-1.5"><Users size={11} /> Capacity</dt>
                  <dd className="font-display text-lg mt-1">2 anglers</dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] tracking-[0.26em] uppercase text-bone/40 flex items-center gap-1.5"><Fish size={11} /> Targets</dt>
                  <dd className="font-display text-lg mt-1">Bonefish · Tarpon · Permit</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={520}>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => booking.openBooking(exp.slug)}
                  className="inline-flex items-center gap-2.5 bg-clay text-ink font-bold px-8 py-4 rounded-full hover:bg-gold transition"
                >
                  <CalendarCheck2 size={17} /> Check fishing dates
                </button>
                <Link
                  href={`/experiences/${exp.slug}`}
                  className="inline-flex items-center gap-2 border border-bone/25 px-8 py-4 rounded-full hover:border-bone/60 transition"
                >
                  Full trip details <ArrowUpRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== DISCOVER YOUR ANDROS (intent cards) ===================== */

const INTENTS = [
  { label: "I want to fish", href: "/andros-fishing-charters", icon: Fish, tone: "clay" },
  { label: "I want to explore", href: "/andros-hiking", icon: Compass, tone: "sand" },
  { label: "I want to kayak", href: "/andros-kayaking", icon: Waves, tone: "ocean" },
  { label: "I want to snorkel", href: "/andros-snorkeling", icon: Shell, tone: "lagoon" },
  { label: "I want to see blue holes", href: "/andros-blue-holes", icon: Binoculars, tone: "fern" },
  { label: "I want a multi-day adventure", href: "/andros-fish-camp", icon: Tent, tone: "gold" },
] as const;

export function IntentCards() {
  return (
    <section className="relative py-20 lg:py-28 bg-ink" aria-label="Discover your Andros">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <p className="eyebrow text-lagoon">Start where you are</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tight max-w-xl">
                Discover your Andros
              </h2>
            </Reveal>
          </div>
          <Reveal delay={220}>
            <p className="text-bone/55 text-sm max-w-sm leading-relaxed">
              Every intent leads somewhere real — dedicated guides built around what travelers
              actually search for, each ending at a bookable experience.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {INTENTS.map((c, i) => (
            <Reveal key={c.label} delay={i * 90}>
              <Link
                href={c.href}
                className="group relative flex flex-col justify-between h-40 sm:h-52 rounded-3xl border border-bone/10 bg-moss/40 p-5 sm:p-7 overflow-hidden hover:border-clay/50 transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_80%_10%,rgba(200,128,62,0.12),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden />
                <c.icon size={26} className="text-clay group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500" />
                <div className="relative">
                  <p className="font-display text-lg sm:text-2xl leading-tight">{c.label}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-[0.7rem] tracking-[0.2em] uppercase text-bone/45 group-hover:text-clay transition-colors">
                    Explore <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
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

/* ===================== INTERACTIVE ANDROS MAP ===================== */

export function AndrosMap() {
  const [active, setActive] = useState<string>("middle");
  const region = REGIONS.find((r) => r.id === active)!;

  const regionPaths: Record<string, { d: string; label: [number, number] }> = {
    north: {
      d: "M150,28 C196,34 218,64 210,104 C204,138 186,158 164,170 C138,156 122,132 120,102 C118,68 128,40 150,28 Z",
      label: [168, 100],
    },
    middle: {
      d: "M164,176 C190,162 214,168 224,196 C234,226 230,262 214,288 C190,300 160,296 144,272 C130,246 134,204 148,184 Z",
      label: [183, 232],
    },
    south: {
      d: "M142,306 C172,298 204,306 220,332 C238,362 242,410 226,446 C206,486 162,508 128,494 C100,478 88,436 96,396 C104,356 118,318 142,306 Z",
      label: [165, 405],
    },
    west: {
      d: "M96,200 C112,180 140,172 158,184 C148,214 146,250 152,282 C156,310 138,330 116,324 C92,314 80,282 82,248 C84,226 88,210 96,200 Z M108,340 C126,336 144,344 150,362 C138,392 130,428 132,458 C110,462 90,444 86,414 C82,384 90,354 108,340 Z",
      label: [114, 260],
    },
  };

  return (
    <section id="andros" className="relative py-20 lg:py-32 bg-deep/40 grain overflow-hidden" aria-label="Explore Andros Island">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          {/* Map */}
          <div className="relative order-2 lg:order-1">
            <Reveal variant="fade">
              <svg
                viewBox="0 0 320 560"
                className="w-full max-w-[26rem] mx-auto"
                role="group"
                aria-label="Interactive map of Andros regions"
              >
                <defs>
                  <radialGradient id="sea" cx="50%" cy="45%" r="70%">
                    <stop offset="0%" stopColor="#24443f" />
                    <stop offset="100%" stopColor="#101713" />
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width="320" height="560" rx="24" fill="url(#sea)" opacity="0.4" />
                {/* reef line */}
                <path d="M262,60 C276,170 282,300 266,470" fill="none" stroke="#8db8b0" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" opacity="0.5" />
                <text x="284" y="270" fill="#8db8b0" fontSize="9" letterSpacing="3" transform="rotate(90 284 270)" opacity="0.8">
                  ANDROS BARRIER REEF
                </text>

                {REGIONS.map((r) => {
                  const p = regionPaths[r.id];
                  const isActive = r.id === active;
                  return (
                    <g key={r.id}>
                      <path
                        d={p.d}
                        fill={isActive ? "#c8803e" : "#2e4a35"}
                        stroke={isActive ? "#d2a24a" : "#476647"}
                        strokeWidth={isActive ? 2 : 1.2}
                        opacity={isActive ? 0.95 : 0.75}
                        className="cursor-pointer transition-all duration-500 hover:fill-fern"
                        role="button"
                        tabIndex={0}
                        aria-pressed={isActive}
                        aria-label={`Select ${r.name}`}
                        onClick={() => setActive(r.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setActive(r.id);
                          }
                        }}
                      />
                      <text
                        x={regionPaths[r.id].label[0]}
                        y={regionPaths[r.id].label[1]}
                        textAnchor="middle"
                        fill={isActive ? "#0e120d" : "#f4efe2"}
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="1.5"
                        className="pointer-events-none uppercase"
                      >
                        {r.name.replace(" National Park", "")}
                      </text>
                    </g>
                  );
                })}
                {/* The Bights marker — AOA's interior fishing areas */}
                <circle cx="196" cy="240" r="4" fill="#d2a24a" />
                <circle cx="196" cy="240" r="9" fill="none" stroke="#d2a24a" opacity="0.5">
                  <animate attributeName="r" values="6;14" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="196" y="224" textAnchor="middle" fill="#d2a24a" fontSize="8" letterSpacing="2">
                  THE BIGHTS
                </text>
                <text x="196" y="258" textAnchor="middle" fill="#d2a24a" fontSize="7" letterSpacing="1" opacity="0.85">
                  NORTH · MIDDLE · SOUTH
                </text>
              </svg>
            </Reveal>
            <Reveal delay={200} variant="fade">
              <p className="text-center text-[0.68rem] text-bone/40 mt-4 max-w-xs mx-auto">
                Illustrative map — AOA fishes the interior North, Middle and South Bights, with boat rides of 15–45 minutes from the dock.
              </p>
            </Reveal>
          </div>

          {/* Region panel */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow text-lagoon">Explore Andros</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tight">
                One island, <em className="not-italic text-clay">four worlds</em>
              </h2>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Andros regions">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    role="tab"
                    aria-selected={active === r.id}
                    onClick={() => setActive(r.id)}
                    className={`px-4 py-2 rounded-full text-[0.74rem] font-semibold border transition-all duration-300
                      ${active === r.id ? "bg-clay border-clay text-ink" : "border-bone/15 text-bone/65 hover:border-bone/40"}`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </Reveal>

            <div key={active} className="mt-8 step-in rounded-3xl border border-bone/10 bg-pine/70 p-6 sm:p-8">
              <p className="inline-flex items-center gap-2 text-[0.64rem] tracking-[0.28em] uppercase text-gold">
                <MapPin size={12} /> {region.name}
              </p>
              <p className="mt-4 text-bone/70 leading-relaxed">{region.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {region.facts.map((f) => (
                  <span key={f} className="text-[0.68rem] bg-moss/70 border border-bone/10 rounded-full px-3 py-1.5 text-bone/60">
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-7 pt-5 border-t border-bone/10">
                <p className="text-[0.64rem] tracking-[0.28em] uppercase text-bone/40 mb-3.5">Experiences here</p>
                <ul className="space-y-2.5">
                  {region.experiences.map((slug) => {
                    const e = getExperience(slug);
                    if (!e) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/experiences/${slug}`}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-transparent hover:border-bone/15 hover:bg-moss/50 px-3.5 py-2.5 -mx-3.5 transition"
                        >
                          <span className="flex items-center gap-3 min-w-0">
                            <span className="w-8 h-8 rounded-lg overflow-hidden relative shrink-0">
                              <Image src={e.image} alt="" fill sizes="32px" className="object-cover" />
                            </span>
                            <span className="text-sm font-medium truncate">{e.shortName}</span>
                          </span>
                          <ArrowUpRight size={14} className="text-bone/40 group-hover:text-clay transition shrink-0" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
