import { Link } from "react-router-dom";
import { SERVICES } from "../../data/services";
import thirdSectionBg from "../../assets/thirdSectionBg.png";
import interiorServiceImage from "../../assets/services/interior.png";
import exteriorServiceImage from "../../assets/services/exterior.png";
import cabinetServiceImage from "../../assets/services/cabnet.png";
import deckServiceImage from "../../assets/services/deck.png";
import powerWashServiceImage from "../../assets/services/5cc36eecc8cdae32a2898857854381d890492e4e.png";
import drywallServiceImage from "../../assets/services/drywall.png";

const SERVICE_IMAGES = {
  interior: interiorServiceImage,
  exterior: exteriorServiceImage,
  cabinet: cabinetServiceImage,
  deck: deckServiceImage,
  powerWash: powerWashServiceImage,
  drywall: drywallServiceImage,
};

const HomeServicesGrid = ({ servicesGridRef, serviceCardsRefs }) => {
  const getImage = (imageKey) =>
    SERVICE_IMAGES[imageKey] || interiorServiceImage;

  return (
    <section className="relative bg-[#E1F8F2] pb-10 pt-10 md:pb-24 md:pt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 h-[700px]"
        style={{
          backgroundImage: `url(${thirdSectionBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "cover",
        }}
      />

      <div className="relative">
        <div
          ref={servicesGridRef}
          className="relative grid grid-cols-2 gap-3 md:gap-10 md:grid-cols-3 -mt-10 mx-auto max-w-6xl px-4"
        >
          {SERVICES.map((card, index) => {
            const image = getImage(card.imageKey);
            return (
              <div
                key={card.slug}
                ref={serviceCardsRefs[index]}
                data-service-card
                className="group relative h-[280px] overflow-hidden rounded-[25px] text-left text-white shadow-xl md:h-[400px] cursor-pointer transform-gpu transition-transform duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_22px_45px_rgba(15,23,42,0.45)]"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  data-service-card-content
                  className="absolute inset-x-3 bottom-3 rounded-[10px] bg-gradient-to-t from-black/85 via-black/75 to-black/60 px-3 py-4 md:px-6 md:py-6 transform-gpu transition-all duration-500 ease-out group-hover:translate-y-[-6px] group-hover:from-black/90 group-hover:via-black/80 group-hover:to-black/70"
                >
                  <h3 className='mb-2 max-w-xs text-base md:font-extrabold leading-tight tracking-[0.03em] text-[#E9FFF7] md:mb-3 md:text-4xl font-["inter"]'>
                    {card.title}
                  </h3>
                  <p className='text-xs md:leading-relaxed text-[#F9FAFB] md:text-sm font-["Inter"]'>
                    {card.body}
                  </p>
                  <Link
                    to={`/services/${card.slug}`}
                    className='mt-2 inline-flex text-[10px] font-semibold text-white md:mt-4 md:text-[12px] cursor-pointer hover:text-[#A1F88B] transition-colors font-["Inter"] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1F88B] focus-visible:ring-offset-2'
                    aria-label={`Learn more about ${card.title}`}
                  >
                    Learn More &gt;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeServicesGrid;
