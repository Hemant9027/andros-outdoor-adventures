"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarCheck2 } from "lucide-react";
import { useBooking } from "@/components/providers";
import { Reveal, RevealImage } from "@/components/motion";
import { getExperience, JOURNAL, fmtUSD } from "@/lib/data";

export default function JournalArticle({ slug }: { slug: string }) {
  const booking = useBooking();
  const article = JOURNAL.find((j) => j.slug === slug)!;
  const related = getExperience(article.related);
  const others = JOURNAL.filter((j) => j.slug !== slug);

  return (
    <div className="bg-ink grain">
      {/* Hero */}
      <header className="relative min-h-[60svh] flex items-end overflow-hidden">
        <Image
          src={article.image}
          alt={article.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" aria-hidden />
        <div className="relative mx-auto max-w-4xl w-full px-5 sm:px-8 pb-14 pt-40">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.7rem] text-bone/50 mb-6">
              <li><Link href="/" className="hover:text-bone link-sweep">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/journal" className="hover:text-bone link-sweep">Field Journal</Link></li>
              <li aria-hidden>/</li>
              <li className="text-bone/85 truncate max-w-[12rem]" aria-current="page">{article.title}</li>
            </ol>
          </nav>
          <Reveal>
            <p className="eyebrow text-gold">{article.category}</p>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.02] tracking-tight">
              {article.title}
            </h1>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-14 lg:py-20">
        {/* Body */}
        <article>
          {article.body.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className={`leading-[1.9] ${i === 0 ? "text-lg text-bone/85 font-display" : "mt-6 text-bone/70"}`}>
                {p}
              </p>
            </Reveal>
          ))}
        </article>

        {/* Conversion card */}
        {related && (
          <Reveal delay={150}>
            <aside className="mt-14 rounded-3xl border border-clay/30 bg-moss/50 overflow-hidden">
              <div className="grid sm:grid-cols-[200px_1fr]">
                <div className="relative h-40 sm:h-auto">
                  <Image src={related.image} alt={related.imageAlt} fill sizes="200px" className="object-cover" />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-[0.62rem] tracking-[0.28em] uppercase text-gold">Experience it yourself</p>
                  <p className="font-display text-2xl mt-2">{related.name}</p>
                  <p className="text-sm text-bone/60 mt-2 leading-relaxed">
                    {related.duration} · {related.price.amount ? `From ${fmtUSD(related.price.amount)}` : "Custom pricing"}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={() => booking.openBooking(related.slug)}
                      className="inline-flex items-center gap-2 bg-clay text-ink text-sm font-bold px-6 py-3 rounded-full hover:bg-gold transition"
                    >
                      <CalendarCheck2 size={15} /> Check dates
                    </button>
                    <Link
                      href={`/experiences/${related.slug}`}
                      className="inline-flex items-center gap-2 border border-bone/25 text-sm px-6 py-3 rounded-full hover:border-bone/60 transition"
                    >
                      Trip details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>
        )}

        {/* Keep reading */}
        <nav className="mt-16" aria-label="More journal entries">
          <div className="flex items-center justify-between mb-7">
            <h2 className="font-display text-2xl tracking-tight">Keep reading</h2>
            <Link href="/journal" className="inline-flex items-center gap-2 text-[0.74rem] tracking-[0.18em] uppercase text-bone/45 hover:text-bone transition">
              <ArrowLeft size={13} /> All entries
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {others.map((j) => (
              <Reveal key={j.slug}>
                <Link href={`/journal/${j.slug}`} className="group flex flex-col h-full rounded-3xl border border-bone/10 bg-moss/40 overflow-hidden hover:border-bone/25 transition media-zoom">
                  <RevealImage className="relative aspect-[16/9]">
                    <Image src={j.image} alt={j.alt} fill sizes="(max-width:640px) 100vw, 400px" className="object-cover" />
                  </RevealImage>
                  <div className="p-5">
                    <p className="text-[0.6rem] tracking-[0.24em] uppercase text-lagoon">{j.category}</p>
                    <p className="font-display text-lg leading-snug mt-2 group-hover:text-clay transition-colors">{j.title}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
