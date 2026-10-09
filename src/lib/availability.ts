/* ------------------------------------------------------------------
   Simulated availability — FRONTEND DEMO ONLY.
   Deterministic pseudo-availability derived from date + experience,
   so the demo behaves consistently. NOT live availability.
------------------------------------------------------------------- */

export type DayStatus = "open" | "limited" | "unavailable" | "offseason" | "past";

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function dayStatus(iso: string, slug: string): DayStatus {
  const d = new Date(iso + "T12:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  if (d < today) return "past";

  // Fish camp is seasonal: November–April only (real business rule)
  if (slug === "overnight-fish-camp-adventure") {
    const m = d.getMonth(); // 0 = Jan
    if (m >= 4 && m <= 9) return "offseason";
  }

  const h = hash(`${iso}|${slug}`);
  const r = h % 100;
  if (r < 14) return "unavailable";
  if (r < 30) return "limited";
  return "open";
}

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function toISO(y: number, m: number, day: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function formatDateLong(iso?: string | null) {
  if (!iso) return "Select a date";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
