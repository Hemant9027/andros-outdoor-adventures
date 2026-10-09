"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getExperience } from "@/lib/data";

/* ============================ MY TRIP ============================ */

export type TripItem = { slug: string };

type TripCtx = {
  items: TripItem[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  has: (slug: string) => boolean;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
};

const TripContext = createContext<TripCtx | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TripItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("aoa-trip");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("aoa-trip", JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const add = useCallback(
    (slug: string) =>
      setItems((prev) =>
        prev.some((i) => i.slug === slug) ? prev : [...prev, { slug }]
      ),
    []
  );
  const remove = useCallback(
    (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug)),
    []
  );
  const has = useCallback((slug: string) => items.some((i) => i.slug === slug), [items]);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, add, remove, has, clear, drawerOpen, setDrawerOpen }),
    [items, add, remove, has, clear, drawerOpen]
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used within TripProvider");
  return ctx;
}

/* ========================== BOOKING ENGINE ========================== */
/* Frontend-only demo booking flow. No payment is processed, no data
   leaves the browser, availability is simulated.                      */

export const BOOKING_STEPS = [
  "Experience",
  "Date",
  "Guests",
  "Review",
  "Details",
  "Payment",
  "Confirm",
] as const;

export type GuestInfo = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

type BookingCtx = {
  open: boolean;
  step: number;
  slug: string | null;
  date: string | null;
  guests: number;
  info: GuestInfo;
  method: "card" | "wire";
  bookingRef: string | null;
  prefillFromTrip: boolean;
  openBooking: (slug?: string, fromTrip?: boolean) => void;
  closeBooking: () => void;
  goTo: (step: number) => void;
  next: () => void;
  back: () => void;
  setSlug: (s: string) => void;
  setDate: (iso: string | null) => void;
  setGuests: (n: number) => void;
  setInfo: (i: GuestInfo) => void;
  setMethod: (m: "card" | "wire") => void;
  confirm: () => void;
  reset: () => void;
};

const BookingContext = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [slug, setSlugState] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [guests, setGuests] = useState(1);
  const [info, setInfo] = useState<GuestInfo>({ name: "", email: "", phone: "", notes: "" });
  const [method, setMethod] = useState<"card" | "wire">("card");
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [prefillFromTrip, setPrefillFromTrip] = useState(false);

  // Lock body scroll while the engine is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const reset = useCallback(() => {
    setStep(0);
    setSlugState(null);
    setDate(null);
    setGuests(1);
    setInfo({ name: "", email: "", phone: "", notes: "" });
    setMethod("card");
    setBookingRef(null);
    setPrefillFromTrip(false);
  }, []);

  const openBooking = useCallback(
    (s?: string, fromTrip = false) => {
      reset();
      if (s) {
        setSlugState(s);
        setStep(1); // jump past experience selection when preselected
        const exp = getExperience(s);
        if (exp?.capacityMax) setGuests(1);
      }
      setPrefillFromTrip(fromTrip);
      setOpen(true);
    },
    [reset]
  );

  const closeBooking = useCallback(() => setOpen(false), []);

  const goTo = useCallback((n: number) => setStep(() => Math.min(Math.max(n, 0), 6)), []);
  const next = useCallback(() => setStep((s) => Math.min(s + 1, 6)), []);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  const setSlug = useCallback((s: string) => {
    setSlugState(s);
    setDate(null);
  }, []);

  const confirm = useCallback(() => {
    const ref = `AOA-DEMO-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setBookingRef(ref);
    setStep(6);
  }, []);

  const value = useMemo(
    () => ({
      open, step, slug, date, guests, info, method, bookingRef, prefillFromTrip,
      openBooking, closeBooking, goTo, next, back, setSlug, setDate, setGuests,
      setInfo, setMethod, confirm, reset,
    }),
    [open, step, slug, date, guests, info, method, bookingRef, prefillFromTrip,
     openBooking, closeBooking, goTo, next, back, setSlug, confirm, reset]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

/* Combined provider tree */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <TripProvider>
      <BookingProvider>{children}</BookingProvider>
    </TripProvider>
  );
}

/* ============ Booking math (real business policy: 50% deposit) ============ */

export function useBookingPricing() {
  const { slug, guests } = useBooking();
  const exp = slug ? getExperience(slug) : undefined;
  if (!exp || exp.price.amount == null) {
    return { priced: false as const, total: 0, deposit: 0, balance: 0, label: "Custom quote" };
  }
  // Fish camp is priced per person, per night (1 night)
  const total =
    exp.slug === "overnight-fish-camp-adventure"
      ? exp.price.amount * guests
      : exp.price.amount;
  const deposit = Math.ceil(total * 0.5);
  return { priced: true as const, total, deposit, balance: total - deposit, label: "" };
}
