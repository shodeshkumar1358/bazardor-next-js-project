"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiEdit3 } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  if (isPending || !session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#05893E]" />
      </main>
    );
  }

  const firstLetter = session.user.name?.trim().charAt(0) || "U";

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const updatedName = name.trim();

    if (!updatedName) {
      setMessage("আপনার নাম লিখুন।");
      return;
    }

    if (updatedName === session.user.name) {
      setMessage("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setIsUpdating(true);

    try {
      const result = await authClient.updateUser({
        name: updatedName,
      });

      if (result.error) {
        setMessage(result.error.message || "নাম আপডেট করা যায়নি।");
      } else {
        setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      }
    } catch {
      setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace("/signin");
    router.refresh();
  };

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#f0f5f0] px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <div className="mx-auto mb-7 max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-[#17251d]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-base text-slate-600">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-7">
          {/* User Information Card */}
          <section className="flex flex-col gap-5 rounded-[20px] border border-[#dfe8e0] bg-[#fbfdfb] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
            <div className="flex min-w-0 items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#05893E] text-3xl font-semibold uppercase text-white">
                {firstLetter}
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-xl font-semibold text-[#17251d] sm:text-2xl">
                  {session.user.name || "ব্যবহারকারী"}
                </h2>
                <p className="mt-1 break-all text-base text-slate-500">
                  {session.user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-red-400 px-5 text-base font-semibold text-red-500 transition hover:bg-red-50 active:scale-[0.98] sm:self-center"
            >
              <FiLogOut size={18} />
              সাইন আউট
            </button>
          </section>

          {/* Update Name Card */}
          <section className="rounded-[20px] border border-[#dfe8e0] bg-[#fbfdfb] p-6 sm:px-6 sm:py-7">
            <h2 className="mb-5 text-xl font-bold text-[#17251d]">
              নাম হালনাগাদ করুন
            </h2>

            <form onSubmit={handleUpdate}>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-base font-medium text-[#17251d]"
              >
                নাম
              </label>

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                maxLength={100}
                className="h-[50px] w-full rounded-xl border border-[#cfd7d0] bg-transparent px-4 text-base text-[#17251d] outline-none transition placeholder:text-gray-400 focus:border-[#05893E] focus:ring-2 focus:ring-[#05893E]/15"
              />

              {message && (
                <p
                  role="status"
                  className={`mt-3 text-sm ${
                    message.includes("সফলভাবে")
                      ? "text-[#05893E]"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={isUpdating}
                className="mt-4 inline-flex h-[50px] items-center justify-center gap-2 rounded-xl bg-[#05893E] px-5 text-base font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiEdit3 size={17} />
                {isUpdating ? "আপডেট হচ্ছে..." : "নাম হালনাগাদ করুন"}
              </button>
            </form>
          </section>

          {/* Optional Home Link */}
          <div className="text-center">
            <Link
              href="/"
              className="text-sm font-medium text-slate-500 transition hover:text-[#05893E]"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
