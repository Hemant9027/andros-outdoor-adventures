"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, CalendarCheck2, Check, ChevronDown, Clock, Info, Leaf,
  Minus, Plus, Sparkles, Sun, Users, X as XIcon, ArrowLeft,
} from "lucide-react";
import { useBooking, useTrip } from "@/components/providers";
import { Reveal, RevealImage } from "@/components/motion";
import ExperienceCard from "@/components/ExperienceCard";
import {
  EXPERIENCES, BOOKING_POLICY, SITE, fmtUSD, type Experience,
} from "@/lib/data";

export default function ExperienceDetail({ exp }: { exp: Experience }) {
  const booking = useBooking();
  const trip = useTrip();
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const saved = trip.has(exp.slug);

  const related = EXPERIENCES.filter(
    (e) => e.slug !== exp.slug && (e.category === exp.category || e.styles.some((s) => exp.styles.includes(s)))
  ).slice(0, 3);

  const deposit = exp.price.amount ? Math.ceil(
    (exp.slug === "overnight-fish-camp-adventure" ? exp.price.amount : exp.price.amount) * 0.5
  ) : null;

  return (
    <div className="bg-ink grain">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[90rem] px-5 sm:px-8 pt-24 sm:pt-28">
        <ol className="flex flex-wrap items-center gap-2 text-[0.72rem] text-bone/45">
          <li><Link href="/" className="hover:text-bone link-sweep">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/#experiences" className="hover:text-bone link-sweep">Experiences</Link></li>
          <li aria-hidden>/</li>
          <li className="text-bone/80" aria-current="page">{exp.name}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 pt-8 pb-24">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
          {/* LEFT — gallery */}
          <div>
            <RevealImage className="relative aspect-[4/3] rounded-3xl overflow-hidden is-visible">
              <Image
                key={active}
                src={exp.gallery[active].src}
                alt={exp.gallery[active].alt}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 60vw"
                className="object-cover fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent pointer-events-none" />
              <span className="absolute top-4 left-4 text-[0.62rem] tracking-[0.24em] uppercase bg-ink/60 backdrop-blur px-3.5 py-2 rounded-full border border-bone/10">
                {exp.category}
              </span>
            </RevealImage>
            {exp.gallery.length > 1 && (
              <div className="mt-3.5 grid grid-cols-5 sm:grid-cols-6 gap-3" role="tablist" aria-label="Gallery">
                {exp.gallery.slice(0, 6).map((g, i) => (
                  <button
                    key={g.src + i}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`View image ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300
                      ${i === active ? "border-clay" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <Image src={g.src} alt="" fill sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Content column */}
            <article className="mt-12 space-y-14">
              <section aria-label="Overview">
                <Reveal>
                  <h2 className="font-display text-3xl tracking-tight">Overview</h2>
                  <p className="mt-4 text-bone/70 leading-[1.85] max-w-2xl">{exp.description}</p>
                  <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3 max-w-2xl">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-bone/75">
                        <Sparkles size={14} className="text-gold mt-0.5 shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </section>

              <section aria-label="What's included">
                <Reveal>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="rounded-3xl border border-fern/30 bg-moss/50 p-6">
                      <h3 className="flex items-center gap-2 font-display text-xl">
                        <Check size={18} className="text-fern" strokeWidth={3} /> What's included
                      </h3>
                      <ul className="mt-4 space-y-2.5">
                        {exp.includes.map((i) => (
                          <li key={i} className="text-sm text-bone/70 leading-relaxed flex gap-2">
                            <span className="text-fern mt-1 shrink-0" aria-hidden>•</span> {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl border border-bone/10 bg-pine/70 p-6">
                      <h3 className="flex items-center gap-2 font-display text-xl">
                        <XIcon size={18} className="text-ember" strokeWidth={3} /> Not included
                      </h3>
                      <ul className="mt-4 space-y-2.5">
                        {exp.notIncludes.map((i) => (
                          <li key={i} className="text-sm text-bone/60 leading-relaxed flex gap-2">
                            <span className="text-ember/70 mt-1 shrink-0" aria-hidden>•</span> {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </section>

              <section aria-label="Key details">
                <Reveal>
                  <h2 className="font-display text-3xl tracking-tight mb-5">Key details</h2>
                  <dl className="grid sm:grid-cols-2 gap-px rounded-3xl overflow-hidden border border-bone/10 bg-bone/10">
                    {exp.keyDetails.map((d) => (
                      <div key={d.label} className="bg-pine px-6 py-5">
                        <dt className="text-[0.62rem] tracking-[0.26em] uppercase text-bone/40">{d.label}</dt>
                        <dd className="text-sm text-bone/85 mt-1.5 leading-relaxed">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </section>

              <section aria-label="What to bring">
                <Reveal>
                  <div className="rounded-3xl border border-bone/10 bg-moss/40 p-7 sm:p-8">
                    <h2 className="font-display text-2xl tracking-tight">What to bring</h2>
                    <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                      {exp.whatToBring.map((i) => (
                        <li key={i} className="text-sm text-bone/70 flex items-center gap-2.5">
                          <Sun size={13} className="text-gold shrink-0" /> {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </section>

              <section aria-label="Booking policy">
                <Reveal>
                  <h2 className="font-display text-3xl tracking-tight mb-5">Booking policy</h2>
                  <div className="rounded-3xl border border-bone/10 bg-pine/70 p-7 sm:p-8 text-sm text-bone/70 leading-relaxed space-y-4">
                    <p><strong className="text-bone">Deposit.</strong> {BOOKING_POLICY.deposit}</p>
                    <p><strong className="text-bone">Balance.</strong> {BOOKING_POLICY.balance}</p>
                    <p><strong className="text-bone">Payment methods.</strong> {BOOKING_POLICY.methods.join(" · ")}</p>
                    <div>
                      <strong className="text-bone">Cancellation.</strong>
                      <ul className="mt-2 space-y-1.5">
                        {BOOKING_POLICY.cancellation.map((c) => (
                          <li key={c.window}><span className="text-gold">{c.window}:</span> {c.detail}</li>
                        ))}
                      </ul>
                    </div>
                    <p><strong className="text-bone">Weather.</strong> {BOOKING_POLICY.weather}</p>
                    <p className="border-t border-bone/10 pt-4 text-bone/50">{BOOKING_POLICY.insurance}</p>
                  </div>
                </Reveal>
              </section>

              <section aria-label="Frequently asked questions">
                <Reveal>
                  <h2 className="font-display text-3xl tracking-tight mb-5">Questions, answered</h2>
                  <div className="space-y-2.5">
                    {exp.faqs.map((f, i) => {
                      const isOpen = openFaq === i;
                      return (
                        <div key={f.q} className={`rounded-2xl border transition-colors ${isOpen ? "border-clay/40 bg-moss/50" : "border-bone/10"}`}>
                          <button
                            aria-expanded={isOpen}
                            onClick={() => setOpenFaq(isOpen ? null : i)}
                            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                          >
                            <span className="font-display text-lg leading-snug">{f.q}</span>
                            <ChevronDown size={17} className={`shrink-0 text-clay transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                          </button>
                          <div className="acc-panel" data-open={isOpen}>
                            <div>
                              <p className="px-6 pb-6 text-sm text-bone/65 leading-relaxed">{f.a}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Reveal>
              </section>
            </article>
          </div>

          {/* RIGHT — sticky booking panel */}
          <aside className="lg:sticky lg:top-24">
            <Reveal delay={120}>
              <Link href="/#experiences" className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase text-bone/45 hover:text-bone transition mb-5">
                <ArrowLeft size={13} /> All experiences
              </Link>
              <div className="rounded-3xl border border-bone/10 bg-pine/80 p-7 sm:p-8 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="font-display text-3xl sm:text-4xl leading-[1.04] tracking-tight">{exp.name}</h1>
                    <p className="mt-3 text-sm text-bone/60 leading-relaxed">{exp.tagline}</p>
                  </div>
                  <button
                    onClick={() => (saved ? trip.remove(exp.slug) : trip.add(exp.slug))}
                    aria-pressed={saved}
                    aria-label={saved ? "Remove from My Trip" : "Add to My Trip"}
                    className={`shrink-0 w-11 h-11 rounded-full border grid place-items-center transition-all
                      ${saved ? "bg-clay border-clay text-ink" : "border-bone/20 text-bone/60 hover:border-clay hover:text-clay"}`}
                  >
                    {saved ? <Check size={17} strokeWidth={3} /> : <Plus size={17} />}
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.species?.map((s) => (
                    <span key={s} className="text-[0.66rem] tracking-[0.16em] uppercase border border-lagoon/30 text-lagoon rounded-full px-3 py-1.5">{s}</span>
                  ))}
                  {exp.species && (
                    <span className="text-[0.66rem] tracking-[0.16em] uppercase border border-fern/40 text-sage rounded-full px-3 py-1.5 inline-flex items-center gap-1.5">
                      <Leaf size={11} /> 100% catch &amp; release
                    </span>
                  )}
                </div>

                <dl className="mt-6 space-y-3 border-t border-bone/10 pt-6 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-bone/50 inline-flex items-center gap-2"><Clock size={14} className="text-lagoon" /> Duration</dt>
                    <dd className="text-right">{exp.duration}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-bone/50 inline-flex items-center gap-2"><Users size={14} className="text-lagoon" /> Capacity</dt>
                    <dd className="text-right">{exp.capacity}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-bone/50 inline-flex items-center gap-2"><Sun size={14} className="text-lagoon" /> Season</dt>
                    <dd className="text-right">{exp.season}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-bone/50 inline-flex items-center gap-2"><Info size={14} className="text-lagoon" /> Level</dt>
                    <dd className="text-right">{exp.level}</dd>
                  </div>
                </dl>

                <div className="mt-6 rounded-2xl bg-moss/60 border border-bone/10 p-5">
                  {exp.price.amount ? (
                    <>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[0.62rem] tracking-[0.26em] uppercase text-bone/45">From</span>
                        <span className="font-display text-3xl">{fmtUSD(exp.price.amount)}</span>
                      </div>
                      <p className="text-[0.7rem] text-bone/50 mt-1">{exp.price.unit}</p>
                      <p className="text-[0.7rem] text-gold mt-3 border-t border-bone/10 pt-3">
                        {fmtUSD(deposit!)} deposit (50%) holds your date
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-2xl">Custom pricing</p>
                      <p className="text-[0.72rem] text-bone/55 mt-1.5 leading-relaxed">{exp.price.note}</p>
                    </>
                  )}
                </div>

                <button
                  onClick={() => booking.openBooking(exp.slug)}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2.5 bg-clay text-ink font-bold px-6 py-4.5 rounded-full hover:bg-gold transition text-base"
                >
                  <CalendarCheck2 size={18} /> Check availability
                </button>
                <p className="mt-3.5 text-center text-[0.68rem] text-bone/40">
                  Or call {SITE.phone} — every trip is customized
                </p>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24" aria-label="Related experiences">
            <div className="flex items-end justify-between gap-6 mb-8">
              <h2 className="font-display text-3xl tracking-tight">Keep exploring</h2>
              <Link href="/#experiences" className="hidden sm:inline-flex items-center gap-2 text-sm text-clay link-sweep">
                All experiences <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((e) => (
                <ExperienceCard key={e.slug} exp={e} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
