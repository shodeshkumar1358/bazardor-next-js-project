import Image from "next/image";

const HeroSection = () => {
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="bg-[#edfff2dc] px-4 py-7">
      <div className="mx-auto max-w-6xl">
        <div className="flex min-h-[380px] items-center overflow-hidden rounded-[28px] border border-[#dce5df] bg-[#fbfbfb] px-2 py-5 sm:px-6 lg:px-10">
          {/* Left */}
          <div className="w-full lg:w-[60%]">
            {/* Date */}
            <span className="inline-flex rounded-full bg-[#e3f3ea] px-3.5 py-1.5 text-sm font-medium text-[#07883e]">
              {currentDate}
            </span>

            {/* Heading */}
            <h2 className="mt-4 max-w-[550px] text-[28px] font-bold leading-[1.25] tracking-[-0.5px] text-[#101b17] sm:text-[32px] lg:text-[38px]">
              আজকের বাজারের দাম এক নজরে
            </h2>

            {/* Description */}
            <p className="mt-2 max-w-[600px] text-[14px] leading-[1.7] text-[#59645f] sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Button */}
            <div className="mt-6">
              <a
                href="#Anchor"
                className="inline-flex rounded-lg bg-[#008f43] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#007a39]"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="hidden w-[40%] items-center justify-center lg:flex">
            <Image
              src="/bazar-hero.svg"
              alt="আজকের বাজারের দাম"
              width={430}
              height={340}
              priority
              className="h-auto w-full max-w-[430px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
