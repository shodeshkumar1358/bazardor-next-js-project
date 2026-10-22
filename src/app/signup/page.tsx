"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signupError } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (signupError) {
        setError(signupError.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      router.push("/profile/update");
      router.refresh();
    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করো
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            BazarDor-এ যোগ দিতে তথ্যগুলো পূরণ করো।
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            নাম
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="তোমার নাম"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
          />
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
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
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
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
        </button>

        <p className="text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন ইন করো
          </Link>
        </p>
      </form>
    </main>
  );
}
