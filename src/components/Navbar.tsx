import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { SALON_IMAGES, SALON_INFO, VERIFIED_SERVICES } from "../data/salonData";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname, location.hash, location.key]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openServices = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 160);
  };

  const isHome = location.pathname === "/";
  const isServices = location.pathname === "/services";
  const isAbout = location.pathname === "/about" && location.hash !== "#gallery";
  const isGallery = location.pathname === "/about" && location.hash === "#gallery";
  const isContact = location.pathname === "/contact";

  const linkTextColor = scrolled
    ? "text-[#382834] hover:text-[#74384F]"
    : "text-[#FFF9F3] hover:text-[#EBCBCB]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full max-w-full z-50 transition-all duration-400 ${
          scrolled
            ? "bg-[#FFF9F3]/95 backdrop-blur-md border-b border-[#74384F]/12 py-3"
            : "bg-gradient-to-b from-[#382834]/75 via-[#382834]/35 to-transparent py-4 md:py-5"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Crisp Official Signature Beauty Logo */}
          <Link
            to="/"
            className="shrink-0 flex items-center py-1 focus-visible:outline-[#C7A36A]"
            aria-label="Signature Beauty Salon Home"
          >
            <img
              src={scrolled ? SALON_IMAGES.logoGold : SALON_IMAGES.logoIvory}
              alt="Signature Beauty Salon logo"
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled
                  ? "h-10 sm:h-11 md:h-12"
                  : "h-11 sm:h-12 md:h-14 drop-shadow-[0_2px_10px_rgba(56,40,52,0.45)]"
              }`}
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Zone 2: Horizontal Navigation (visible from tablet md:768px up) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-5 lg:gap-8 text-[12px] lg:text-[13px] font-semibold tracking-[0.13em] uppercase"
          >
            <Link
              to="/"
              data-active={isHome}
              className={`nav-link-editorial transition-colors ${linkTextColor}`}
            >
              Home
            </Link>

            <div
              ref={dropdownContainerRef}
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <div className="flex items-center gap-1">
                <Link
                  to="/services"
                  data-active={isServices}
                  onFocus={openServices}
                  className={`nav-link-editorial transition-colors ${linkTextColor}`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  aria-label="Toggle beauty services menu"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((prev) => !prev)}
                  onFocus={openServices}
                  className={`p-1 bg-transparent border-none outline-none cursor-pointer transition-colors ${linkTextColor}`}
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {servicesOpen && (
                <div
                  className="absolute left-0 top-full pt-4 min-w-[270px]"
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                >
                  <div className="bg-[#FFF9F3] border-t border-b border-[#C7A36A]/40 py-5 px-6 shadow-[0_18px_40px_rgba(56,40,52,0.12)]">
                    <div className="flex flex-col gap-3.5 text-left">
                      <Link
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#74384F] hover:text-[#382834] transition-colors whitespace-nowrap py-1"
                      >
                        All Verified Treatments →
                      </Link>
                      <div className="h-px bg-[#74384F]/10" />
                      {VERIFIED_SERVICES.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/services#${cat.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="group flex flex-col py-1 text-left focus-visible:outline-[#C7A36A]"
                        >
                          <span className="text-[13px] font-semibold tracking-[0.06em] normal-case text-[#382834] group-hover:text-[#74384F] transition-colors">
                            {cat.number}. {cat.title}
                          </span>
                          <span className="text-[11px] font-normal tracking-normal normal-case text-[#373235]/65">
                            {cat.treatments.map((t) => t.name).join(" · ")}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/about"
              data-active={isAbout}
              className={`nav-link-editorial transition-colors ${linkTextColor}`}
            >
              About Us
            </Link>

            <Link
              to="/about#gallery"
              data-active={isGallery}
              className={`nav-link-editorial transition-colors ${linkTextColor}`}
            >
              Gallery
            </Link>

            <Link
              to="/contact"
              data-active={isContact}
              className={`nav-link-editorial transition-colors ${linkTextColor}`}
            >
              Contact
            </Link>
          </nav>

          {/* Zone 3: Desktop Primary CTA + Unclipped Mobile Menu Button */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className={`hidden lg:inline-flex cta-editorial ${
                scrolled
                  ? "text-[#74384F] hover:text-[#382834]"
                  : "text-[#FFF9F3] hover:text-[#EBCBCB]"
              }`}
            >
              <span>Book Appointment</span>
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              className={`md:hidden inline-flex items-center gap-2 py-2 px-1 bg-transparent border-none outline-none cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                scrolled ? "text-[#382834]" : "text-[#FFF9F3]"
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                {mobileOpen ? "Close" : "Menu"}
              </span>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Height Editorial Navigation Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#FFF9F3] text-[#382834] flex flex-col justify-between px-6 py-6 overflow-y-auto md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#74384F]/12">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                aria-label="Signature Beauty Salon Home"
              >
                <img
                  src={SALON_IMAGES.logoGold}
                  alt="Signature Beauty Salon logo"
                  className="h-11 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="p-2.5 bg-transparent border-none text-[#382834] cursor-pointer inline-flex items-center gap-1.5"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.16em]">Close</span>
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={`font-display text-3xl font-semibold py-2 ${
                  isHome ? "text-[#74384F]" : "text-[#382834]"
                }`}
              >
                Home
              </Link>

              <div className="flex flex-col">
                <div className="flex items-center justify-between py-2">
                  <Link
                    to="/services"
                    onClick={() => setMobileOpen(false)}
                    className={`font-display text-3xl font-semibold ${
                      isServices ? "text-[#74384F]" : "text-[#382834]"
                    }`}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    aria-label="Expand services submenu"
                    aria-expanded={mobileServicesOpen}
                    className="p-2.5 bg-transparent border-none text-[#74384F] cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                {mobileServicesOpen && (
                  <div className="pl-4 mt-1 mb-2 flex flex-col gap-3 border-l border-[#C7A36A]/45">
                    {VERIFIED_SERVICES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/services#${cat.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="text-sm font-medium text-[#74384F] py-1"
                      >
                        {cat.number}. {cat.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={`font-display text-3xl font-semibold py-2 ${
                  isAbout ? "text-[#74384F]" : "text-[#382834]"
                }`}
              >
                About Us
              </Link>

              <Link
                to="/about#gallery"
                onClick={() => setMobileOpen(false)}
                className={`font-display text-3xl font-semibold py-2 ${
                  isGallery ? "text-[#74384F]" : "text-[#382834]"
                }`}
              >
                Gallery
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className={`font-display text-3xl font-semibold py-2 ${
                  isContact ? "text-[#74384F]" : "text-[#382834]"
                }`}
              >
                Contact
              </Link>

              <div className="pt-4">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="cta-editorial text-[#74384F]"
                >
                  <span>Book Appointment</span>
                  <span className="cta-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </nav>
          </div>

          <div className="pt-8 mt-8 border-t border-[#74384F]/15 flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#74384F]">
              Direct Appointments · {SALON_INFO.hours.daysSummary}, {SALON_INFO.hours.daily}
            </p>
            <div className="flex flex-wrap gap-6">
              {SALON_INFO.phones.map((phone) => (
                <a
                  key={phone.display}
                  href={phone.href}
                  className="cta-editorial text-[#382834]"
                >
                  <span>Call {phone.display}</span>
                  <span className="cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}
            </div>
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-editorial text-[#74384F] self-start"
            >
              <span>Instagram {SALON_INFO.handle}</span>
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
