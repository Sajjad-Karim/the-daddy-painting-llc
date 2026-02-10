import { Phone, MapPin, Star, Facebook, Instagram } from "lucide-react";
import contactLogoImage from "../../assets/logo.png";
import googleImage from "../../assets/google.png";
import { CONTACT, SOCIAL } from "../../data/contact";

const FORM_LABELS = ["Full Name", "Phone Number", "Email", "Message"];

const ContactSection = ({
  leftRef,
  formRef,
  onCallNow,
  onRequestEstimate,
  leftColumnAttrs = {},
  logoAttrs = {},
  headingAttrs = {},
  subheadingAttrs = {},
  callButtonAttrs = {},
  formDataAttrs = {},
  buttonDataAttrs = {},
  sectionClassName,
}) => {
  const handleCallNow = () => {
    if (onCallNow) {
      onCallNow();
    } else {
      window.location.href = CONTACT.phoneHref;
    }
  };

  const handleRequestEstimate = () => {
    if (onRequestEstimate) {
      onRequestEstimate();
    } else {
      window.alert(
        "Thank you! Your free estimate request has been received. We'll contact you shortly.",
      );
    }
  };

  return (
    <section
      className={
        sectionClassName ??
        "relative bg-[#E1F8F2] pb-10 pt-10 md:pb-24 md:pt-10"
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:gap-24 lg:flex-row lg:items-start">
        <div
          ref={leftRef}
          className="w-full lg:w-1/2"
          {...leftColumnAttrs}
        >
          <div className="flex flex-col items-center space-y-6 text-center md:items-start md:text-left">
            <div className="flex justify-center md:justify-start">
              <img
                src={contactLogoImage}
                alt="The Daddy's Painting LLC logo"
                className="w-50 h-36"
                {...logoAttrs}
              />
            </div>

            <div className="space-y-3">
              <h2
                className='mx-auto font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-left md:text-[35px] font-["Rubik_One"] leading-tight'
                {...headingAttrs}
              >
                PROFESSIONAL RESIDENTIAL &amp; COMMERCIAL PAINTING SERVICES YOU
                CAN TRUST.
              </h2>
              <p
                className='text-sm text-[#2D2928] font-["Alexandria"]'
                {...subheadingAttrs}
              >
                Top-rated painters in{" "}
                <span className="font-bold">Easley &amp; Greenville, SC</span>
              </p>
            </div>

            <div className="flex flex-col items-center space-y-1 md:items-start">
              <div className="flex items-center gap-3">
                <span className="mt-1 flex h-8 w-8 items-center justify-center text-[#039A02]">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="">{CONTACT.phoneDisplay}</p>
              </div>

              <div className="flex items-center gap-1">
                <span className="mt-1 flex h-8 w-8 items-center justify-center text-[#039A02]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="">Easley, SC &amp; Surrounding Areas</p>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <img
                src={googleImage}
                alt="Google logo"
                className="h-5 w-auto md:h-6"
              />
              <p className='text-xs text-[#2D2928] font-bold font-["Inter"]'>
                5.0 Verified Customer Reviews <span>|</span>
              </p>
              <div className="flex items-center gap-1 text-[#02A11F]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-3.5 w-3.5 fill-[#02A11F] text-[#02A11F]"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <button
                type="button"
                onClick={handleCallNow}
                className="flex items-center gap-3 rounded-[10px] bg-[#039A02] px-6 py-3 text-sm font-semibold text-white shadow-md cursor-pointer hover:bg-[#02A11F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
                {...callButtonAttrs}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className='font-["Alexandria"]'>
                  Call Now: <span className="font-bold">{CONTACT.phoneDisplay}</span>
                </span>
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border-[#2D2928] border-1 text-[#2D2928] cursor-pointer hover:bg-[#039A02]/10 hover:border-[#039A02] hover:text-[#039A02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border-[#2D2928] border-1 text-[#2D2928] cursor-pointer hover:bg-[#039A02]/10 hover:border-[#039A02] hover:text-[#039A02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
                  aria-label="Visit our Instagram profile"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div
            ref={formRef}
            className="relative mx-auto max-w-md rounded-[40px] bg-[#2D2928] px-7 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.45)] md:max-w-none md:px-10 md:py-10 md:mt-20"
            {...formDataAttrs}
          >
            <h3 className='mb-6 text-lg font-semibold leading-snug text-white md:text-xl font-["Inter"]'>
              Contact The Daddy&apos;s Painting LLC today for a free,
              no-obligation estimate.
            </h3>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleRequestEstimate();
              }}
            >
              {FORM_LABELS.map((label) => (
                <div key={label} className="space-y-1">
                  <label
                    htmlFor={label.toLowerCase().replace(/\s+/g, "-")}
                    className='block text-xs font-medium text-white/80 font-["Inter"]'
                  >
                    {label}
                  </label>
                  {label === "Message" ? (
                    <textarea
                      id={label.toLowerCase().replace(/\s+/g, "-")}
                      rows={3}
                      className="w-full border-b border-white/40 bg-transparent pb-1 text-sm text-white placeholder:text-white/40 focus-visible:outline-none"
                    />
                  ) : (
                    <input
                      id={label.toLowerCase().replace(/\s+/g, "-")}
                      type="text"
                      className="w-full border-b border-white/40 bg-transparent pb-1 text-sm text-white placeholder:text-white/40 focus-visible:outline-none"
                    />
                  )}
                </div>
              ))}
            </form>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#02A11F] px-6 py-3 text-sm font-semibold shadow-md cursor-pointer hover:bg-[#039A02] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-white focus-visible:ring-[#02A11F]"
              {...buttonDataAttrs}
            >
              <span className='font-["Alexandria"] text-white'>
                Request Free Estimate
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
