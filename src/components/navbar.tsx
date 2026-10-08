import { FiShoppingCart } from "react-icons/fi";
import Navlinks from "./navlinks";
import Link from "next/link";

const Navbar = () => {
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header>
      <div className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto flex h-[70px] w-full items-center justify-between px-0">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center gap-[10px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#05893E] text-slate-300">
                <FiShoppingCart size={20} strokeWidth={2} />
              </div>

              <div className="flex flex-col">
                <h1 className="text-[20px] font-bold leading-[23px] tracking-[-0.4px] text-[#17251d]">
                  বাজার দর
                </h1>

                <span className="mt-[2px] text-[12px] leading-[17px] text-[#858585]">
                  {currentDate}
                </span>
              </div>
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              className="h-[40px] rounded-[10px] px-[15px] text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-300"
            >
              সাইন ইন
            </button>

            <button
              type="button"
              className="h-[40px] rounded-[10px] bg-green-600 px-[15px] text-[15px] font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-all hover:bg-green-700 hover:shadow-[0_3px_7px_rgba(0,0,0,0.2)] active:scale-[0.98]"
            >
              সাইন আপ
            </button>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 bg-white">
        <Navlinks></Navlinks>
      </div>
    </header>
  );
};

export default Navbar;
