import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Phone,
  MapPin,
  Star,
  Facebook,
  Instagram,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../components/Header";
import { SERVICES } from "../../data/services";
import skyVectorImage from "../../assets/vector.png";
import skyImage from "../../assets/sky.png";
import borderVectorImage from "../../assets/borderVector.png";
import interiorServiceImage from "../../assets/services/interior.png";
import exteriorServiceImage from "../../assets/services/exterior.png";
import cabinetServiceImage from "../../assets/services/cabnet.png";
import deckServiceImage from "../../assets/services/deck.png";
import powerWashServiceImage from "../../assets/services/5cc36eecc8cdae32a2898857854381d890492e4e.png";
import drywallServiceImage from "../../assets/services/drywall.png";
import tickIcon from "../../assets/tick.png";
import contactLogoImage from "../../assets/logo.png";
import googleImage from "../../assets/google.png";
import aiIcon from "../../assets/start.png";
import {
  initServicesScrollAnimations,
  cleanupScrollAnimations,
} from "../../utils/scrollAnimations";

const SERVICE_IMAGES = {
  interior: interiorServiceImage,
  exterior: exteriorServiceImage,
  cabinet: cabinetServiceImage,
  deck: deckServiceImage,
  powerWash: powerWashServiceImage,
  drywall: drywallServiceImage,
};

/**
 * Group services into Painting Services and Surface Preparation & Finishing.
 */
const PAINTING_SERVICES = [
  "interior-painting",
  "exterior-painting",
  "cabinet-painting",
  "deck-fence-staining",
];
const PREP_FINISHING_SERVICES = ["power-washing", "drywall-repair"];

const Services = () => {
  const servicesCardsRootRef = useRef(null);
  const eighthLeftRef = useRef(null);
  const eighthFormRef = useRef(null);

  const paintingItems = SERVICES.filter((s) =>
    PAINTING_SERVICES.includes(s.slug),
  );
  const prepFinishingItems = SERVICES.filter((s) =>
    PREP_FINISHING_SERVICES.includes(s.slug),
  );

  useEffect(() => {
    let refreshTimer;
    const timer = setTimeout(() => {
      initServicesScrollAnimations({
        servicesCardsRootRef,
        eighthLeftRef,
        eighthFormRef,
      });
      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }, 400);

    return () => {
      clearTimeout(timer);
      clearTimeout(refreshTimer);
      cleanupScrollAnimations();
    };
  }, []);

  const renderServiceCard = (service, index) => {
    const image = SERVICE_IMAGES[service.imageKey] || interiorServiceImage;
    const benefits = service.detailPoints ?? [];

    return (
      <Link
        key={service.slug}
        to={`/services/${service.slug}`}
        data-services-card
        className="group relative block overflow-hidden rounded-[28px] border border-[#02B446]/15 bg-white shadow-[0_4px_24px_rgba(3,154,2,0.06)] hover:border-[#039A02]/40 hover:shadow-[0_24px_56px_rgba(3,154,2,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#039A02] focus-visible:ring-offset-4"
        style={{ willChange: "transform" }}
        aria-label={`View ${service.title} details`}
      >
        {/* Top accent bar */}
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#039A02] via-[#02B446] to-[#02A11F] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Image header */}
        <div
          data-services-card-image
          className="relative h-52 w-full overflow-hidden sm:h-60"
        >
          <img
            src={image}
            alt={service.title}
            className="h-full w-full object-cover group-hover:scale-110"
            style={{ willChange: "transform" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D2928]/90 via-[#2D2928]/35 to-transparent" />

          {/* Floating title chip */}
          <div className="absolute bottom-4 left-4 right-4">
            <div
              data-services-card-chip
              className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white shadow-lg backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#A1F88B]" />
              <span className='truncate text-[11px] font-semibold uppercase tracking-[0.18em] font-["Inter"]'>
                {service.title}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          data-services-card-content
          className="flex h-full flex-col bg-gradient-to-br from-white to-[#F8FDF9] p-6"
        >
          <p className='mb-5 text-sm leading-relaxed text-[#2D2928]/90 font-["Inter"] md:text-base'>
            {service.body}
          </p>

          {/* Benefits - pill style */}
          {benefits.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {benefits.slice(0, 3).map((point, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#E1F8F2] to-[#F0FDF4] px-3.5 py-2 text-xs font-medium text-[#2D2928] shadow-[0_1px_3px_rgba(3,154,2,0.08)] ring-1 ring-[#02B446]/15"
                >
                  <img
                    src={tickIcon}
                    alt=""
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  {point}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#039A02] transition-colors group-hover:text-[#02A11F]">
            Request a Free Estimate
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div ref={servicesCardsRootRef}>
      {/* Hero section */}
      <main
        className="relative  overflow-hidden md:min-h-[550px]"
        style={{
          backgroundImage: `url(${skyImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <img
            src={skyVectorImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-12 pt-4 md:min-h-[500px] md:pb-10 md:pt-4">
          <Header />

          <section className="mt-10 flex w-full flex-col items-center text-center md:mt-12">
            <div className="inline-flex max-w-xs items-center gap-2 rounded-md bg-[#FFFFFF1A] px-6 py-2 text-[10px] tracking-wide text-[#1F2933] shadow-sm backdrop-blur md:max-w-none md:text-base">
              <span className='uppercase font-["Alexandria"]'>
                The Daddy&apos;s Painting LLC
              </span>
            </div>
            <h1 className='mt-4 text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] leading-tight'>
              OUR PAINTING SERVICES
            </h1>
            <p className='mt-4 max-w-2xl text-sm leading-relaxed text-[#2D2928] font-["Inter"] md:text-base'>
              From interior and exterior painting to cabinet refinishing, deck
              staining, power washing, and drywall repair—we deliver
              professional results for homes and businesses across Easley,
              Greenville, and surrounding areas.
            </p>
          </section>
        </div>
      </main>

      {/* Painting Services section */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-10 md:pb-16 md:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-[40px] z-0"
        >
          <img
            src={borderVectorImage}
            alt=""
            className="h-80 w-full object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-4">
          <h2 className='mb-6 font-bold text-[#2D2928] sm:text-3xl md:mb-12 md:text-[40px] font-["Rubik_One"] uppercase leading-tight'>
            Painting Services
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {paintingItems.map((service, index) =>
              renderServiceCard(service, index),
            )}
          </div>
        </div>
      </section>

      {/* Surface Preparation & Finishing section */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-6 md:pb-16 md:pt-4">
        <div className="relative mx-auto max-w-6xl px-4">
          <h2 className='mb-6 font-bold text-[#2D2928] sm:text-3xl md:mb-12 md:text-[40px] font-["Rubik_One"] uppercase leading-tight'>
            Surface Preparation &amp; Finishing
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {prepFinishingItems.map((service, index) =>
              renderServiceCard(service, paintingItems.length + index),
            )}
          </div>
        </div>
      </section>

      {/* Contact + estimate form section */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-10 md:pb-24 md:pt-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:gap-24 lg:flex-row lg:items-start">
          {/* Left column: logo, heading, contact details, reviews, call-to-action */}
          <div ref={eighthLeftRef} className="w-full lg:w-1/2">
            <div className="flex flex-col items-center space-y-6 text-center md:items-start md:text-left">
              {/* Logo */}
              <div className="flex justify-center md:justify-start">
                <img
                  src={contactLogoImage}
                  alt="The Daddy's Painting LLC logo"
                  className="w-50 h-36"
                />
              </div>

              {/* Main heading + subheading */}
              <div className="space-y-3">
                <h2 className='mx-auto font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-left md:text-[45px] font-["Rubik_One"] leading-tight'>
                  PROFESSIONAL RESIDENTIAL &amp; COMMERCIAL PAINTING SERVICES
                  YOU CAN TRUST.
                </h2>
                <p className='text-sm text-[#2D2928] font-["Alexandria"]'>
                  Top-rated painters in{" "}
                  <span className="font-bold">Easley &amp; Greenville, SC</span>
                </p>
              </div>

              {/* Contact rows */}
              <div className="flex flex-col items-center space-y-1 md:items-start">
                <div className="flex items-center gap-3">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center text-[#039A02]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="">(864) 451-2806</p>
                </div>

                <div className="flex items-center gap-1">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center text-[#039A02]">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="">Easley, SC &amp; Surrounding Areas</p>
                </div>
              </div>

              {/* Google reviews */}
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
                    // eslint-disable-next-line react/no-array-index-key
                    <Star
                      key={index}
                      className="h-3.5 w-3.5 fill-[#02A11F] text-[#02A11F]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* Call now + social icons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-[10px] bg-[#039A02] px-6 py-3 text-sm font-semibold text-white shadow-md cursor-pointer hover:bg-[#02A11F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className='font-["Alexandria"]'>
                    Call Now: <span className="font-bold">(864) 451-2806</span>
                  </span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full border-[#2D2928] border-1 text-[#2D2928] cursor-pointer hover:bg-[#039A02]/10 hover:border-[#039A02] hover:text-[#039A02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full border-[#2D2928] border-1 text-[#2D2928] cursor-pointer hover:bg-[#039A02]/10 hover:border-[#039A02] hover:text-[#039A02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
                    aria-label="Visit our Instagram profile"
                  >
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: estimate form card */}
          <div className="w-full lg:w-1/2">
            <div
              ref={eighthFormRef}
              className="relative mx-auto max-w-md rounded-[40px] bg-[#2D2928] px-7 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.45)] md:max-w-none md:px-10 md:py-10 md:mt-20"
            >
              <h3 className='mb-6 text-lg font-semibold leading-snug text-white md:text-xl font-["Inter"]'>
                Contact The Daddy's Painting LLC today for a free, no-obligation
                estimate.
              </h3>

              <form className="space-y-5">
                {["Full Name", "Phone Number", "Email", "Message"].map(
                  (label) => (
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
                  ),
                )}
              </form>

              <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#02A11F] px-6 py-3 text-sm font-semibold shadow-md cursor-pointer hover:bg-[#039A02] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-white focus-visible:ring-[#02A11F]"
              >
                <span className='font-["Alexandria"] text-white'>
                  Request Free Estimate
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Talk to our AI bubble + icon */}
        <div className="pointer-events-auto absolute bottom-10 right-5">
          <div className="relative">
            {/* Speech bubble */}
            <div className="inline-flex items-center rounded-md w-fit bg-white px-3.5 py-1.5 text-[11px] font-extrabold text-base text-[#02A11F] shadow-md relative -left-20 -top-1">
              Talk to our AI
            </div>

            {/* Green circular AI icon */}
            <img
              src={aiIcon}
              alt="AI assistant"
              className="h-20 w-20 object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
