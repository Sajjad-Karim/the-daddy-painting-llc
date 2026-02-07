const MarqueeStrip = () => (
  <section className="relative overflow-hidden border-y border-white bg-[#02A11F] py-3">
    <div className="absolute inset-0 pointer-events-none" />
    <div className="mx-auto max-w-full">
      <div className="marquee-horizontal">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className='mx-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-white font-["Alexandria"]'
          >
            Top-rated painters in{" "}
            <span className="font-extrabold text-white">
              Easley &amp; Greenville, SC
            </span>
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default MarqueeStrip;
