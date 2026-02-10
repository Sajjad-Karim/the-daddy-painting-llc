import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { gsap } from "gsap";
import { CONTACT, SOCIAL } from "../data/contact";
import logoImage from "../assets/logo.png";
import whiteLogoImage from "../assets/whiteLogo.png";
import menuLeftImage from "../assets/Rectangle.png";
import facebookIcon from "../assets/facebook.svg";
import instagramIcon from "../assets/insta.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuOverlayRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightPanelRef = useRef(null);
  const logoRef = useRef(null);
  const closeButtonRef = useRef(null);
  const menuItemsRef = useRef([]);
  const socialIconsRef = useRef(null);
  const bottomSectionRef = useRef(null);
  const timelineRef = useRef(null);

  const handleCallNow = () => {
    window.location.href = CONTACT.phoneHref;
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((previousState) => !previousState);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMenuOpen) {
      setIsAnimating(true);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      gsap.set(menuOverlayRef.current, {
        opacity: 0,
        display: "flex",
      });

      if (reduceMotion) {
        gsap.set(menuOverlayRef.current, { opacity: 1, display: "flex" });
        gsap.set(rightPanelRef.current, { opacity: 1 });
        gsap.set(logoRef.current, { opacity: 1 });
        gsap.set(closeButtonRef.current, { opacity: 1 });
        menuItemsRef.current.forEach((item) => item && gsap.set(item, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 }));
        gsap.set(socialIconsRef.current, { opacity: 1, y: 0, scale: 1, rotation: 0 });
        gsap.set(bottomSectionRef.current, { opacity: 1, y: 0, scale: 1, rotationX: 0 });
        leftImageRef.current && gsap.set(leftImageRef.current, { clipPath: "inset(0 0 0 0)", x: 0 });
        tl.to({}, { duration: 0, onComplete: () => setIsAnimating(false) });
      } else if (isMobile) {
        // Mobile: simple fade-only animations to avoid layout shift and performance issues
        gsap.set(leftImageRef.current, { opacity: 0 });
        gsap.set(rightPanelRef.current, { opacity: 0 });
        gsap.set(logoRef.current, { opacity: 0 });
        gsap.set(closeButtonRef.current, { opacity: 0 });
        menuItemsRef.current.forEach((item) => {
          if (item) gsap.set(item, { opacity: 0, y: 12 });
        });
        gsap.set(socialIconsRef.current, { opacity: 0, y: 20 });
        gsap.set(bottomSectionRef.current, { opacity: 0, y: 24 });

        tl.to(menuOverlayRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        })
          .to(rightPanelRef.current, { opacity: 1, duration: 0.3 }, "-=0.1")
          .to(logoRef.current, { opacity: 1, duration: 0.25 }, "-=0.2")
          .to(closeButtonRef.current, { opacity: 1, duration: 0.2 }, "-=0.2")
          .to(
            menuItemsRef.current,
            { opacity: 1, y: 0, duration: 0.3, stagger: 0.06 },
            "-=0.15",
          )
          .to(socialIconsRef.current, { opacity: 1, y: 0, duration: 0.25 }, "-=0.2")
          .to(bottomSectionRef.current, { opacity: 1, y: 0, duration: 0.3 }, "-=0.2");
      } else {
        // Desktop: full split-panel animations
        gsap.set(leftImageRef.current, {
          clipPath: "inset(0 100% 0 0)",
          x: -50,
        });
        gsap.set(rightPanelRef.current, {
          clipPath: "inset(0 0 0 100%)",
          x: 50,
        });
        gsap.set(logoRef.current, {
          opacity: 0,
          scale: 0.3,
          rotation: -45,
          transformOrigin: "center center",
        });
        gsap.set(closeButtonRef.current, {
          opacity: 0,
          scale: 0,
          x: 30,
          y: -30,
          rotation: 270,
          transformOrigin: "center center",
        });
        menuItemsRef.current.forEach((item, index) => {
          if (item) {
            const isEven = index % 2 === 0;
            gsap.set(item, {
              opacity: 0,
              x: isEven ? -60 : 60,
              y: index * 10,
              scale: 0.9,
              rotation: isEven ? -15 : 15,
              transformOrigin: "center center",
            });
          }
        });
        gsap.set(socialIconsRef.current, {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotation: 90,
        });
        gsap.set(bottomSectionRef.current, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          rotationX: 45,
          transformOrigin: "center bottom",
        });

        tl.to(menuOverlayRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        })
          .to(
            leftImageRef.current,
            { clipPath: "inset(0 0% 0 0)", x: 0, duration: 0.6, ease: "power2.inOut" },
            "+=0.1",
          )
          .to(
            rightPanelRef.current,
            { clipPath: "inset(0 0 0 0%)", x: 0, duration: 0.6, ease: "power2.inOut" },
            "-=0.6",
          )
          .to(
            logoRef.current,
            { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.3)" },
            "-=0.35",
          )
          .to(
            closeButtonRef.current,
            { opacity: 1, scale: 1, x: 0, y: 0, rotation: 0, duration: 0.4, ease: "power2.out" },
            "-=0.4",
          )
          .to(
            menuItemsRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.4,
              stagger: { each: 0.08, from: "start" },
              ease: "power3.out",
            },
            "-=0.25",
          )
          .to(
            socialIconsRef.current,
            { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.4, ease: "power2.out" },
            "-=0.2",
          )
          .to(
            bottomSectionRef.current,
            { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.5, ease: "power3.out" },
            "-=0.25",
          );
      }

      timelineRef.current = tl;
    } else if (menuOverlayRef.current) {
      setIsAnimating(true);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const closeTl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      if (reduceMotion) {
        gsap.set(menuOverlayRef.current, { opacity: 0 });
        closeTl.to({}, { duration: 0 });
      } else if (isMobile) {
        // Mobile: simple fade-out
        closeTl
          .to(bottomSectionRef.current, { opacity: 0, y: 16, duration: 0.2 }, 0)
          .to(socialIconsRef.current, { opacity: 0, y: 12, duration: 0.2 }, 0)
          .to(
            menuItemsRef.current,
            { opacity: 0, y: -8, duration: 0.2, stagger: 0.03 },
            0,
          )
          .to(closeButtonRef.current, { opacity: 0, duration: 0.2 }, 0)
          .to(logoRef.current, { opacity: 0, duration: 0.2 }, 0)
          .to(rightPanelRef.current, { opacity: 0, duration: 0.2 }, 0)
          .to(menuOverlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
      } else {
        // Desktop: full close animations
        closeTl
          .to(bottomSectionRef.current, {
            opacity: 0,
            y: 60,
            scale: 0.9,
            rotationX: -45,
            duration: 0.3,
            ease: "power2.in",
          })
          .to(
            socialIconsRef.current,
            { opacity: 0, y: 40, scale: 0.8, rotation: -90, duration: 0.25, ease: "power2.in" },
            "-=0.2",
          )
          .to(
            menuItemsRef.current,
            {
              opacity: 0,
              x: (idx) => (idx % 2 === 0 ? -40 : 40),
              y: (idx) => idx * -8,
              scale: 0.8,
              rotation: (idx) => (idx % 2 === 0 ? -15 : 15),
              duration: 0.25,
              stagger: { each: 0.04, from: "end" },
              ease: "power2.in",
            },
            "-=0.15",
          )
          .to(
            closeButtonRef.current,
            { opacity: 0, scale: 0.5, x: 30, y: -30, rotation: 180, duration: 0.25, ease: "power2.in" },
            "-=0.2",
          )
          .to(
            logoRef.current,
            { opacity: 0, scale: 0.5, rotation: 30, duration: 0.25, ease: "power2.in" },
            "-=0.2",
          )
          .to(
            leftImageRef.current,
            { clipPath: "inset(0 100% 0 0)", x: -50, duration: 0.4, ease: "power2.in" },
            "-=0.15",
          )
          .to(
            rightPanelRef.current,
            { clipPath: "inset(0 0 0 100%)", x: 50, duration: 0.4, ease: "power2.in" },
            "-=0.4",
          )
          .to(
            menuOverlayRef.current,
            { opacity: 0, duration: 0.2, ease: "power2.in" },
            "-=0.25",
          );
      }

      timelineRef.current = closeTl;
    }

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isMenuOpen]);

  return (
    <header className="w-full">
      <div className="mx-auto max-w-6xl px-6 py-3">
        {/* Mobile header */}
        <div className="flex items-center justify-between md:hidden">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02] rounded"
            aria-label="Go to home page"
          >
            <img
              src={logoImage}
              alt="The Daddy's Painting LLC logo"
              className="h-16 w-auto"
            />
          </Link>

          {/* Call now pill */}
          <button
            type="button"
            onClick={handleCallNow}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-semibold text-[#02A11F] cursor-pointer hover:bg-[#F3F4F6] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#02A11F]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#02A11F] text-white">
              <Phone className="h-3 w-3" aria-hidden="true" />
            </span>
            <span className='font-["Inter"] leading-tight'>
              <span className="block">Call Now</span>
              <span className="block text-[9px] font-semibold">
                {CONTACT.phoneDisplay}
              </span>
            </span>
          </button>

          {/* Menu icon */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D2928] text-white shadow-md cursor-pointer hover:bg-[#1F1B1A] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
            aria-label="Open main menu"
            aria-pressed={isMenuOpen}
            onClick={handleToggleMenu}
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop header */}
        <div className="hidden items-center justify-between gap-8 md:flex">
          {/* Left: circular menu icon + label */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D2928] text-white shadow-md cursor-pointer hover:bg-[#1F1B1A] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
              aria-label="Open main menu"
              aria-pressed={isMenuOpen}
              onClick={handleToggleMenu}
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className='text-sm font-medium text-[#039A02] font-["Alexandria"]'>
              Menu
            </span>
          </div>

          {/* Center: logo */}
          <Link
            to="/"
            className="flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02] rounded"
            aria-label="Go to home page"
          >
            <img
              src={logoImage}
              alt="The Daddy's Painting LLC logo"
              className="h-20 w-auto md:h-30"
            />
          </Link>

          {/* Right: Call Now */}
          <button
            type="button"
            className="flex items-center gap-3 text-sm cursor-pointer"
            onClick={handleCallNow}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#039A02] text-white">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="leading-tight text-left text-[#039A02]">
              <p className="text-sm font-semibold">Call Now</p>
              <p className="text-sm font-semibold">{CONTACT.phoneDisplay}</p>
            </div>
          </button>
        </div>
      </div>

      {(isMenuOpen || isAnimating) &&
        createPortal(
          <div
            ref={menuOverlayRef}
            className="fixed inset-0 z-[9999] flex isolate bg-[#2D2928] md:bg-transparent overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Left image panel */}
            <div
              ref={leftImageRef}
              className="hidden h-full w-1/2 bg-white md:block"
            >
              <img
                src={menuLeftImage}
                style={{ objectPosition: "0% 20%" }}
                alt="Painting roller and wall"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Right dark menu panel */}
            <div
              ref={rightPanelRef}
              className="flex w-full min-h-screen flex-col justify-between bg-[#2D2928] px-6 py-6 text-white md:min-h-0 md:w-1/2 md:px-10 md:py-10"
            >
              {/* Top: logo + close button */}
              <div className="flex items-start justify-between">
                <Link
                  to="/"
                  onClick={handleCloseMenu}
                  className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded inline-block"
                  aria-label="Go to home page"
                >
                  <div ref={logoRef}>
                    <img
                      src={whiteLogoImage}
                      alt="The Daddy's Painting LLC logo"
                      className="h-16 w-auto md:h-20"
                    />
                  </div>
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseMenu}
                  aria-label="Close main menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A1F88B] text-[#111827] shadow-md cursor-pointer hover:bg-[#8BEF5F] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A1F88B]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Center: navigation links + social icons */}
              <div className="mt-8 flex flex-1 flex-col items-center justify-center gap-8 md:mt-10 md:gap-10">
                <nav className="flex flex-col items-center gap-3 text-center md:gap-4">
                  {[
                    { label: "ABOUT US", href: "/about" },
                    { label: "SERVICES", href: "/services" },
                    { label: "WHY CHOOSE US", href: "/why-choose-us" },
                    { label: "GALLERY", href: "/gallery" },
                  ].map((item, index) => (
                    <Link
                      key={item.label}
                      ref={(el) => {
                        if (el) menuItemsRef.current[index] = el;
                      }}
                      to={item.href}
                      onClick={handleCloseMenu}
                      className='text-3xl font-extrabold uppercase tracking-[0.18em] text-white hover:text-[#A1F88B] cursor-pointer font-["Inter"] md:text-4xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1F88B] focus-visible:ring-offset-2 rounded'
                      aria-label={`Navigate to ${item.label}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div ref={socialIconsRef} className="flex items-center gap-4">
                  <a
                    href={SOCIAL.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A1F88B] text-white shadow-sm cursor-pointer hover:bg-[#A1F88B]/20 hover:border-[#8BEF5F] hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A1F88B]"
                    aria-label="Visit our Facebook page"
                  >
                    <img
                      src={facebookIcon}
                      alt="Facebook"
                      className="h-4 w-4 object-contain"
                    />
                  </a>
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A1F88B] text-white shadow-sm cursor-pointer hover:bg-[#A1F88B]/20 hover:border-[#8BEF5F] hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A1F88B]"
                    aria-label="Visit our Instagram profile"
                  >
                    <img
                      src={instagramIcon}
                      alt="Instagram"
                      className="h-4 w-4 object-contain"
                    />
                  </a>
                </div>
              </div>

              {/* Bottom: call now */}
              <div
                ref={bottomSectionRef}
                className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-6 pb-4 md:flex-row"
              >
                <button
                  type="button"
                  onClick={handleCallNow}
                  className="flex items-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1F88B] focus-visible:ring-offset-2 rounded"
                  aria-label="Call now"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A1F88B] text-[#2D2928]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className='text-xs uppercase tracking-[0.18em] text-[#A1F88B] font-["Inter"] text-left'>
                    <p className="font-semibold">Call Now</p>
                    <p className="mt-1 text-sm normal-case tracking-normal text-[#A1F88B] font-semibold">
                      {CONTACT.phoneDisplay}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
};

export default Header;
