import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EditorialCTA } from "../components/EditorialCTA";
import { SALON_IMAGES, SALON_INFO, VERIFIED_SERVICES } from "../data/salonData";

gsap.registerPlugin(ScrollTrigger);

export const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-hero-item",
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

      gsap.utils.toArray<HTMLElement>(".service-chapter").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const displayedCategories =
    selectedCategory === "all"
      ? VERIFIED_SERVICES
      : VERIFIED_SERVICES.filter((c) => c.id === selectedCategory);

  const sectionBackgrounds = ["bg-[#FFF9F3]", "bg-[#F8E9E9]", "bg-[#E9DED3]"];

  return (
    <div ref={rootRef} className="w-full overflow-x-hidden">
      {/* 1. Full-Bleed Atmospheric Header extending behind transparent navbar */}
      <section className="relative min-h-[68vh] w-full flex items-end overflow-hidden bg-[#382834]">
        <img
          src={SALON_IMAGES.treatmentRoom}
          alt="Serene private beauty treatment suite at Signature Beauty Salon"
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#382834]/88 via-[#382834]/45 to-[#382834]/30"
        />
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 pt-36 pb-16 md:pb-20">
          <p className="services-hero-item text-xs font-semibold uppercase tracking-[0.2em] text-[#EBCBCB] mb-4">
            Signature Beauty Salon · Bahrain
          </p>
          <h1 className="services-hero-item font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#FFF9F3] leading-[1.05] max-w-3xl mb-6">
            Services &amp; Beauty Treatments
          </h1>
          <p className="services-hero-item text-base md:text-lg text-[#FFF9F3]/85 max-w-2xl leading-relaxed">
            Verified treatment categories offered at Signature Beauty Salon in Riffa Al Shamali.
            Contact the salon directly to confirm treatment details, tailored recommendations,
            and current pricing.
          </p>
        </div>
      </section>

      {/* 2. Borderless Category Filter Bar */}
      <section className="bg-[#F5EEE8] border-b border-[#74384F]/15 px-6 md:px-10 lg:px-14 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-6">
          <div
            role="tablist"
            aria-label="Filter Beauty Treatments"
            className="flex flex-wrap items-center gap-6 md:gap-10"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
              className={`bg-transparent border-none outline-none cursor-pointer py-2 text-xs font-bold uppercase tracking-[0.16em] whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === "all"
                  ? "text-[#74384F]"
                  : "text-[#382834]/65 hover:text-[#382834]"
              }`}
              style={{
                borderBottom:
                  selectedCategory === "all" ? "1px solid #C7A36A" : "1px solid transparent",
              }}
            >
              All Treatments
            </button>

            {VERIFIED_SERVICES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`bg-transparent border-none outline-none cursor-pointer py-2 text-xs font-bold uppercase tracking-[0.16em] whitespace-nowrap shrink-0 transition-colors ${
                    active ? "text-[#74384F]" : "text-[#382834]/65 hover:text-[#382834]"
                  }`}
                  style={{
                    borderBottom: active ? "1px solid #C7A36A" : "1px solid transparent",
                  }}
                >
                  {cat.number}. {cat.title}
                </button>
              );
            })}
          </div>

          <span className="text-xs text-[#373235]/70 tabular-nums">
            {SALON_INFO.hours.daysSummary} · {SALON_INFO.hours.daily}
          </span>
        </div>
      </section>

      {/* 3. Full-Width Borderless Editorial Treatment Chapters */}
      {displayedCategories.map((category, idx) => {
        const bgClass = sectionBackgrounds[idx % sectionBackgrounds.length];
        const imageLeft = idx % 2 === 0;
        return (
          <section
            key={category.id}
            id={category.slug}
            className={`${bgClass} py-20 md:py-28 px-6 md:px-10 lg:px-14 scroll-mt-24`}
          >
            <div className="max-w-[1440px] mx-auto service-chapter grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div
                className={`lg:col-span-6 editorial-image-frame ${
                  imageLeft ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <img
                  src={category.image}
                  alt={category.imageAlt}
                  loading="lazy"
                  className={`w-full object-cover ${
                    category.id === "makeup" ? "aspect-[3/4] max-h-[680px]" : "aspect-[4/3]"
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div
                className={`lg:col-span-6 flex flex-col items-start ${
                  imageLeft ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#74384F] mb-3 tabular-nums">
                  Chapter {category.number} · {category.subtitle}
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#382834] leading-[1.08] mb-5">
                  {category.title}
                </h2>
                <p className="text-base text-[#373235]/85 leading-relaxed mb-10 max-w-xl">
                  {category.description}
                </p>

                <div className="w-full border-t border-[#74384F]/20 mb-10">
                  {category.treatments.map((treatment, tIdx) => (
                    <div
                      key={treatment.id}
                      className="py-6 border-b border-[#74384F]/15 flex flex-col gap-2"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#382834]">
                          0{tIdx + 1}. {treatment.name}
                        </h3>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#74384F]">
                          Enquire by Phone
                        </span>
                      </div>
                      <p className="text-sm text-[#373235]/80 leading-relaxed max-w-lg">
                        {treatment.summary}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <EditorialCTA
                    label={`Call ${SALON_INFO.phones[0].display}`}
                    href={SALON_INFO.phones[0].href}
                    tone="burgundy"
                  />
                  <EditorialCTA
                    label="Arrange Consultation"
                    to="/contact"
                    tone="dark"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* 4. Honest Consultation & Pricing Band — Rich Burgundy */}
      <section className="bg-[#74384F] text-[#FFF9F3] py-20 md:py-24 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#EBCBCB] mb-3">
              Personal Consultations
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#FFF9F3] leading-[1.12] mb-4">
              Tailored Advice &amp; Transparent Enquiries
            </h2>
            <p className="text-base text-[#FFF9F3]/85 leading-relaxed max-w-2xl">
              Because Signature Beauty Salon does not publish a fixed public price sheet online,
              we never list estimated or placeholder fees. Call us directly or visit{" "}
              {SALON_INFO.handle} on Instagram for accurate pricing, seasonal offerings, and
              appointment scheduling.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-x-10 gap-y-4">
            <EditorialCTA
              label={`Call ${SALON_INFO.phones[0].display}`}
              href={SALON_INFO.phones[0].href}
              tone="light"
            />
            <EditorialCTA
              label={`Call ${SALON_INFO.phones[1].display}`}
              href={SALON_INFO.phones[1].href}
              tone="gold"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
