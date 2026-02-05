import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, Phone, ArrowUpRight, X } from "lucide-react";
import { gsap } from "gsap";
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

  const handleToggleMenu = () => {
    setIsMenuOpen((previousState) => !previousState);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      setIsAnimating(true);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      // Set unique initial states for each element
      gsap.set(menuOverlayRef.current, {
        opacity: 0,
        display: "flex",
      });
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
      // Each menu item from different directions
      menuItemsRef.current.forEach((item, index) => {
        if (item) {
          const isEven = index % 2 === 0;
          gsap.set(item, {
            opacity: 0,
            x: isEven ? -80 : 80,
            y: index * 15,
            scale: 0.6,
            rotation: isEven ? -25 : 25,
            transformOrigin: "center center",
          });
        }
      });
      gsap.set(socialIconsRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.3,
        rotation: 180,
      });
      gsap.set(bottomSectionRef.current, {
        opacity: 0,
        y: 120,
        scale: 0.8,
        rotationX: 90,
        transformOrigin: "center bottom",
      });

      // 1. Overlay: quick fade in
      tl.to(menuOverlayRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      })
        // 2. Left panel: clip-path reveal from left
        .to(
          leftImageRef.current,
          {
            clipPath: "inset(0 0% 0 0)",
            x: 0,
            duration: 0.7,
            ease: "power2.inOut",
          },
          "+=0.1",
        )
        // 3. Right panel: clip-path reveal from right (parallel)
        .to(
          rightPanelRef.current,
          {
            clipPath: "inset(0 0 0 0%)",
            x: 0,
            duration: 0.7,
            ease: "power2.inOut",
          },
          "-=0.7",
        )
        // 4. Logo: scale + rotate from center
        .to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.5)",
          },
          "-=0.4",
        )
        // 5. Close button: spin in from top-right
        .to(
          closeButtonRef.current,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
          },
          "-=0.5",
        )
        // 6. Menu items: each from alternating sides with stagger
        .to(
          menuItemsRef.current,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            stagger: {
              each: 0.1,
              from: "start",
            },
            ease: "power3.out",
          },
          "-=0.3",
        )
        // 7. Social icons: bounce up from bottom
        .to(
          socialIconsRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "bounce.out",
          },
          "-=0.2",
        )
        // 8. Bottom section: flip up from bottom
        .to(
          bottomSectionRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        );

      timelineRef.current = tl;
    } else if (menuOverlayRef.current) {
      setIsAnimating(true);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const closeTl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      // Close animations - each element exits uniquely
      closeTl
        // Bottom: flip down
        .to(bottomSectionRef.current, {
          opacity: 0,
          y: 80,
          scale: 0.85,
          rotationX: -45,
          duration: 0.35,
          ease: "power2.in",
        })
        // Social: spin down
        .to(
          socialIconsRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.4,
            rotation: -180,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.25",
        )
        // Menu items: exit to alternating sides
        .to(
          menuItemsRef.current,
          {
            opacity: 0,
            x: (index) => (index % 2 === 0 ? -60 : 60),
            y: (index) => index * -10,
            scale: 0.5,
            rotation: (index) => (index % 2 === 0 ? -30 : 30),
            duration: 0.3,
            stagger: {
              each: 0.05,
              from: "end",
            },
            ease: "power2.in",
          },
          "-=0.2",
        )
        // Close button: spin out to top-right
        .to(
          closeButtonRef.current,
          {
            opacity: 0,
            scale: 0,
            x: 40,
            y: -40,
            rotation: 270,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.25",
        )
        // Logo: scale down and rotate
        .to(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.2,
            rotation: 45,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.25",
        )
        // Panels: clip-path close
        .to(
          leftImageRef.current,
          {
            clipPath: "inset(0 100% 0 0)",
            x: -50,
            duration: 0.5,
            ease: "power2.in",
          },
          "-=0.2",
        )
        .to(
          rightPanelRef.current,
          {
            clipPath: "inset(0 0 0 100%)",
            x: 50,
            duration: 0.5,
            ease: "power2.in",
          },
          "-=0.5",
        )
        // Overlay: fade out
        .to(
          menuOverlayRef.current,
          {
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
          },
          "-=0.3",
        );

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
              className="h-10 w-auto"
            />
          </Link>

          {/* Call now pill */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-semibold text-[#02A11F] cursor-pointer hover:bg-[#F3F4F6] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#02A11F]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#02A11F] text-white">
              <Phone className="h-3 w-3" aria-hidden="true" />
            </span>
            <span className='font-["Inter"] leading-tight'>
              <span className="block">Call Now</span>
              <span className="block text-[9px] font-semibold">
                (864) 451-2806
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
        <div className="hidden items-center justify-between md:flex">
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

          {/* Right group: logo + call now + CTA */}
          <div className="flex items-center gap-10">
            {/* Logo (closer to Call Now than Menu) */}
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

            {/* Call Now + CTA */}
            <div className="flex items-center gap-6">
              {/* Call Now inline group (no white background) */}
              <div className="hidden items-center gap-3 text-sm md:flex">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#039A02] text-white">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div className="leading-tight text-[#039A02]">
                  <p className="text-sm font-semibold">Call Now</p>
                  <p className="text-sm font-semibold">(864) 451-2806</p>
                </div>
              </div>

              {/* Get a Free Estimate pill */}
              <button
                type="button"
                className="flex items-center gap-3 rounded-full bg-[#2D2928] px-5 py-2 text-sm font-semibold text-white shadow-md cursor-pointer hover:bg-[#1F1B1A] hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#039A02] text-white">
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className='text-[#A1F88B] font-["Inter"]'>
                  Get a Free Estimate
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {(isMenuOpen || isAnimating) && (
        <div
          ref={menuOverlayRef}
          className="fixed inset-0 z-50 flex bg-[#2D2928] md:bg-transparent overflow-y-auto"
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
                {["ABOUT US", "SERVICES", "WHY CHOOSE US", "GALLERY"].map(
                  (menuLabel, index) => (
                    <button
                      key={menuLabel}
                      ref={(el) => {
                        if (el) menuItemsRef.current[index] = el;
                      }}
                      type="button"
                      className='text-3xl font-extrabold uppercase tracking-[0.18em] text-white hover:text-[#A1F88B] cursor-pointer font-["Inter"] md:text-4xl'
                    >
                      {menuLabel}
                    </button>
                  ),
                )}
              </nav>

              <div ref={socialIconsRef} className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A1F88B] text-white shadow-sm cursor-pointer hover:bg-[#A1F88B]/20 hover:border-[#8BEF5F] hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A1F88B]"
                  aria-label="Visit our Facebook page"
                >
                  <img
                    src={facebookIcon}
                    alt="Facebook"
                    className="h-4 w-4 object-contain"
                  />
                </button>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A1F88B] text-white shadow-sm cursor-pointer hover:bg-[#A1F88B]/20 hover:border-[#8BEF5F] hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A1F88B]"
                  aria-label="Visit our Instagram profile"
                >
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="h-4 w-4 object-contain"
                  />
                </button>
              </div>
            </div>

            {/* Bottom: call now + primary CTA */}
            <div
              ref={bottomSectionRef}
              className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 pb-4 md:flex-row"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A1F88B] text-[#2D2928]">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className='text-xs uppercase tracking-[0.18em] text-[#A1F88B] font-["Inter"]'>
                  <p className="font-semibold">Call Now</p>
                  <p className="mt-1 text-sm normal-case tracking-normal text-[#A1F88B] font-semibold">
                    (864) 451-2806
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center gap-3 rounded-full bg-gradient-to-r from-white via-[#E9FFF5] to-[#C8F1FF] p-3 text-sm font-semibold text-[#02A11F] shadow-md cursor-pointer hover:shadow-xl hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#02A11F]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#02A11F] text-white">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className='font-["Inter"] font-bold'>
                  Get a Free Estimate
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
