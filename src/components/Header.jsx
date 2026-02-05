import { useState } from "react";
import { Menu, Phone, ArrowUpRight, X } from "lucide-react";
import logoImage from "../assets/logo.png";
import whiteLogoImage from "../assets/whiteLogo.png";
import menuLeftImage from "../assets/Rectangle.png";
import facebookIcon from "../assets/facebook.svg";
import instagramIcon from "../assets/insta.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((previousState) => !previousState);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full">
      <div className="mx-auto max-w-6xl px-6 py-3">
        {/* Mobile header */}
        <div className="flex items-center justify-between md:hidden">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logoImage}
              alt="The Daddy's Painting LLC logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Call now pill */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-semibold text-[#02A11F] shadow-md cursor-pointer hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#02A11F]"
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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D2928] text-white shadow-md cursor-pointer hover:bg-[#1F1B1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D2928] text-white shadow-md cursor-pointer hover:bg-[#1F1B1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
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
            <div className="flex items-center justify-center">
              <img
                src={logoImage}
                alt="The Daddy's Painting LLC logo"
                className="h-20 w-auto md:h-30"
              />
            </div>

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
                className="flex items-center gap-3 rounded-full bg-[#2D2928] px-5 py-2 text-sm font-semibold text-white shadow-md cursor-pointer hover:bg-[#1F1B1A] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
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

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex bg-[#2D2928] md:bg-transparent overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Left image panel */}
          <div className="hidden h-full w-1/2 bg-white md:block">
            <img
              src={menuLeftImage}
              style={{ objectPosition: "0% 20%" }}
              alt="Painting roller and wall"
              className="h-full w-full object-cover "
            />
          </div>

          {/* Right dark menu panel */}
          <div className="flex w-full min-h-screen flex-col justify-between bg-[#2D2928] px-6 py-6 text-white md:min-h-0 md:w-1/2 md:px-10 md:py-10">
            {/* Top: logo + close button */}
            <div className="flex items-start justify-between">
              <div>
                <img
                  src={whiteLogoImage}
                  alt="The Daddy's Painting LLC logo"
                  className="h-16 w-auto md:h-20"
                />
              </div>
              <button
                type="button"
                onClick={handleCloseMenu}
                aria-label="Close main menu"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A1F88B] text-[#111827] shadow-md cursor-pointer hover:bg-[#8BEF5F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A1F88B]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Center: navigation links + social icons */}
            <div className="mt-8 flex flex-1 flex-col items-center justify-center gap-8 md:mt-10 md:gap-10">
              <nav className="flex flex-col items-center gap-3 text-center md:gap-4">
                {["ABOUT US", "SERVICES", "WHY CHOOSE US", "GALLERY"].map(
                  (menuLabel) => (
                    <button
                      key={menuLabel}
                      type="button"
                      className='text-3xl font-extrabold uppercase tracking-[0.18em] text-white hover:text-[#A1F88B] cursor-pointer font-["Inter"] md:text-4xl'
                    >
                      {menuLabel}
                    </button>
                  )
                )}
              </nav>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A1F88B] text-white shadow-sm cursor-pointer hover:bg-[#A1F88B]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A1F88B]"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A1F88B] text-white shadow-sm cursor-pointer hover:bg-[#A1F88B]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A1F88B]"
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
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 pb-4 md:flex-row">
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
                className="flex items-center gap-3 rounded-full bg-gradient-to-r from-white via-[#E9FFF5] to-[#C8F1FF] p-3 text-sm font-semibold text-[#02A11F] shadow-md cursor-pointer hover:shadow-lg hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#02A11F]"
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
