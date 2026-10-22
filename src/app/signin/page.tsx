"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signinError } = await authClient.signIn.email({
        email,
        password,
      });

      if (signinError) {
        setError(signinError.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSignin}
        className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
          <p className="mt-2 text-sm text-gray-500">
            তোমার অ্যাকাউন্টে প্রবেশ করো।
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            ইমেইল
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="name@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            পাসওয়ার্ড
          </label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="তোমার পাসওয়ার্ড"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
        </button>

        <p className="text-center text-sm text-gray-600">
          নতুন ব্যবহারকারী?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700 hover:underline"
          >
            অ্যাকাউন্ট তৈরি করো
          </Link>
        </p>
      </form>
    </main>
  );
}
