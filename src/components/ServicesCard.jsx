import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import tickIcon from "../assets/tick.png";

const ServicesCard = ({ service, image }) => {
  const benefits = service.detailPoints ?? [];

  return (
    <Link
      to={`/services/${service.slug}`}
      data-services-card
      className="group relative block overflow-hidden rounded-[28px] border border-[#02B446]/15 bg-white shadow-[0_4px_24px_rgba(3,154,2,0.06)] transform-gpu transition-transform duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-[#039A02]/40 hover:shadow-[0_26px_60px_rgba(15,23,42,0.45)] active:border-[#039A02]/40 active:shadow-[0_26px_60px_rgba(15,23,42,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#039A02] focus-visible:ring-offset-4"
      aria-label={`View ${service.title} details`}
    >
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#039A02] via-[#02B446] to-[#02A11F] opacity-70 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />

      <div
        data-services-card-image
        className="relative h-52 w-full overflow-hidden sm:h-60"
      >
        <img
          src={image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] group-active:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2928]/90 via-[#2D2928]/35 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

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

      <div
        data-services-card-content
        className="flex h-full flex-col bg-gradient-to-br from-white to-[#F8FDF9] p-6 transform-gpu transition-transform duration-500 ease-out group-hover:-translate-y-1"
      >
        <p className='mb-5 text-sm leading-relaxed text-[#2D2928]/90 font-["Inter"] md:text-base'>
          {service.body}
        </p>

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

        <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#039A02] transition-colors group-hover:text-[#02A11F] group-active:text-[#02A11F]">
          Request a Free Estimate
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0.5 group-active:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
};

export default ServicesCard;
