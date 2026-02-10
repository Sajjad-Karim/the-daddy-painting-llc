import { useRef } from "react";
import { SERVICES } from "../../data/services";
import interiorServiceImage from "../../assets/services/interior.png";
import exteriorServiceImage from "../../assets/services/exterior.png";
import cabinetServiceImage from "../../assets/services/cabnet.png";
import deckServiceImage from "../../assets/services/deck.png";
import powerWashServiceImage from "../../assets/services/5cc36eecc8cdae32a2898857854381d890492e4e.png";
import drywallServiceImage from "../../assets/services/drywall.png";
import borderVectorImage from "../../assets/borderVector.png";
import ServicesHero from "../../components/sections/ServicesHero";
import ServicesCard from "../../components/ServicesCard";
import ContactSection from "../../components/sections/ContactSection";

const SERVICE_IMAGES = {
  interior: interiorServiceImage,
  exterior: exteriorServiceImage,
  cabinet: cabinetServiceImage,
  deck: deckServiceImage,
  powerWash: powerWashServiceImage,
  drywall: drywallServiceImage,
};

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

  const getImage = (service) =>
    SERVICE_IMAGES[service.imageKey] || interiorServiceImage;

  return (
    <div ref={servicesCardsRootRef}>
      <ServicesHero />

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
            {paintingItems.map((service) => (
              <ServicesCard
                key={service.slug}
                service={service}
                image={getImage(service)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#E1F8F2] pb-10 pt-6 md:pb-16 md:pt-4">
        <div className="relative mx-auto max-w-6xl px-4">
          <h2 className='mb-6 font-bold text-[#2D2928] sm:text-3xl md:mb-12 md:text-[40px] font-["Rubik_One"] uppercase leading-tight'>
            Surface Preparation &amp; Finishing
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {prepFinishingItems.map((service) => (
              <ServicesCard
                key={service.slug}
                service={service}
                image={getImage(service)}
              />
            ))}
          </div>
        </div>
      </section>

      <ContactSection
        leftRef={eighthLeftRef}
        formRef={eighthFormRef}
      />
    </div>
  );
};

export default Services;
