import Header from "../Header";
import skyVectorImage from "../../assets/vector.png";
import skyImage from "../../assets/sky.png";

const ServicesHero = () => (
  <main
    className="relative overflow-hidden md:min-h-[550px]"
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
      <img src={skyVectorImage} alt="" className="h-full w-full object-cover" />
    </div>

    <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-12 pt-4 md:min-h-[500px] md:pb-10 md:pt-4">
      <Header />

      <section className="mt-10 flex w-full flex-col items-center text-center md:mt-12">
        <div className="inline-flex max-w-xs items-center gap-2 rounded-md bg-[#FFFFFF1A] px-6 py-2 text-[10px] tracking-wide text-[#1F2933] shadow-sm backdrop-blur md:max-w-none md:text-base">
          <span className='uppercase font-["Alexandria"]'>
            The Daddy&apos;s Painting LLC
          </span>
        </div>
        <h1 className='mt-4 text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[35px] font-["Rubik_One"] leading-tight'>
          OUR PAINTING SERVICES
        </h1>
        <p className='mt-4 max-w-2xl text-sm leading-relaxed text-[#2D2928] font-["Inter"] md:text-base'>
          From interior and exterior painting to cabinet refinishing, deck
          staining, power washing, and drywall repair—we deliver professional
          results for homes and businesses across Easley, Greenville, and
          surrounding areas.
        </p>
      </section>
    </div>
  </main>
);

export default ServicesHero;
