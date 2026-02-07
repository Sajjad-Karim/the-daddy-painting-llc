import { Link } from "react-router-dom";
import skyVectorImage from "../../assets/vector.png";
import skyImage from "../../assets/sky.png";

const ServiceAreaSection = ({ sixthHeadingRef }) => (
  <section
    id="gallery"
    className="relative overflow-hidden"
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
        alt="Paint stroke sky pattern"
        className="h-full w-full object-cover"
      />
    </div>

    <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-10 pt-6 md:pt-4 lg:pt-4">
      <section className="mt-10 flex w-full flex-col items-center text-center">
        <h1
          ref={sixthHeadingRef}
          className='mt-6 text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] leading-tight'
        >
          Proudly Serving Easley, SC & Surrounding Areas.
        </h1>
        <p className='text-sm text-[#2D2928] font-["Inter"] max-w-xl'>
          We are ready to work on your residential or commercial project. Our
          service area covers a wide radius including Easley, Greenville,
          Spartanburg, Slater-Marietta, Greer, Laurens, Powdersville, and
          Clemson.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/gallery"
            className="flex items-center gap-2 rounded-full bg-[#039A02] px-8 py-3 text-sm font-semibold text-[#111827] shadow-md cursor-pointer hover:bg-[#02A11F] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
          >
            <span className='font-["Alexandria"] text-white'>
              View Our Gallery
            </span>
          </Link>
        </div>
      </section>
    </div>
  </section>
);

export default ServiceAreaSection;
