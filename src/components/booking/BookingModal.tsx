"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  X, ArrowLeft, ArrowRight, Check, Minus, Plus, Users, Clock,
  CalendarDays, CreditCard, Landmark, ShieldCheck, MapPin, Sparkles,
} from "lucide-react";
import {
  useBooking,
  useBookingPricing,
  useTrip,
  BOOKING_STEPS,
} from "@/components/providers";
import { EXPERIENCES, getExperience, fmtUSD } from "@/lib/data";
import { formatDateLong } from "@/lib/availability";
import Calendar from "./Calendar";

export default function BookingModal() {
  const b = useBooking();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!b.open) return;
    const prevActive = document.activeElement as HTMLElement | null;
    // Focus the dialog for screen readers
    setTimeout(() => dialogRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") b.closeBooking();
      if (e.key === "Tab" && dialogRef.current) {
        // Simple focus trap
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prevActive?.focus?.();
    };
  }, [b.open, b.closeBooking, b.step]);

  if (!b.open) return null;

  const exp = b.slug ? getExperience(b.slug) : undefined;
  const detailsOk =
    b.info.name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(b.info.email);
  const canContinue =
    b.step === 0 ? !!b.slug :
    b.step === 1 ? !!b.date :
    b.step === 2 ? b.guests >= 1 :
    b.step === 3 ? true :
    b.step === 4 ? detailsOk :
    b.step === 5 ? false : true;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Book your Andros adventure"
    >
      {/* Backdrop */}
      <button
        aria-label="Close booking"
        onClick={b.closeBooking}
        className="absolute inset-0 bg-ink/80 backdrop-blur-md fade-in cursor-default"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="modal-in relative w-full sm:max-w-3xl lg:max-w-4xl h-[100dvh] sm:h-auto sm:max-h-[92dvh]
          bg-pine border border-bone/10 sm:rounded-3xl overflow-hidden flex flex-col outline-none shadow-2xl"
      >
        {/* Header */}
        <header className="shrink-0 border-b border-bone/10 bg-pine/95">
          <div className="flex items-center justify-between px-5 sm:px-8 pt-5 pb-4">
            <div>
              <p className="text-[0.62rem] tracking-[0.3em] uppercase text-lagoon mb-1">
                Andros Outdoor Adventures · Booking demo
              </p>
              <p className="font-display text-lg sm:text-2xl leading-none">
                {b.step === 6 ? "Reservation received" : "Plan your adventure"}
              </p>
            </div>
            <button
              onClick={b.closeBooking}
              aria-label="Close booking dialog"
              className="w-10 h-10 rounded-full border border-bone/15 grid place-items-center hover:border-bone/50 hover:rotate-90 transition-all duration-300"
            >
              <X size={17} />
            </button>
          </div>

          {/* Step indicator */}
          <div className="px-5 sm:px-8 pb-4">
            <ol className="flex items-center gap-1.5 sm:gap-2" aria-label="Booking steps">
              {BOOKING_STEPS.map((label, i) => {
                const done = i < b.step;
                const active = i === b.step;
                return (
                  <li key={label} className="flex-1">
                    <div
                      className={`h-1 rounded-full progress-track relative overflow-hidden ${
                        done || active ? "" : ""
                      }`}
                    >
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${
                          done ? "w-full bg-clay" : active ? "w-1/2 bg-clay" : "w-0"
                        }`}
                      />
                    </div>
                    <p
                      className={`mt-1.5 text-[0.55rem] sm:text-[0.6rem] tracking-[0.14em] uppercase truncate ${
                        active ? "text-clay" : done ? "text-bone/60" : "text-bone/30"
                      }`}
                      aria-current={active ? "step" : undefined}
                    >
                      <span className="hidden sm:inline">{i + 1} {label}</span>
                      <span className="sm:hidden">{label}</span>
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
          <div key={b.step} className="step-in">
            {b.step === 0 && <StepExperience />}
            {b.step === 1 && <StepDate />}
            {b.step === 2 && <StepGuests />}
            {b.step === 3 && <StepReview />}
            {b.step === 4 && <StepDetails />}
            {b.step === 5 && <StepPayment />}
            {b.step === 6 && <StepConfirm />}
          </div>
        </div>

        {/* Footer */}
        {b.step < 6 && (
          <footer className="shrink-0 border-t border-bone/10 bg-pine/95 px-5 sm:px-8 py-4 flex items-center justify-between gap-3">
            <button
              onClick={b.back}
              disabled={b.step === 0}
              className="inline-flex items-center gap-2 text-sm text-bone/60 hover:text-bone disabled:opacity-30 transition px-3 py-2"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <TripSummaryMini />

            {b.step <= 4 && (
              <button
                onClick={b.next}
                disabled={!canContinue}
                className="inline-flex items-center gap-2 bg-clay text-ink font-semibold text-sm px-6 py-3 rounded-full
                  hover:bg-gold transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {b.step === 4 ? "Continue to payment" : "Continue"} <ArrowRight size={16} />
              </button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}

/* --------------------------- Mini summary --------------------------- */
function TripSummaryMini() {
  const b = useBooking();
  const exp = b.slug ? getExperience(b.slug) : undefined;
  if (!exp) return <span className="hidden md:block text-xs text-bone/40">Choose an experience to begin</span>;
  return (
    <div className="hidden md:flex items-center gap-3 text-xs text-bone/60 min-w-0">
      <span className="font-semibold text-bone truncate max-w-[10rem]">{exp.shortName}</span>
      <span aria-hidden className="w-1 h-1 rounded-full bg-bone/30" />
      <span>{formatDateLong(b.date)}</span>
      <span aria-hidden className="w-1 h-1 rounded-full bg-bone/30" />
      <span>{b.guests} {exp.capacityMax === 2 ? (b.guests === 1 ? "angler" : "anglers") : b.guests === 1 ? "guest" : "guests"}</span>
    </div>
  );
}

/* --------------------------- STEP 1: Experience --------------------------- */
function StepExperience() {
  const b = useBooking();
  return (
    <div>
      <StepHeading
        title="Choose your experience"
        sub="Every trip is customized to your preferences with consideration to weather conditions."
      />
      <div className="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Experiences">
        {EXPERIENCES.map((e) => {
          const active = b.slug === e.slug;
          return (
            <button
              key={e.slug}
              role="radio"
              aria-checked={active}
              onClick={() => b.setSlug(e.slug)}
              className={`group text-left rounded-2xl border overflow-hidden transition-all duration-300 flex
                ${active ? "border-clay bg-clay/10 shadow-[0_0_0_3px_rgba(200,128,62,0.25)]" : "border-bone/10 hover:border-bone/30 bg-moss/40"}`}
            >
              <div className="relative w-24 sm:w-28 shrink-0 overflow-hidden">
                <Image src={e.image} alt="" fill sizes="112px" className="object-cover" />
              </div>
              <div className="p-3.5 min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-base leading-tight">{e.shortName}</p>
                  {active && (
                    <span className="shrink-0 w-5 h-5 rounded-full bg-clay text-ink grid place-items-center pop-in">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </div>
                <p className="text-[0.7rem] text-bone/50 mt-1 flex items-center gap-2">
                  <Clock size={11} className="shrink-0" /> {e.duration}
                </p>
                <p className="text-[0.7rem] mt-1 text-lagoon font-medium">
                  {e.price.amount ? `From ${fmtUSD(e.price.amount)}` : "Custom quote"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------- STEP 2: Date --------------------------- */
function StepDate() {
  const b = useBooking();
  const exp = b.slug ? getExperience(b.slug) : undefined;
  if (!exp) return null;
  return (
    <div>
      <StepHeading
        title="Pick your date"
        sub={`${exp.shortName} · ${exp.season}`}
      />
      <div className="grid md:grid-cols-[1fr_240px] gap-6 items-start">
        <Calendar slug={exp.slug} selected={b.date} onSelect={b.setDate} />
        <aside className="rounded-2xl border border-bone/10 bg-moss/40 p-5">
          <p className="text-[0.62rem] tracking-[0.28em] uppercase text-bone/45 mb-3">Your trip</p>
          <div className="relative w-full h-28 rounded-xl overflow-hidden mb-4">
            <Image src={exp.image} alt={exp.imageAlt} fill sizes="240px" className="object-cover" />
          </div>
          <p className="font-display text-lg leading-tight">{exp.shortName}</p>
          <ul className="mt-3 space-y-2 text-xs text-bone/60">
            <li className="flex items-center gap-2"><Clock size={13} className="text-lagoon" /> {exp.duration}</li>
            <li className="flex items-center gap-2"><Users size={13} className="text-lagoon" /> {exp.capacity}</li>
            <li className="flex items-center gap-2"><CalendarDays size={13} className="text-lagoon" />
              {b.date ? formatDateLong(b.date) : "No date selected"}
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

/* --------------------------- STEP 3: Guests --------------------------- */
function StepGuests() {
  const b = useBooking();
  const exp = b.slug ? getExperience(b.slug) : undefined;
  if (!exp) return null;
  const max = exp.capacityMax ?? 8;
  const unit = exp.capacityMax === 2 ? "Anglers" : "Guests";

  return (
    <div>
      <StepHeading
        title="Who's coming?"
        sub={exp.capacityMax ? `${exp.capacity} — a real AOA rule for this trip.` : exp.capacity}
      />
      <div className="rounded-2xl border border-bone/10 bg-moss/40 p-6 sm:p-8 max-w-md">
        <p className="text-[0.62rem] tracking-[0.28em] uppercase text-bone/45 mb-4">{unit}</p>
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label={`Decrease ${unit.toLowerCase()}`}
            onClick={() => b.setGuests(Math.max(1, b.guests - 1))}
            disabled={b.guests <= 1}
            className="w-14 h-14 rounded-full border border-bone/20 grid place-items-center hover:border-clay hover:text-clay transition disabled:opacity-25"
          >
            <Minus size={20} />
          </button>
          <div className="text-center" aria-live="polite">
            <p className="font-display text-6xl leading-none">{b.guests}</p>
            <p className="text-xs text-bone/50 mt-2">of {max} maximum</p>
          </div>
          <button
            type="button"
            aria-label={`Increase ${unit.toLowerCase()}`}
            onClick={() => b.setGuests(Math.min(max, b.guests + 1))}
            disabled={b.guests >= max}
            className="w-14 h-14 rounded-full border border-bone/20 grid place-items-center hover:border-clay hover:text-clay transition disabled:opacity-25"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="mt-6 h-1.5 rounded-full progress-track overflow-hidden">
          <div
            className="h-full bg-clay rounded-full transition-all duration-500"
            style={{ width: `${(b.guests / max) * 100}%` }}
          />
        </div>
        {exp.capacityMax === 2 && (
          <p className="mt-5 text-xs text-bone/55 leading-relaxed">
            AOA limits each charter to a maximum of 2 anglers per boat for personalized attention — one price per charter.
          </p>
        )}
        {exp.slug === "overnight-fish-camp-adventure" && (
          <p className="mt-5 text-xs text-bone/55 leading-relaxed">
            Priced per person, per night. Final group size is confirmed directly with AOA — advance booking is highly recommended for the November–April season.
          </p>
        )}
      </div>
    </div>
  );
}

/* --------------------------- STEP 4: Review --------------------------- */
function StepReview() {
  const b = useBooking();
  const p = useBookingPricing();
  const exp = b.slug ? getExperience(b.slug) : undefined;
  const trip = useTrip();
  if (!exp) return null;

  return (
    <div>
      <StepHeading title="Review your trip" sub="Check the details before we take your information." />
      <div className="grid md:grid-cols-2 gap-6 items-start max-w-3xl">
        <div className="rounded-2xl border border-bone/10 overflow-hidden">
          <div className="relative h-44">
            <Image src={exp.image} alt={exp.imageAlt} fill sizes="(max-width:768px) 100vw, 400px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
            <p className="absolute bottom-3 left-4 font-display text-xl">{exp.name}</p>
          </div>
          <dl className="p-5 space-y-3 text-sm">
            <Row k="Date" v={formatDateLong(b.date)} />
            <Row k="Guests" v={`${b.guests} ${exp.capacityMax === 2 ? "angler" : "guest"}${b.guests > 1 ? "s" : ""}`} />
            <Row k="Duration" v={exp.duration} />
            <Row k="Season" v={exp.season} />
            <Row k="Guide" v="Captain Shawn Leadon" />
          </dl>
        </div>

        <div className="rounded-2xl border border-bone/10 bg-moss/40 p-5">
          <p className="text-[0.62rem] tracking-[0.28em] uppercase text-bone/45 mb-4">Trip cost</p>
          {p.priced ? (
            <dl className="space-y-3 text-sm">
              <Row
                k={exp.slug === "overnight-fish-camp-adventure" ? `${fmtUSD(exp.price.amount!)} × ${b.guests} guest${b.guests > 1 ? "s" : ""}` : `${exp.shortName}`}
                v={fmtUSD(p.total)}
              />
              <div className="border-t border-bone/10 pt-3">
                <Row k={<span className="text-gold font-semibold">Deposit due today (50%)</span>} v={<span className="text-gold font-bold">{fmtUSD(p.deposit)}</span>} />
                <p className="text-[0.7rem] text-bone/45 mt-1">Remaining {fmtUSD(p.balance)} due 60 days before departure</p>
              </div>
            </dl>
          ) : (
            <div className="text-sm text-bone/65 leading-relaxed">
              <p>This is a custom-priced experience. Your request goes straight to AOA — they'll confirm pricing for your date and group.</p>
              <p className="mt-3 flex items-center gap-2 text-lagoon text-xs"><Sparkles size={13} /> No payment needed today</p>
            </div>
          )}
          {trip.items.length > 0 && (
            <p className="mt-4 text-[0.7rem] text-bone/40 border-t border-bone/10 pt-3">
              {trip.items.length} experience{trip.items.length > 1 ? "s" : ""} saved in “My Trip” — bundle them into one itinerary with AOA after booking.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* --------------------------- STEP 5: Guest details --------------------------- */
function StepDetails() {
  const b = useBooking();
  const [touched, setTouched] = useState(false);
  const emailOk = /^\S+@\S+\.\S+$/.test(b.info.email);
  const nameOk = b.info.name.trim().length > 1;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (nameOk && emailOk) b.next();
    else setTouched(true);
  };

  return (
    <form onSubmit={submit} id="guest-form">
      <StepHeading title="Your details" sub="So AOA knows who's coming and where to reach you. Demo only — nothing is stored or sent." />
      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        <Field label="Full name" required>
          <input
            type="text"
            autoComplete="name"
            value={b.info.name}
            onChange={(e) => b.setInfo({ ...b.info, name: e.target.value })}
            aria-invalid={touched && !nameOk}
            className="w-full bg-moss/60 border border-bone/15 rounded-xl px-4 py-3.5 text-sm placeholder:text-bone/30 focus:border-clay outline-none transition"
            placeholder="e.g. Alex Rivera"
          />
          {touched && !nameOk && <p className="text-xs text-ember mt-1.5">Please enter your name</p>}
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            autoComplete="email"
            value={b.info.email}
            onChange={(e) => b.setInfo({ ...b.info, email: e.target.value })}
            aria-invalid={touched && !emailOk}
            className="w-full bg-moss/60 border border-bone/15 rounded-xl px-4 py-3.5 text-sm placeholder:text-bone/30 focus:border-clay outline-none transition"
            placeholder="you@example.com"
          />
          {touched && !emailOk && <p className="text-xs text-ember mt-1.5">Enter a valid email address</p>}
        </Field>
        <Field label="Phone (optional)">
          <input
            type="tel"
            autoComplete="tel"
            value={b.info.phone}
            onChange={(e) => b.setInfo({ ...b.info, phone: e.target.value })}
            className="w-full bg-moss/60 border border-bone/15 rounded-xl px-4 py-3.5 text-sm placeholder:text-bone/30 focus:border-clay outline-none transition"
            placeholder="+1 555 000 1234"
          />
        </Field>
        <Field label="Notes for Captain Shawn (optional)" className="sm:col-span-2">
          <textarea
            rows={3}
            value={b.info.notes}
            onChange={(e) => b.setInfo({ ...b.info, notes: e.target.value })}
            className="w-full bg-moss/60 border border-bone/15 rounded-xl px-4 py-3.5 text-sm placeholder:text-bone/30 focus:border-clay outline-none transition resize-none"
            placeholder="Experience level, target species, questions about the trip…"
          />
        </Field>
      </div>
      {/* hidden submit so footer continue can remain the primary action */}
      <button type="submit" className="hidden" aria-hidden tabIndex={-1} />
    </form>
  );
}

/* --------------------------- STEP 6: Payment preview --------------------------- */
function StepPayment() {
  const b = useBooking();
  const p = useBookingPricing();
  const exp = b.slug ? getExperience(b.slug) : undefined;
  const [card, setCard] = useState({ num: "", exp: "", cvc: "" });
  if (!exp) return null;

  const cardOk =
    card.num.replace(/\s/g, "").length >= 15 &&
    /^\d{2}\s?\/\s?\d{2}$/.test(card.exp) &&
    card.cvc.length >= 3;

  return (
    <div>
      <StepHeading
        title={p.priced ? "Secure your reservation" : "Send your request"}
        sub={p.priced
          ? "A 50% deposit confirms your date — the balance is due 60 days before departure."
          : "No payment today — AOA replies with pricing and confirmation."}
      />
      <div className="grid md:grid-cols-[1fr_260px] gap-6 items-start">
        <div className="space-y-4">
          {/* Method picker — real methods from the site */}
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Payment method">
            <MethodCard
              active={b.method === "card"}
              onClick={() => b.setMethod("card")}
              icon={<CreditCard size={18} />}
              title="Card"
              sub="Visa · Mastercard"
            />
            <MethodCard
              active={b.method === "wire"}
              onClick={() => b.setMethod("wire")}
              icon={<Landmark size={18} />}
              title="Wire transfer"
              sub="Details after request"
            />
          </div>

          {b.method === "card" && p.priced && (
            <div className="rounded-2xl border border-bone/10 bg-moss/40 p-5 space-y-4">
              <Field label="Card number">
                <input
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={card.num}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "").slice(0, 19);
                    setCard({ ...card, num: v.replace(/(.{4})/g, "$1 ").trim() });
                  }}
                  className="w-full bg-ink/50 border border-bone/15 rounded-xl px-4 py-3.5 text-sm tracking-widest placeholder:text-bone/25 placeholder:tracking-normal focus:border-clay outline-none transition font-mono"
                  placeholder="4242 4242 4242 4242"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry">
                  <input
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={card.exp}
                    onChange={(e) => {
                      let v = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
                      if (v.length > 2) v = v.slice(0, 2) + " / " + v.slice(2);
                      setCard({ ...card, exp: v });
                    }}
                    className="w-full bg-ink/50 border border-bone/15 rounded-xl px-4 py-3.5 text-sm placeholder:text-bone/25 focus:border-clay outline-none transition font-mono"
                    placeholder="MM / YY"
                  />
                </Field>
                <Field label="CVC">
                  <input
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={card.cvc}
                    onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/[^\d]/g, "").slice(0, 4) })}
                    className="w-full bg-ink/50 border border-bone/15 rounded-xl px-4 py-3.5 text-sm placeholder:text-bone/25 focus:border-clay outline-none transition font-mono"
                    placeholder="123"
                  />
                </Field>
              </div>
              <p className="flex items-center gap-2 text-[0.7rem] text-bone/45">
                <ShieldCheck size={13} className="text-fern" />
                Demo only — card details are never submitted, processed or stored.
              </p>
            </div>
          )}

          {(b.method === "wire" || !p.priced) && p.priced && (
            <div className="rounded-2xl border border-bone/10 bg-moss/40 p-5 text-sm text-bone/65 leading-relaxed">
              Wire transfer details are provided once AOA confirms your reservation request. Your date is held once the deposit is received.
            </div>
          )}

          <button
            onClick={b.confirm}
            disabled={b.method === "card" && p.priced ? !cardOk : false}
            className="w-full inline-flex items-center justify-center gap-2 bg-clay text-ink font-bold px-6 py-4 rounded-full
              hover:bg-gold transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {p.priced
              ? b.method === "card"
                ? `Pay ${fmtUSD(p.deposit)} deposit (demo)`
                : "Reserve & request wire details (demo)"
              : "Send availability request (demo)"}
            <ArrowRight size={16} />
          </button>
        </div>

        <aside className="rounded-2xl border border-bone/10 bg-moss/40 p-5 text-sm">
          <p className="text-[0.62rem] tracking-[0.28em] uppercase text-bone/45 mb-4">Summary</p>
          <dl className="space-y-2.5">
            <Row k="Experience" v={exp.shortName} />
            <Row k="Date" v={formatDateLong(b.date)} />
            <Row k="Guests" v={String(b.guests)} />
            {p.priced && (
              <>
                <div className="border-t border-bone/10 pt-2.5"><Row k="Trip total" v={fmtUSD(p.total)} /></div>
                <Row k={<span className="text-gold font-semibold">Due today (50%)</span>} v={<span className="text-gold font-bold">{fmtUSD(p.deposit)}</span>} />
                <Row k="Balance (60 days out)" v={fmtUSD(p.balance)} />
              </>
            )}
          </dl>
          <p className="mt-4 text-[0.68rem] text-bone/40 leading-relaxed border-t border-bone/10 pt-3 flex items-start gap-2">
            <MapPin size={12} className="shrink-0 mt-0.5" />
            Cancellations 30+ days out: no charge — funds apply to a future trip within 12 months.
          </p>
        </aside>
      </div>
    </div>
  );
}

/* --------------------------- STEP 7: Confirmation --------------------------- */
function StepConfirm() {
  const b = useBooking();
  const p = useBookingPricing();
  const exp = b.slug ? getExperience(b.slug) : undefined;
  if (!exp) return null;

  return (
    <div className="max-w-xl mx-auto text-center py-6">
      <div className="pop-in mx-auto w-20 h-20 rounded-full bg-fern/30 border border-fern grid place-items-center mb-6 relative">
        <span className="absolute inset-0 rounded-full border border-fern ping-soft" aria-hidden />
        <Check size={34} className="text-sage" strokeWidth={2.5} />
      </div>
      <p className="eyebrow justify-center text-lagoon mb-3">Demo reservation</p>
      <h3 className="font-display text-3xl sm:text-4xl leading-tight">
        Your Andros adventure is reserved
      </h3>
      <p className="mt-3 text-sm text-bone/55 leading-relaxed">
        This is a frontend demo confirmation — no payment was processed and no email was sent. In production this is where AOA's confirmation journey begins.
      </p>

      <div className="mt-8 rounded-2xl border border-bone/10 bg-moss/40 p-6 text-left">
        <div className="flex items-center justify-between border-b border-bone/10 pb-4 mb-4">
          <div>
            <p className="text-[0.62rem] tracking-[0.28em] uppercase text-bone/45">Booking reference</p>
            <p className="font-mono text-gold text-lg mt-1">{b.bookingRef}</p>
          </div>
          <CalendarDays size={22} className="text-lagoon" />
        </div>
        <dl className="space-y-2.5 text-sm">
          <Row k="Experience" v={exp.name} />
          <Row k="Date" v={formatDateLong(b.date)} />
          <Row k="Guests" v={`${b.guests}`} />
          <Row k="Guide" v="Captain Shawn Leadon" />
          {p.priced && (
            <>
              <div className="border-t border-bone/10 pt-2.5" />
              <Row k="Deposit (50%)" v={fmtUSD(p.deposit)} />
              <Row k="Balance due 60 days prior" v={fmtUSD(p.balance)} />
            </>
          )}
          {b.info.name && <Row k="Lead guest" v={b.info.name} />}
        </dl>
      </div>

      <p className="mt-6 text-xs text-bone/45">
        Questions? Call AOA — <a href="tel:+12425541249" className="text-clay link-sweep">+1 (242) 554-1249</a>
      </p>
      <button
        onClick={() => {
          b.closeBooking();
          b.reset();
        }}
        className="mt-6 inline-flex items-center gap-2 border border-bone/20 px-6 py-3 rounded-full text-sm hover:border-clay hover:text-clay transition"
      >
        Done — keep exploring
      </button>
    </div>
  );
}

/* --------------------------- Shared bits --------------------------- */
function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h3 className="font-display text-2xl sm:text-3xl">{title}</h3>
      <p className="text-sm text-bone/55 mt-1.5 max-w-lg leading-relaxed">{sub}</p>
    </div>
  );
}

function Row({ k, v }: { k: React.ReactNode; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-bone/55 text-sm shrink-0">{k}</dt>
      <dd className="text-right text-sm">{v}</dd>
    </div>
  );
}

function Field({
  label, children, required, className = "",
}: {
  label: string; children: React.ReactNode; required?: boolean; className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[0.65rem] tracking-[0.22em] uppercase text-bone/45 mb-2">
        {label} {required && <span className="text-clay">*</span>}
      </span>
      {children}
    </label>
  );
}

function MethodCard({
  active, onClick, icon, title, sub,
}: {
  active: boolean; onClick: () => void; icon: React.ReactNode; title: string; sub: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
        active ? "border-clay bg-clay/10" : "border-bone/10 hover:border-bone/30 bg-moss/40"
      }`}
    >
      <span className={`w-9 h-9 rounded-full grid place-items-center border ${active ? "border-clay text-clay" : "border-bone/20 text-bone/60"}`}>
        {icon}
      </span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-[0.68rem] text-bone/45 mt-0.5">{sub}</span>
      </span>
    </button>
  );
}
