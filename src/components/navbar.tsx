import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import Navlinks from "./navlinks";
import AuthMenu from "./AuthMenu";

const Navbar = () => {
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main Navbar */}
      <div className="w-full border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-[70px] w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-[10px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#05893E] text-white">
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

          <AuthMenu />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <Navlinks />
      </div>
    </header>
  );
};

export default Navbar;
