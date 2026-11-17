import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Check, Copy, MapPin, Phone } from "lucide-react";
import { EditorialCTA } from "../components/EditorialCTA";
import { SALON_IMAGES, SALON_INFO, VERIFIED_SERVICES } from "../data/salonData";

export const ContactPage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [selectedService, setSelectedService] = useState("Facial");
  const [preferredDay, setPreferredDay] = useState("Saturday");
  const [preferredTime, setPreferredTime] = useState("11:00 AM");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero-item",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const allTreatments = VERIFIED_SERVICES.flatMap((c) => c.treatments.map((t) => t.name));

  const generatedMessage = `Hello Signature Beauty Salon, I would like to enquire about booking ${selectedService} on ${preferredDay} around ${preferredTime}${
    guestName.trim() ? ` (Name: ${guestName.trim()}` : ""
  }${guestPhone.trim() ? `, Phone: ${guestPhone.trim()}` : ""}${
    guestName.trim() || guestPhone.trim() ? ")" : ""
  }${notes.trim() ? `. Notes: ${notes.trim()}` : ""}.`;

  const handleCopyEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setValidationError("Please enter your name before preparing the enquiry message.");
      return;
    }
    setValidationError("");
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3500);
    } catch {
      setValidationError(
        "Clipboard access was blocked by your browser — you can select and copy the enquiry text below directly."
      );
    }
  };

  return (
    <div ref={rootRef} className="w-full overflow-x-hidden">
      {/* 1. Full-Bleed Architectural Header extending behind transparent navbar */}
      <section className="relative min-h-[64vh] w-full flex items-end overflow-hidden bg-[#382834]">
        <img
          src={SALON_IMAGES.heroSalon}
          alt="Signature Beauty Salon bright reception counter and sanctuary interior"
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#382834]/90 via-[#382834]/50 to-[#382834]/30"
        />
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 pt-36 pb-16 md:pb-20">
          <p className="contact-hero-item text-xs font-semibold uppercase tracking-[0.2em] text-[#EBCBCB] mb-4">
            Contact &amp; Appointments · Bahrain
          </p>
          <h1 className="contact-hero-item font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#FFF9F3] leading-[1.05] max-w-3xl mb-6">
            Speak With Our Salon Directly
          </h1>
          <p className="contact-hero-item text-base md:text-lg text-[#FFF9F3]/85 max-w-2xl leading-relaxed">
            Call either of our salon lines or reach out via {SALON_INFO.handle} on Instagram
            between 9:00 AM and 8:00 PM daily to arrange your visit.
          </p>
        </div>
      </section>

      {/* 2. Primary Click-to-Call & Verified Schedule — Warm Ivory */}
      <section className="bg-[#FFF9F3] py-20 md:py-28 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-6 flex flex-col gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74384F] mb-4">
                Telephone Enquiries
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#382834] mb-6">
                Call Signature Beauty Salon
              </h2>
              <div className="divide-y divide-[#74384F]/15 border-t border-b border-[#74384F]/15">
                {SALON_INFO.phones.map((phone, idx) => (
                  <a
                    key={phone.display}
                    href={phone.href}
                    className="py-6 flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-[#74384F]" aria-hidden="true" />
                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#74384F]">
                          Salon Line 0{idx + 1}
                        </span>
                        <span className="font-display text-3xl md:text-4xl font-semibold text-[#382834] group-hover:text-[#74384F] transition-colors tabular-nums">
                          {phone.formatted}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#74384F] group-hover:translate-x-1 transition-transform">
                      Tap to Call →
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74384F] mb-3">
                Official Social Channel
              </p>
              <p className="text-base text-[#373235]/85 leading-relaxed mb-5 max-w-lg">
                View daily work, treatment announcements, and send direct messages through the
                salon&apos;s verified Instagram profile.
              </p>
              <EditorialCTA
                label={`Message ${SALON_INFO.handle} on Instagram`}
                href={SALON_INFO.instagramUrl}
                external
                tone="burgundy"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-12 border-t lg:border-t-0 lg:border-l border-[#74384F]/15 pt-10 lg:pt-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74384F] mb-4">
              Verified Opening Hours
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#382834] mb-6">
              Open Seven Days a Week
            </h2>
            <div className="divide-y divide-[#74384F]/12 border-t border-b border-[#74384F]/15">
              {SALON_INFO.hours.schedule.map((item) => (
                <div
                  key={item.day}
                  className="py-3.5 flex items-center justify-between text-sm md:text-base"
                >
                  <span className="font-semibold text-[#382834]">{item.day}</span>
                  <span className="text-[#373235]/85 tabular-nums">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Transparent Location Verification & Live Map Pin — Soft Cream */}
      <section className="bg-[#F5EEE8] py-20 md:py-28 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74384F] mb-4">
              Verified Google Maps Location
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#382834] leading-[1.1] mb-6">
              {SALON_INFO.location.verifiedArea}
            </h2>
            <p className="text-base text-[#373235]/85 leading-relaxed mb-5">
              {SALON_INFO.location.verificationNote}
            </p>
            <div className="py-5 border-t border-b border-[#74384F]/15 mb-8 flex flex-col gap-2 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#74384F] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#382834]">
                    {SALON_INFO.location.verifiedArea}, Kingdom of Bahrain
                  </p>
                  <p className="text-[#373235]/75">
                    {SALON_INFO.location.roadReference} · Plus Code {SALON_INFO.location.plusCode}
                  </p>
                </div>
              </div>
            </div>
            <EditorialCTA
              label="Open Pin in Google Maps"
              href={SALON_INFO.location.googleMapsUrl}
              external
              tone="burgundy"
            />
          </div>

          <div className="lg:col-span-7 w-full">
            <iframe
              title="Signature Beauty Salon Google Maps Location — Road No. 1411, Isa Town, Bahrain"
              src={SALON_INFO.location.googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full aspect-[16/10] border-0"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 4. Honest Appointment Enquiry Preparation Helper — Pale Rose */}
      <section className="bg-[#F8E9E9] py-20 md:py-28 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74384F] mb-4">
              Enquiry Helper
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#382834] leading-[1.1] mb-6">
              Prepare Your Appointment Note
            </h2>
            <p className="text-base text-[#373235]/85 leading-relaxed mb-6">
              Because Signature Beauty Salon confirms appointments personally by telephone and
              Instagram DM rather than automated online booking, this tool formats your preferred
              details for quick copying to {SALON_INFO.handle}.
            </p>
            <p className="text-xs text-[#74384F] leading-relaxed">
              Note: Preparing a message here does not transmit or auto-confirm an appointment.
              Please call{" "}
              <a href={SALON_INFO.phones[0].href} className="underline font-semibold">
                {SALON_INFO.phones[0].display}
              </a>{" "}
              or{" "}
              <a href={SALON_INFO.phones[1].href} className="underline font-semibold">
                {SALON_INFO.phones[1].display}
              </a>{" "}
              or send the copied message on Instagram to confirm your time.
            </p>
          </div>

          <form
            onSubmit={handleCopyEnquiry}
            className="lg:col-span-7 flex flex-col gap-6"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#382834]">
                  Your Name *
                </span>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="bg-transparent border-0 border-b border-[#74384F]/35 py-2.5 text-base text-[#382834] placeholder:text-[#373235]/45 focus:border-[#74384F] focus:outline-none rounded-none"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#382834]">
                  Phone Number (Optional)
                </span>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="e.g. +973 ..."
                  className="bg-transparent border-0 border-b border-[#74384F]/35 py-2.5 text-base text-[#382834] placeholder:text-[#373235]/45 focus:border-[#74384F] focus:outline-none rounded-none tabular-nums"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#382834]">
                  Verified Treatment
                </span>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="bg-transparent border-0 border-b border-[#74384F]/35 py-2.5 text-base text-[#382834] focus:border-[#74384F] focus:outline-none rounded-none"
                >
                  {allTreatments.map((t) => (
                    <option key={t} value={t} className="bg-[#FFF9F3] text-[#382834]">
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#382834]">
                  Preferred Day
                </span>
                <select
                  value={preferredDay}
                  onChange={(e) => setPreferredDay(e.target.value)}
                  className="bg-transparent border-0 border-b border-[#74384F]/35 py-2.5 text-base text-[#382834] focus:border-[#74384F] focus:outline-none rounded-none"
                >
                  {SALON_INFO.hours.schedule.map((s) => (
                    <option key={s.day} value={s.day} className="bg-[#FFF9F3] text-[#382834]">
                      {s.day}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#382834]">
                  Preferred Time
                </span>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="bg-transparent border-0 border-b border-[#74384F]/35 py-2.5 text-base text-[#382834] focus:border-[#74384F] focus:outline-none rounded-none tabular-nums"
                >
                  {["9:30 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "6:30 PM"].map(
                    (time) => (
                      <option key={time} value={time} className="bg-[#FFF9F3] text-[#382834]">
                        {time}
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#382834]">
                Additional Notes (Optional)
              </span>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any preferences or questions for the salon team"
                className="bg-transparent border-0 border-b border-[#74384F]/35 py-2.5 text-base text-[#382834] placeholder:text-[#373235]/45 focus:border-[#74384F] focus:outline-none rounded-none resize-none"
              />
            </label>

            {validationError && (
              <p role="alert" className="text-sm text-[#74384F] font-semibold">
                {validationError}
              </p>
            )}

            <div className="pt-2 border-t border-[#74384F]/15">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#74384F] mb-2">
                Ready-to-Send Message Preview
              </p>
              <p className="text-sm text-[#382834]/90 leading-relaxed italic mb-5">
                &ldquo;{generatedMessage}&rdquo;
              </p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <button
                  type="submit"
                  className="cta-editorial text-[#74384F] hover:text-[#382834]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Message Copied for Instagram DM</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>Copy Enquiry Message</span>
                    </>
                  )}
                  <span className="cta-arrow" aria-hidden="true">
                    →
                  </span>
                </button>

                <EditorialCTA
                  label={`Open ${SALON_INFO.handle} Instagram`}
                  href={SALON_INFO.instagramUrl}
                  external
                  tone="dark"
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
