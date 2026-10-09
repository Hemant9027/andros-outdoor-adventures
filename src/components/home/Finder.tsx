"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { EXPERIENCES, FINDER_FILTERS, ACTIVITY_MAP } from "@/lib/data";
import ExperienceCard from "@/components/ExperienceCard";
import { Reveal } from "@/components/motion";

type Filters = {
  activity: string | null;
  level: string | null;
  duration: string | null;
  style: string | null;
};

const GROUP_META: { key: keyof Filters; title: string; hint: string }[] = [
  { key: "activity", title: "Activity", hint: "What do you want to do?" },
  { key: "level", title: "Experience level", hint: "How seasoned are you?" },
  { key: "duration", title: "Duration", hint: "How much time do you have?" },
  { key: "style", title: "Trip style", hint: "What's the mood?" },
];

export default function Finder() {
  const [filters, setFilters] = useState<Filters>({
    activity: null,
    level: null,
    duration: null,
    style: null,
  });

  const results = useMemo(() => {
    return EXPERIENCES.filter((e) => {
      if (filters.activity && !ACTIVITY_MAP[filters.activity]?.includes(e.slug)) return false;
      if (filters.level && !(e.level === filters.level || e.level === "All levels")) return false;
      if (filters.duration && e.durationGroup !== filters.duration) return false;
      if (filters.style && !e.styles.includes(filters.style)) return false;
      return true;
    });
  }, [filters]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  const toggle = (key: keyof Filters, value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key] === value ? null : value }));

  return (
    <section id="finder" className="relative py-20 lg:py-28 bg-ink" aria-label="Experience finder">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.9fr_2fr] gap-10 items-start">
          {/* Section intro */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow text-lagoon">Find your adventure</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tight">
                What kind of <em className="not-italic text-clay">Andros</em> are you looking for?
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-5 text-bone/60 leading-relaxed max-w-sm">
                Four questions. Answer any of them — or none — and we'll match you with the
                experiences AOA actually runs on the island.
              </p>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-bone/10 bg-moss/40 px-5 py-4">
                <Search size={18} className="text-clay" />
                <p className="text-sm">
                  <span className="font-display text-2xl align-middle mr-2" aria-live="polite">{results.length}</span>
                  <span className="text-bone/60">matching experience{results.length === 1 ? "" : "s"}</span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* Filters + results */}
          <div>
            <Reveal delay={150}>
              <div className="rounded-3xl border border-bone/10 bg-pine/70 p-5 sm:p-7 space-y-6">
                <div className="flex items-center justify-between">
                  <p className="inline-flex items-center gap-2 text-[0.66rem] tracking-[0.28em] uppercase text-bone/50">
                    <SlidersHorizontal size={14} className="text-clay" /> Refine
                  </p>
                  {activeCount > 0 && (
                    <button
                      onClick={() => setFilters({ activity: null, level: null, duration: null, style: null })}
                      className="inline-flex items-center gap-1.5 text-[0.72rem] text-clay hover:text-gold transition"
                    >
                      <RotateCcw size={12} /> Clear {activeCount} filter{activeCount > 1 ? "s" : ""}
                    </button>
                  )}
                </div>

                {GROUP_META.map((g) => (
                  <fieldset key={g.key}>
                    <legend className="sr-only">{g.title}</legend>
                    <p className="text-sm font-semibold mb-1">{g.title}</p>
                    <p className="text-[0.72rem] text-bone/45 mb-3">{g.hint}</p>
                    <div className="flex flex-wrap gap-2">
                      {FINDER_FILTERS[g.key].map((opt) => {
                        const active = filters[g.key] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggle(g.key, opt)}
                            className={`px-4 py-2.5 rounded-full text-[0.78rem] font-medium border transition-all duration-300
                              ${active
                                ? "bg-clay border-clay text-ink font-bold shadow-[0_6px_20px_rgba(200,128,62,0.35)]"
                                : "border-bone/15 text-bone/70 hover:border-bone/45 hover:text-bone"}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            </Reveal>

            {/* Results */}
            <div className="mt-8 grid sm:grid-cols-2 gap-5" aria-live="polite" aria-label="Matching experiences">
              {results.map((e) => (
                <ExperienceCard key={`${e.slug}-${activeCount}`} exp={e} />
              ))}
              {results.length === 0 && (
                <div className="sm:col-span-2 rounded-3xl border border-dashed border-bone/20 p-12 text-center">
                  <p className="font-display text-2xl">No exact match</p>
                  <p className="text-sm text-bone/55 mt-2 max-w-sm mx-auto">
                    Every AOA trip is customized — clear a filter, or call Captain Shawn to design something specific.
                  </p>
                  <button
                    onClick={() => setFilters({ activity: null, level: null, duration: null, style: null })}
                    className="mt-6 inline-flex items-center gap-2 border border-clay text-clay px-6 py-3 rounded-full text-sm hover:bg-clay hover:text-ink transition"
                  >
                    <RotateCcw size={14} /> Start over
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
