"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, CalendarCheck2, Anchor, Waves, Shell, TreePalm, CircleDot } from "lucide-react";
import { useBooking } from "@/components/providers";
import { Magnetic, Parallax, Reveal } from "@/components/motion";

const TAGS = [
  { label: "Bonefish", icon: Shell, pos: "top-[10%] -left-4 sm:left-[-2rem]", cls: "drift" },
  { label: "Tarpon", icon: Anchor, pos: "top-[34%] -right-3 sm:right-[-1.5rem]", cls: "drift-slow" },
  { label: "Permit", icon: CircleDot, pos: "bottom-[38%] -left-3 sm:left-[-1.2rem]", cls: "drift-slow" },
  { label: "Mangroves", icon: TreePalm, pos: "bottom-[16%] right-[8%]", cls: "drift" },
  { label: "Blue holes", icon: Waves, pos: "bottom-[6%] -left-2 sm:left-[-0.5rem]", cls: "drift" },
];

const TICKER = [
  "World's largest shallow flats",
  "Bonefish · Tarpon · Permit",
  "Third-largest barrier reef",
  "Highest concentration of blue holes",
  "Caribbean's largest mangroves",
  "100% catch & release",
];

export default function Hero() {
  const booking = useBooking();

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden grain" aria-label="Introduction">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_75%_10%,#1c2b20_0%,#0e120d_55%)]" />
      <div className="absolute -left-40 top-1/3 w-[36rem] h-[36rem] rounded-full bg-ocean/20 blur-[120px]" aria-hidden />

      <div className="relative flex-1 mx-auto w-full max-w-[90rem] px-5 sm:px-8 pt-28 lg:pt-0 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-6 items-center">
        {/* LEFT — editorial column */}
        <div className="relative z-10 py-10 lg:py-0 lg:pr-8">
          <Reveal variant="fade" delay={100}>
            <p className="eyebrow text-lagoon">Andros · The Bahamas</p>
          </Reveal>

          <h1 className="mt-6 font-display tracking-tight leading-[0.95] text-[clamp(2.9rem,7.2vw,6.2rem)]">
            <Reveal delay={200}>
              <span className="block">Wild Water.</span>
            </Reveal>
            <Reveal delay={330}>
              <span className="block text-outline">Quiet Places.</span>
            </Reveal>
            <Reveal delay={460}>
              <span className="block">
                Unforgettable <em className="not-italic text-clay">Fishing.</em>
              </span>
            </Reveal>
          </h1>

          <Reveal delay={620}>
            <p className="mt-7 max-w-md text-base sm:text-lg text-bone/65 leading-relaxed">
              Fish world-class flats, explore mangroves and blue holes, and experience
              Andros with expert local guides — led by Captain Shawn Leadon.
            </p>
          </Reveal>

          <Reveal delay={760}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  onClick={() => booking.openBooking()}
                  className="inline-flex items-center gap-2.5 bg-clay text-ink font-bold px-8 py-4 rounded-full hover:bg-gold transition text-[0.95rem]"
                >
                  <CalendarCheck2 size={18} /> Plan your adventure
                </button>
              </Magnetic>
              <Magnetic strength={0.18}>
                <a
                  href="#finder"
                  className="inline-flex items-center gap-2.5 border border-bone/25 px-8 py-4 rounded-full text-[0.95rem] hover:border-bone/70 transition"
                >
                  Explore experiences
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={900} variant="fade">
            <div className="mt-12 flex items-center gap-6 text-[0.72rem] text-bone/50">
              <div>
                <p className="font-display text-2xl text-bone">30+</p>
                <p className="tracking-[0.18em] uppercase mt-1">Years of family legacy</p>
              </div>
              <span className="w-px h-9 bg-bone/15" aria-hidden />
              <div>
                <p className="font-display text-2xl text-bone">2</p>
                <p className="tracking-[0.18em] uppercase mt-1">Anglers max per boat</p>
              </div>
              <span className="w-px h-9 bg-bone/15" aria-hidden />
              <div>
                <p className="font-display text-2xl text-bone">100%</p>
                <p className="tracking-[0.18em] uppercase mt-1">Catch &amp; release</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — image panel */}
        <Reveal variant="mask" delay={350} className="relative lg:h-[86svh] h-[60svh]">
          <div className="relative h-full w-full lg:[clip-path:polygon(9%_0,100%_0,100%_100%,0_100%,0_7%)] rounded-3xl lg:rounded-none overflow-hidden">
            <Parallax speed={0.09} className="absolute inset-0">
              <Image
                src="/images/drone-flats-1.jpg"
                alt="Aerial view of the turquoise flats and mangrove creeks of Andros Island"
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover scale-[1.14]"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" />
            <div className="absolute bottom-5 right-6 text-right">
              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-bone/70">The Bights of Andros</p>
              <p className="text-[0.6rem] text-bone/45 mt-1">Largest shallow flats on Earth</p>
            </div>
          </div>

          {/* Floating experience tags */}
          {TAGS.map((t, i) => (
            <div
              key={t.label}
              className={`absolute ${t.pos} ${t.cls} z-10`}
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <span className="inline-flex items-center gap-2 bg-bone/95 text-ink text-[0.68rem] font-bold tracking-[0.16em] uppercase px-4 py-2.5 rounded-full shadow-[0_12px_32px_rgba(14,18,13,0.4)]">
                <t.icon size={13} className="text-ocean" /> {t.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 mx-auto max-w-[90rem] w-full px-5 sm:px-8 pb-6 flex items-center justify-between">
        <Link href="#finder" className="flex items-center gap-3 text-[0.66rem] tracking-[0.3em] uppercase text-bone/50 hover:text-bone transition group" aria-label="Scroll to the experience finder">
          <span className="relative w-px h-12 bg-bone/15 overflow-hidden">
            <span className="scroll-cue-line absolute inset-0 bg-clay" />
          </span>
          Scroll to discover
          <ArrowDown size={12} className="group-hover:translate-y-1 transition-transform" />
        </Link>
      </div>

      {/* Ticker */}
      <div className="relative z-10 border-t border-bone/10 bg-ink/60 backdrop-blur-sm overflow-hidden" aria-hidden>
        <div className="marquee-track flex w-max whitespace-nowrap py-3.5">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6 text-[0.66rem] tracking-[0.26em] uppercase text-bone/45">
              {t} <span className="text-clay">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
