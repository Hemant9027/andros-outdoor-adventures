"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  dayStatus,
  toISO,
  MONTHS,
  WEEKDAYS,
  type DayStatus,
} from "@/lib/availability";

const STATUS_STYLE: Record<DayStatus, string> = {
  open: "bg-fern/25 text-bone hover:bg-fern/45 cursor-pointer",
  limited: "bg-gold/15 text-gold hover:bg-gold/25 cursor-pointer",
  unavailable: "text-bone/25 cursor-not-allowed line-through",
  offseason: "text-bone/25 cursor-not-allowed",
  past: "text-bone/20 cursor-not-allowed",
};

export default function Calendar({
  slug,
  selected,
  onSelect,
}: {
  slug: string;
  selected: string | null;
  onSelect: (iso: string) => void;
}) {
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const gridRef = useRef<HTMLDivElement>(null);
  const [focusIso, setFocusIso] = useState<string | null>(null);

  const cells = useMemo(() => {
    const first = new Date(view.y, view.m, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    const arr: ({ iso: string; day: number; status: DayStatus } | null)[] = [];
    for (let i = 0; i < startDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = toISO(view.y, view.m, d);
      arr.push({ iso, day: d, status: dayStatus(iso, slug) });
    }
    return arr;
  }, [view, slug]);

  const shiftMonth = (dir: number) => {
    setView((v) => {
      const nm = v.m + dir;
      const ny = v.y + Math.floor(nm / 12);
      return { y: ny, m: ((nm % 12) + 12) % 12 };
    });
  };

  const isPrevDisabled =
    view.y === today.getFullYear() && view.m === today.getMonth();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!focusIso) return;
    const d = new Date(focusIso + "T12:00:00");
    const delta =
      e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 :
      e.key === "ArrowDown" ? 7 : e.key === "ArrowUp" ? -7 : 0;
    if (!delta) return;
    e.preventDefault();
    d.setDate(d.getDate() + delta);
    const iso = toISO(d.getFullYear(), d.getMonth(), d.getDate());
    setFocusIso(iso);
    if (d.getFullYear() !== view.y || d.getMonth() !== view.m) {
      setView({ y: d.getFullYear(), m: d.getMonth() });
    }
    requestAnimationFrame(() => {
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-iso="${iso}"]`)?.focus();
    });
  };

  const todayIso = toISO(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={isPrevDisabled}
          aria-label="Previous month"
          className="w-10 h-10 rounded-full border border-bone/15 grid place-items-center transition hover:border-bone/40 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
        </button>
        <p className="font-display text-xl" aria-live="polite">
          {MONTHS[view.m]} <span className="text-bone/50">{view.y}</span>
        </p>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          aria-label="Next month"
          className="w-10 h-10 rounded-full border border-bone/15 grid place-items-center transition hover:border-bone/40"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1.5" role="row">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[0.65rem] tracking-[0.18em] uppercase text-bone/40 py-1">
            {d}
          </div>
        ))}
      </div>

      <div
        ref={gridRef}
        role="grid"
        aria-label={`Available dates for ${MONTHS[view.m]} ${view.y}`}
        className="grid grid-cols-7 gap-1"
        onKeyDown={onKeyDown}
      >
        {cells.map((c, i) => {
          if (c === null)
            return <div key={`x-${i}`} aria-hidden className="aspect-square" />;
          const isSel = selected === c.iso;
          const isToday = c.iso === todayIso;
          const selectable = c.status === "open" || c.status === "limited";
          return (
            <button
              key={c.iso}
              type="button"
              data-iso={c.iso}
              role="gridcell"
              aria-selected={isSel}
              aria-label={`${MONTHS[view.m]} ${c.day}, ${c.status}${isToday ? ", today" : ""}`}
              disabled={!selectable}
              onClick={() => {
                onSelect(c.iso);
                setFocusIso(c.iso);
              }}
              onFocus={() => setFocusIso(c.iso)}
              tabIndex={selectable ? 0 : -1}
              className={`cal-cell relative aspect-square rounded-xl text-sm grid place-items-center border
                ${isSel
                  ? "bg-clay text-ink font-bold border-clay shadow-[0_0_0_3px_rgba(200,128,62,0.35)]"
                  : `${STATUS_STYLE[c.status]} border-transparent`}
                ${isToday && !isSel ? "ring-1 ring-lagoon/60" : ""}`}
            >
              {c.day}
              {c.status === "limited" && !isSel && (
                <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-gold" aria-hidden />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.7rem] tracking-wide text-bone/55">
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-fern/45 inline-block" /> Open
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-gold/25 inline-block" /> Limited
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-bone/10 inline-block" /> Unavailable
        </span>
        {slug === "overnight-fish-camp-adventure" && (
          <span className="inline-flex items-center gap-2 text-gold">
            Season runs November – April
          </span>
        )}
      </div>
      <p className="mt-3 text-[0.68rem] text-bone/40 leading-relaxed">
        Simulated availability for this demo — not live data.
      </p>
    </div>
  );
}
