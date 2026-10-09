"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Users, Plus, Check, CalendarCheck2 } from "lucide-react";
import { useTrip, useBooking } from "@/components/providers";
import { fmtUSD, type Experience } from "@/lib/data";

export default function ExperienceCard({
  exp,
  wide = false,
}: {
  exp: Experience;
  wide?: boolean;
}) {
  const trip = useTrip();
  const booking = useBooking();
  const saved = trip.has(exp.slug);

  return (
    <article
      className={`group relative flex flex-col rounded-3xl border border-bone/10 bg-moss/40 overflow-hidden
        hover:border-bone/25 transition-colors duration-500 media-zoom
        ${wide ? "w-[82vw] sm:w-[26rem] shrink-0" : "h-full"}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={exp.image}
          alt={exp.imageAlt}
          fill
          sizes={wide ? "(max-width:640px) 82vw, 416px" : "(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="text-[0.6rem] tracking-[0.24em] uppercase bg-ink/60 backdrop-blur px-3 py-1.5 rounded-full border border-bone/10">
            {exp.category}
          </span>
          {exp.badge && (
            <span className="text-[0.6rem] tracking-[0.24em] uppercase bg-clay text-ink font-bold px-3 py-1.5 rounded-full">
              {exp.badge}
            </span>
          )}
        </div>
        <button
          onClick={() => (saved ? trip.remove(exp.slug) : trip.add(exp.slug))}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${exp.name} from My Trip` : `Add ${exp.name} to My Trip`}
          className={`absolute top-4 right-4 h-9 pl-3 pr-3.5 rounded-full text-[0.68rem] font-semibold backdrop-blur
            flex items-center gap-1.5 transition-all duration-300 border
            ${saved
              ? "bg-clay text-ink border-clay"
              : "bg-ink/55 text-bone border-bone/15 hover:border-clay hover:text-clay"}`}
        >
          {saved ? <Check size={13} strokeWidth={3} /> : <Plus size={13} strokeWidth={3} />}
          {saved ? "In My Trip" : "My Trip"}
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-display text-2xl leading-tight">{exp.shortName}</p>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-sm text-bone/60 leading-relaxed line-clamp-2">{exp.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.72rem] text-bone/50">
          <span className="inline-flex items-center gap-1.5"><Clock size={12} className="text-lagoon" /> {exp.duration}</span>
          <span className="inline-flex items-center gap-1.5"><Users size={12} className="text-lagoon" /> {exp.capacityMax ? `Up to ${exp.capacityMax}` : "Flexible"}</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-fern inline-block" /> {exp.level}</span>
        </div>

        <div className="mt-5 pt-4 border-t border-bone/10 flex items-end justify-between gap-3 mt-auto">
          <div>
            <p className="text-[0.62rem] tracking-[0.22em] uppercase text-bone/40">From</p>
            <p className="font-display text-xl leading-tight">
              {exp.price.amount ? fmtUSD(exp.price.amount) : "Custom"}
              {exp.price.amount && (
                <span className="text-[0.65rem] text-bone/45 font-body font-normal ml-1.5">
                  {exp.price.unit}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link
            href={`/experiences/${exp.slug}`}
            className="inline-flex items-center justify-center gap-1.5 border border-bone/20 rounded-full px-4 py-2.5 text-[0.78rem] font-semibold hover:border-bone/60 transition"
          >
            Details <ArrowUpRight size={13} />
          </Link>
          <button
            onClick={() => booking.openBooking(exp.slug)}
            className="inline-flex items-center justify-center gap-1.5 bg-bone text-ink rounded-full px-4 py-2.5 text-[0.78rem] font-bold hover:bg-clay transition"
          >
            <CalendarCheck2 size={13} /> Check dates
          </button>
        </div>
      </div>
    </article>
  );
}
