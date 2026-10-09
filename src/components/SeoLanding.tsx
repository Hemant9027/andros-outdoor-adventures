"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck2, ChevronDown, Compass } from "lucide-react";
import { useBooking } from "@/components/providers";
import { Reveal, RevealImage, Parallax } from "@/components/motion";
import ExperienceCard from "@/components/ExperienceCard";
import { getExperience, getSeoPage, type SeoPage } from "@/lib/data";

export default function SeoLanding({ page }: { page: SeoPage }) {
  const booking = useBooking();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const exps = page.experiences.map(getExperience).filter(Boolean);
  const related = page.relatedPages.map(getSeoPage).filter(Boolean);
  const firstPriced = exps.find((e) => e!.price.amount);

  return (
    <div className="bg-ink grain">
      {/* Hero */}
      <header className="relative min-h-[72svh] flex items-end overflow-hidden">
        <Parallax speed={0.08} className="absolute inset-0">
          <Image
            src={page.hero}
            alt={page.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover scale-110"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" aria-hidden />
        <div className="relative mx-auto max-w-[90rem] w-full px-5 sm:px-8 pb-14 pt-40">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.7rem] text-bone/50 mb-6">
              <li><Link href="/" className="hover:text-bone link-sweep">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-bone/85" aria-current="page">{page.h1}</li>
            </ol>
          </nav>
          <Reveal>
            <p className="eyebrow text-gold">{page.eyebrow}</p>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[0.98] tracking-tight max-w-4xl">
              {page.h1}
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-7 flex flex-wrap gap-4">
              <button
                onClick={() => booking.openBooking(firstPriced?.slug ?? exps[0]?.slug)}
                className="inline-flex items-center gap-2.5 bg-clay text-ink font-bold px-8 py-4 rounded-full hover:bg-gold transition"
              >
                <CalendarCheck2 size={17} /> Check availability
              </button>
              <a href="#guide" className="inline-flex items-center gap-2 border border-bone/30 px-8 py-4 rounded-full hover:border-bone/70 transition">
                Read the guide <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Guide body */}
      <div id="guide" className="mx-auto max-w-[90rem] px-5 sm:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
          <article>
            {page.intro.map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <p className={`leading-[1.85] max-w-2xl ${i === 0 ? "text-lg text-bone/80" : "mt-5 text-bone/65"}`}>
                  {p}
                </p>
              </Reveal>
            ))}

            <div className="mt-12 space-y-10">
              {page.sections.map((s, i) => (
                <Reveal key={s.heading} delay={i * 90}>
                  <section className="border-l-2 border-clay/60 pl-6 sm:pl-8">
                    <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{s.heading}</h2>
                    <p className="mt-3 text-bone/65 leading-[1.85] max-w-2xl">{s.body}</p>
                  </section>
                </Reveal>
              ))}
            </div>

            {/* FAQ */}
            <Reveal delay={100}>
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight mt-14 mb-5">
                Frequently asked
              </h2>
            </Reveal>
            <div className="space-y-2.5 max-w-2xl">
              {page.faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <Reveal key={f.q} delay={i * 70}>
                    <div className={`rounded-2xl border transition-colors ${isOpen ? "border-clay/40 bg-moss/50" : "border-bone/10"}`}>
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
                  </Reveal>
                );
              })}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 space-y-6">
            <Reveal delay={150}>
              <RevealImage className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <div className="reveal-img absolute inset-0">
                  <Image src={page.hero} alt={page.heroAlt} fill sizes="(max-width:1024px) 100vw, 420px" className="object-cover" />
                </div>
              </RevealImage>
            </Reveal>
            <Reveal delay={250}>
              <div className="rounded-3xl border border-bone/10 bg-pine/80 p-6">
                <p className="inline-flex items-center gap-2 text-[0.62rem] tracking-[0.28em] uppercase text-lagoon">
                  <Compass size={13} /> Keep exploring Andros
                </p>
                <ul className="mt-4 space-y-1">
                  {related.map((r) => r && (
                    <li key={r.slug}>
                      <Link
                        href={`/${r.slug}`}
                        className="group flex items-center justify-between gap-3 px-3 py-2.5 -mx-3 rounded-xl hover:bg-moss/60 transition"
                      >
                        <span className="text-sm group-hover:text-clay transition">{r.h1}</span>
                        <ArrowRight size={13} className="text-bone/35 group-hover:text-clay group-hover:translate-x-0.5 transition shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Bookable experiences — conversion block */}
        <section className="mt-20" aria-label="Related experiences you can book">
          <div className="flex items-end justify-between gap-6 mb-8">
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
              Make it happen
            </h2>
            <p className="hidden md:block text-sm text-bone/50 max-w-xs text-right">
              Real AOA experiences tied to this guide — every one a direct booking path.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {exps.map((e) => e && <ExperienceCard key={e.slug} exp={e} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
