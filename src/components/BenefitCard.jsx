import tickIcon from "../assets/tick.png";

const BenefitCard = ({ title, description, refProp }) => (
  <div
    ref={refProp}
    className="rounded-[26px] border-2 h-fit border-[#02B446] px-5 py-6 shadow-sm"
  >
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-6 w-6 items-center justify-center">
        <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
      </span>
      <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"]'>
        {title}
      </h3>
    </div>
    <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
      {description}
    </p>
  </div>
);

export default BenefitCard;
