import React from "react";
import { Link } from "react-router-dom";
import { SALON_IMAGES, SALON_INFO } from "../data/salonData";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#382834] text-[#FFF9F3] pt-20 pb-12 px-6 md:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#C7A36A]/25">
          {/* Brand Column with Large Official Logo */}
          <div className="md:col-span-5 flex flex-col items-start gap-6">
            <Link to="/" aria-label="Signature Beauty Salon Home">
              <img
                src={SALON_IMAGES.logoGold}
                alt="Signature Beauty Salon official logo"
                className="h-16 md:h-20 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="font-display italic text-xl md:text-2xl text-[#EBCBCB] max-w-md leading-relaxed">
              &ldquo;{SALON_INFO.bioMessage}&rdquo;
            </p>
            <p className="text-sm text-[#FFF9F3]/75 max-w-sm leading-relaxed">
              Bahrain&apos;s welcoming beauty sanctuary at {SALON_INFO.location.verifiedArea} (
              {SALON_INFO.location.roadReference}).
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C7A36A]">
              Explore
            </p>
            <nav aria-label="Footer Navigation" className="flex flex-col gap-3 text-sm">
              <Link
                to="/"
                className="text-[#FFF9F3]/85 hover:text-[#C7A36A] transition-colors self-start"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-[#FFF9F3]/85 hover:text-[#C7A36A] transition-colors self-start"
              >
                Services &amp; Treatments
              </Link>
              <Link
                to="/about"
                className="text-[#FFF9F3]/85 hover:text-[#C7A36A] transition-colors self-start"
              >
                About Signature Beauty
              </Link>
              <Link
                to="/about#gallery"
                className="text-[#FFF9F3]/85 hover:text-[#C7A36A] transition-colors self-start"
              >
                Salon Gallery
              </Link>
              <Link
                to="/contact"
                className="text-[#FFF9F3]/85 hover:text-[#C7A36A] transition-colors self-start"
              >
                Contact &amp; Appointments
              </Link>
            </nav>
          </div>

          {/* Contact & Hours Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C7A36A]">
              Appointments &amp; Location
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-[#FFF9F3]/85">
              <div className="flex flex-wrap gap-x-6 gap-y-1 tabular-nums">
                {SALON_INFO.phones.map((phone) => (
                  <a
                    key={phone.display}
                    href={phone.href}
                    className="hover:text-[#C7A36A] transition-colors font-semibold"
                  >
                    {phone.formatted}
                  </a>
                ))}
              </div>
              <p className="text-[#FFF9F3]/75 tabular-nums">
                {SALON_INFO.hours.daysSummary} · {SALON_INFO.hours.daily}
              </p>
              <a
                href={SALON_INFO.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EBCBCB] hover:text-[#C7A36A] transition-colors self-start"
              >
                {SALON_INFO.location.verifiedArea} · Block 913, Riffa ({SALON_INFO.location.plusCode}) ↗
              </a>
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-editorial text-[#C7A36A] hover:text-[#FFF9F3] self-start mt-2"
              >
                <span>Instagram {SALON_INFO.handle}</span>
                <span className="cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FFF9F3]/55">
          <p>© {new Date().getFullYear()} Signature Beauty Salon — Bahrain. All rights reserved.</p>
          <p>
            Official Instagram:{" "}
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EBCBCB] hover:text-[#FFF9F3] transition-colors"
            >
              {SALON_INFO.handle}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
