"use client";

import { useState } from "react";
import { FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const AuthMenu = () => {
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) return;

      setUserMenuOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="h-10 w-20 animate-pulse rounded-[10px] bg-gray-100" />
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-[10px]">
        <Link
          href="/signin"
          className="flex h-[40px] items-center rounded-[10px] px-[15px] text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-300"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="flex h-[40px] items-center rounded-[10px] bg-green-600 px-[15px] text-[15px] font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-all hover:bg-green-700 hover:shadow-[0_3px_7px_rgba(0,0,0,0.2)] active:scale-[0.98]"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[10px]">
      <div className="relative">
        <button
          type="button"
          onClick={() => setUserMenuOpen((prev) => !prev)}
          aria-expanded={userMenuOpen}
          aria-label="User menu"
          className="flex items-center gap-2 rounded-[10px] px-2 py-1.5 transition-colors hover:bg-slate-100"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#05893E] text-lg font-bold uppercase text-white">
            {session.user.name?.trim().charAt(0) || "U"}
          </span>

          <span className="max-w-[140px] truncate text-[15px] font-semibold text-[#17251d]">
            {session.user.name}
          </span>

          <FiChevronDown
            className={`text-slate-600 transition-transform ${
              userMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {userMenuOpen && (
          <div className="absolute right-0 top-full z-[60] mt-2 w-[270px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            <div className="border-b border-gray-100 px-4 py-4">
              <p className="truncate text-[15px] font-bold text-[#17251d]">
                {session.user.name}
              </p>

              <p className="mt-1 truncate text-[13px] text-[#858585]">
                {session.user.email}
              </p>
            </div>

            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-slate-700 transition-colors hover:bg-green-50 hover:text-[#05893E]"
              >
                <FiUser size={18} />
                My Profile
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
              >
                <FiLogOut size={18} />
                {signingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthMenu;
