"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiUser, FiMail, FiCheckCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const ProfileUpdatePage = () => {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
    }
  }, [session?.user]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      setMessage("");
      return;
    }

    setIsUpdating(true);
    setError("");
    setMessage("");

    try {
      const { error: updateError } = await authClient.updateUser({
        name: trimmedName,
      });

      if (updateError) {
        setError(updateError.message || "Failed to update your profile.");
        return;
      }

      await refetch();
      setMessage("Your profile has been updated successfully.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending || !session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8faf8] px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#05893E]" />
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-140px)] bg-[#f8faf8] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#05893E]"
        >
          <FiArrowLeft size={18} />
          Back to My Profile
        </Link>

        <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#05893E] text-white">
                <FiUser size={27} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#17251d]">
                  Update Profile
                </h1>
                <p className="mt-1 text-sm text-[#858585]">
                  Manage your personal information.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6 p-6 sm:p-8">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Full Name
              </label>

              <div className="relative">
                <FiUser
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="h-12 w-full rounded-[10px] border border-gray-200 bg-white pl-11 pr-4 text-sm text-[#17251d] outline-none transition focus:border-[#05893E] focus:ring-2 focus:ring-[#05893E]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Email Address
              </label>

              <div className="relative">
                <FiMail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={session.user.email}
                  readOnly
                  className="h-12 w-full cursor-not-allowed rounded-[10px] border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-500 outline-none"
                />
              </div>

              <p className="mt-2 text-xs text-[#858585]">
                Your email address cannot be changed here.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-[10px] border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {message && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-[10px] border border-green-100 bg-green-50 px-4 py-3 text-sm text-[#05893E]"
              >
                <FiCheckCircle size={18} className="mt-0.5 shrink-0" />
                {message}
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row">
              <button
                type="submit"
                disabled={isUpdating}
                className="flex h-12 flex-1 items-center justify-center rounded-[10px] bg-[#05893E] px-5 text-sm font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.12)] transition-all hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdating ? "Updating..." : "Update Information"}
              </button>

              <Link
                href="/profile"
                className="flex h-12 items-center justify-center rounded-[10px] border border-gray-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfileUpdatePage;
