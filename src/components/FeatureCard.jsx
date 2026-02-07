const FeatureCard = ({ icon, iconAlt, label, refProp }) => (
  <div
    ref={refProp}
    className="relative flex flex-col items-center justify-between rounded-[24px] border border-white/40 bg-[#FFFFFF1A] px-6 py-6 text-center shadow-sm backdrop-blur-md"
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-between px-6 opacity-40"
    >
      <span className="h-12 w-px -translate-y-3 rotate-[-35deg] border border-[#CDEFE4]" />
      <span className="h-12 w-px -translate-y-3 rotate-[35deg] border border-[#CDEFE4]" />
    </div>
    <img src={icon} alt={iconAlt} className="mb-4 h-10 w-10 object-contain" />
    <p className='font-["Alexandria"] text-xs tracking-wide text-[#2D2928]'>
      {label}
    </p>
  </div>
);

export default FeatureCard;
