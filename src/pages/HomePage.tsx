import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EditorialCTA } from "../components/EditorialCTA";
import { SALON_IMAGES, SALON_INFO, VERIFIED_SERVICES } from "../data/salonData";

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-stagger",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform",
        }
      );

      gsap.to(".hero-bg-parallax", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 84%",
              once: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full overflow-x-hidden">
      {/* 1. CINEMATIC FULL-WIDTH HERO — Extends seamlessly behind transparent navbar */}
      <section className="hero-section relative min-h-screen w-full flex items-end overflow-hidden bg-[#382834]">
        <img
          src={SALON_IMAGES.heroSalon}
          alt="Signature Beauty Salon serene interior in Bahrain with warm limestone reception and soft daylight"
          className="hero-bg-parallax absolute inset-0 w-full h-[112%] -top-[6%] object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#382834]/85 via-[#382834]/35 to-[#382834]/20"
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 pt-36 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <p className="hero-stagger text-xs md:text-[13px] font-semibold uppercase tracking-[0.2em] text-[#EBCBCB] mb-5">
              Road No. 1411, Isa Town · Riffa, Bahrain · Daily 9:00 AM – 8:00 PM
            </p>
            <h1 className="hero-stagger font-display text-5xl sm:text-6xl lg:text-[78px] font-semibold text-[#FFF9F3] leading-[1.03] tracking-[-0.01em] mb-6">
              Beauty. Comfort. Confidence.
            </h1>
            <p className="hero-stagger text-base md:text-lg text-[#FFF9F3]/90 max-w-xl leading-relaxed font-normal mb-10">
              Discover a welcoming beauty experience at Signature Beauty Salon — a serene
              sanctuary designed to make you feel relaxed, positive, and genuinely confident.
            </p>
            <div className="hero-stagger flex flex-wrap items-center gap-x-10 gap-y-4">
              <EditorialCTA label="Explore Our Services" to="/services" tone="light" />
              <EditorialCTA label="Book an Appointment" to="/contact" tone="gold" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND ATMOSPHERE & WELCOME — Warm Ivory Asymmetric Split */}
      <section className="bg-[#FFF9F3] py-24 md:py-32 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 reveal-section">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74384F] mb-5">
              01 · The Atmosphere
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#382834] leading-[1.1] mb-8">
              &ldquo;{SALON_INFO.bioMessage}&rdquo;
            </h2>
            <p className="text-base text-[#373235]/85 leading-relaxed mb-6">
              Every detail at Signature Beauty Salon centers on unhurried personal care. From quiet
              private skincare suites to thoughtful brow and bridal preparation, the focus remains
              calm, attentive, and uplifting.
            </p>
            <p className="text-sm text-[#373235]/70 leading-relaxed mb-10">
              Located in {SALON_INFO.location.verifiedArea} near{" "}
              {SALON_INFO.location.roadReference}, serving guests daily from 9:00 AM to 8:00 PM.
            </p>
            <EditorialCTA label="Read Our Story" to="/about" tone="burgundy" />
          </div>

          <div className="lg:col-span-7 grid grid-cols-12 gap-6 items-end reveal-section">
            <div className="col-span-8 editorial-image-frame">
              <img
                src={SALON_IMAGES.treatmentRoom}
                alt="Quiet private skincare and facial treatment suite with natural daylight"
                loading="lazy"
                className="w-full aspect-[16/10] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="col-span-4 editorial-image-frame -mt-12 md:-mt-20">
              <img
                src={SALON_IMAGES.salonLounge}
                alt="Welcoming blush velvet lounge corner in warm sunlight"
                loading="lazy"
                className="w-full aspect-[3/4] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. VERIFIED BEAUTY SERVICES — Soft Cream Full-Width Editorial Rows */}
      <section className="bg-[#F5EEE8] py-24 md:py-32 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#74384F]/15 reveal-section">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74384F] mb-3">
                02 · Verified Treatments
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#382834] leading-[1.08]">
                Selected Salon Care
              </h2>
            </div>
            <EditorialCTA label="View All Services" to="/services" tone="dark" />
          </div>

          <div className="divide-y divide-[#74384F]/12">
            {VERIFIED_SERVICES.map((category, index) => {
              const reversed = index % 2 === 1;
              return (
                <article
                  key={category.id}
                  className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center reveal-section"
                >
                  <div
                    className={`lg:col-span-6 editorial-image-frame ${
                      reversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <img
                      src={category.image}
                      alt={category.imageAlt}
                      loading="lazy"
                      className={`w-full object-cover ${
                        category.id === "makeup" ? "aspect-[4/4]" : "aspect-[4/3]"
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div
                    className={`lg:col-span-6 flex flex-col items-start ${
                      reversed ? "lg:order-1 lg:pr-8" : "lg:order-2 lg:pl-8"
                    }`}
                  >
                    <span className="text-xs font-bold tracking-[0.2em] text-[#C7A36A] uppercase mb-3 tabular-nums">
                      {category.number} · {category.subtitle}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#382834] mb-5">
                      {category.title}
                    </h3>
                    <p className="text-base text-[#373235]/85 leading-relaxed max-w-xl mb-8">
                      {category.description}
                    </p>

                    <div className="w-full max-w-md border-t border-[#74384F]/15 mb-8">
                      {category.treatments.map((t) => (
                        <div
                          key={t.id}
                          className="py-3.5 border-b border-[#74384F]/10 flex items-baseline justify-between gap-4"
                        >
                          <span className="font-semibold text-sm text-[#382834]">
                            {t.name}
                          </span>
                          <span className="text-xs text-[#74384F]/80">
                            By Direct Consultation
                          </span>
                        </div>
                      ))}
                    </div>

                    <EditorialCTA
                      label={`Explore ${category.title}`}
                      to={`/services#${category.slug}`}
                      tone="burgundy"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. OPEN PHOTOGRAPHY & INSTAGRAM SHOWCASE — Rich Burgundy Contrast Band */}
      <section className="bg-[#74384F] text-[#FFF9F3] py-24 md:py-32 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 reveal-section">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EBCBCB] mb-4">
                03 · Visual Journal &amp; Instagram
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#FFF9F3] leading-[1.08]">
                Inside the Salon &amp; Daily Craft
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-5">
              <p className="text-sm md:text-base text-[#FFF9F3]/85 leading-relaxed lg:text-right max-w-md">
                Follow {SALON_INFO.handle} on Instagram for real-time treatment highlights,
                reels, and seasonal beauty work from our Bahrain salon.
              </p>
              <EditorialCTA
                label={`Visit ${SALON_INFO.handle} on Instagram`}
                href={SALON_INFO.instagramUrl}
                external
                tone="gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start reveal-section">
            <div className="md:col-span-5 editorial-image-frame">
              <img
                src={SALON_IMAGES.skincareRitual}
                alt="Botanical skincare serums and warm steamed towels"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <p className="mt-4 text-xs tracking-[0.14em] uppercase text-[#EBCBCB]">
                Skincare &amp; Facial Preparation
              </p>
            </div>

            <div className="md:col-span-4 editorial-image-frame md:mt-12">
              <img
                src={SALON_IMAGES.bridalMakeup}
                alt="Bridal makeup vanity with warm rose marble and artisan brushes"
                loading="lazy"
                className="w-full aspect-[3/4] object-cover"
                referrerPolicy="no-referrer"
              />
              <p className="mt-4 text-xs tracking-[0.14em] uppercase text-[#EBCBCB]">
                Bridal Artistry Atelier
              </p>
            </div>

            <div className="md:col-span-3 editorial-image-frame">
              <img
                src={SALON_IMAGES.threadingCare}
                alt="Precision brow threading tools and rosewater mist"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <p className="mt-4 text-xs tracking-[0.14em] uppercase text-[#EBCBCB]">
                Brow &amp; Threading Craft
              </p>
            </div>
          </div>

          <div className="mt-14 pt-10 border-t border-[#FFF9F3]/15 flex flex-wrap items-center justify-between gap-6">
            <p className="text-xs text-[#FFF9F3]/75 max-w-xl">
              Atmosphere &amp; craft studies curated for Signature Beauty Salon. View live salon
              photography and video reels directly on{" "}
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#EBCBCB] hover:text-[#FFF9F3]"
              >
                Instagram {SALON_INFO.handle}
              </a>
              .
            </p>
            <EditorialCTA label="Open Full Gallery" to="/about#gallery" tone="light" />
          </div>
        </div>
      </section>

      {/* 5. DIRECT APPOINTMENTS & LOCATION — Pale Rose Split */}
      <section className="bg-[#F8E9E9] py-24 md:py-28 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start reveal-section">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74384F] mb-4">
              04 · Visit &amp; Appointments
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#382834] leading-[1.1] mb-6">
              Arrange Your Visit in Bahrain
            </h2>
            <p className="text-base text-[#373235]/85 leading-relaxed max-w-lg mb-8">
              Appointments and treatment enquiries are handled directly by phone and through
              our official Instagram account so every session receives personal attention.
            </p>
            <EditorialCTA label="Contact & Directions" to="/contact" tone="burgundy" />
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-10 border-t lg:border-t-0 lg:border-l border-[#74384F]/18 pt-8 lg:pt-0 lg:pl-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#74384F] mb-3">
                Direct Telephone
              </p>
              <div className="flex flex-col gap-2 tabular-nums">
                {SALON_INFO.phones.map((phone) => (
                  <a
                    key={phone.display}
                    href={phone.href}
                    className="font-display text-3xl font-semibold text-[#382834] hover:text-[#74384F] transition-colors"
                  >
                    {phone.display}
                  </a>
                ))}
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#74384F] mb-1">
                Opening Hours
              </p>
              <p className="text-sm text-[#373235] tabular-nums">
                {SALON_INFO.hours.daysSummary} · {SALON_INFO.hours.daily}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#74384F] mb-3">
                Verified Location
              </p>
              <p className="text-base font-semibold text-[#382834] mb-1">
                {SALON_INFO.location.verifiedArea}
              </p>
              <p className="text-sm text-[#373235]/80 mb-5 leading-relaxed">
                {SALON_INFO.location.roadReference}, Kingdom of Bahrain ({SALON_INFO.location.plusCode})
              </p>
              <EditorialCTA
                label="Open Google Maps"
                href={SALON_INFO.location.googleMapsUrl}
                external
                tone="dark"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
