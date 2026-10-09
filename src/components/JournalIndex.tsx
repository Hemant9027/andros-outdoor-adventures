"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/motion";
import { JOURNAL, getExperience } from "@/lib/data";

const FILTERS = ["All", "Fishing", "Nature", "Adventure"];

export default function JournalIndex() {
  const [filter, setFilter] = useState("All");
  const list = JOURNAL.filter((j) => filter === "All" || j.category === filter);

  return (
    <div className="bg-ink grain">
      <header className="mx-auto max-w-[90rem] px-5 sm:px-8 pt-36 pb-12 lg:pt-44">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[0.7rem] text-bone/45 mb-6">
            <li><Link href="/" className="hover:text-bone link-sweep">Home</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-bone/80">Field Journal</li>
          </ol>
        </nav>
        <Reveal>
          <p className="eyebrow text-lagoon">Stories from the flats</p>
        </Reveal>
        <Reveal delay={140}>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] tracking-tight max-w-4xl">
            The Andros <em className="not-italic text-clay">Field Journal</em>
          </h1>
        </Reveal>
        <Reveal delay={280}>
          <p className="mt-6 max-w-2xl text-bone/65 leading-relaxed text-lg">
            Long-form knowledge from the water — every entry built from what AOA actually
            does on this island, and every one ending at a bookable experience.
          </p>
        </Reveal>

        <Reveal delay={380}>
          <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label="Filter journal entries">
            {FILTERS.map((f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-full text-[0.78rem] font-medium border transition-all
                  ${filter === f ? "bg-clay border-clay text-ink font-bold" : "border-bone/15 text-bone/65 hover:border-bone/45"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
      </header>

      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" aria-live="polite">
          {list.map((j, i) => {
            const related = getExperience(j.related);
            return (
              <Reveal key={j.slug} delay={i * 100}>
                <Link href={`/journal/${j.slug}`} className="group flex flex-col h-full rounded-3xl border border-bone/10 bg-moss/40 overflow-hidden hover:border-bone/25 transition-colors duration-500 media-zoom">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={j.image} alt={j.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    <span className="absolute top-4 left-4 text-[0.6rem] tracking-[0.24em] uppercase bg-ink/60 backdrop-blur px-3 py-1.5 rounded-full border border-bone/10">
                      {j.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-display text-xl leading-snug group-hover:text-clay transition-colors">{j.title}</h2>
                    <p className="text-sm text-bone/55 leading-relaxed mt-3 line-clamp-3">{j.excerpt}</p>
                    <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                      <p className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase text-clay">
                        <BookOpen size={12} /> Read entry
                      </p>
                      {related && (
                        <span className="text-[0.62rem] text-bone/40 truncate">→ {related.shortName}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {list.length === 0 && (
          <p className="text-bone/50 text-sm py-16 text-center">No entries in this category yet.</p>
        )}
      </div>
    </div>
  );
}
