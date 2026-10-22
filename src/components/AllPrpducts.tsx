"use client";

import Link from "next/link";
import type { Products } from "@/type/type";
import { useEffect, useMemo, useState } from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

type SortOption = "default" | "price-low" | "price-high" | "change";

const AllProducts = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data: Products[] = await res.json();
        setProducts(data);
      } catch {
        setError("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    const result = [...products];

    switch (sortBy) {
      case "price-low":
        return result.sort((a, b) => a.today - b.today);

      case "price-high":
        return result.sort((a, b) => b.today - a.today);

      case "change":
        return result.sort(
          (a, b) => Math.abs(b.change?.pct ?? 0) - Math.abs(a.change?.pct ?? 0),
        );

      default:
        return result;
    }
  }, [products, sortBy]);

  const getUnit = (unit: string) => {
    switch (unit) {
      case "kg":
        return "কেজি";
      case "piece":
        return "পিস";
      case "dozen":
        return "ডজন";
      case "liter":
      case "litre":
        return "লিটার";
      default:
        return unit;
    }
  };

  return (
    <section id= "Anchor" className="bg-[#edfff2dc] py-5 sm:py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              সব পণ্য
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          {/* Sort Products */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label
              htmlFor="product-sort"
              className="shrink-0 text-xs font-medium text-gray-600 sm:text-sm"
            >
              সাজান
            </label>

            <select
              id="product-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-9 rounded-lg border border-[#dfe7df] bg-[#fbfcfa] px-3 text-xs text-gray-700 outline-none transition focus:ring-2 focus:ring-green-200 sm:text-sm"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[130px] animate-pulse rounded-2xl border border-[#dfe7df] bg-[#fbfcfa]"
              />
            ))}
          </div>
        ) : error ? (
          <p className="rounded-xl bg-white p-5 text-center text-sm text-red-600">
            {error}
          </p>
        ) : sortedProducts.length === 0 ? (
          <p className="rounded-xl bg-white p-5 text-center text-sm text-gray-500">
            কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          /* Product Cards */
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => {
              const isUp = product.change?.dir === "up";
              const isDown = product.change?.dir === "down";

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="block rounded-2xl outline-none transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-green-600"
                  aria-label={`${product.nameBn} এর বিস্তারিত দাম দেখুন`}
                >
                  <article className="h-full rounded-2xl border border-[#dfe7df] bg-[#fbfcfa] p-3 transition-shadow duration-200 hover:shadow-md sm:p-4">
                    {/* Product Information */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ef] text-2xl">
                        {product.image || product.categoryIcon || "🛒"}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-base leading-5 font-bold text-gray-900 sm:text-lg">
                          {product.nameBn}
                        </h3>

                        <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                          প্রতি {getUnit(product.unit)}
                        </p>
                      </div>
                    </div>

                    {/* Price and Price Change */}
                    <div className="mt-3 flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">আজকের দাম</p>

                        <p className="mt-0.5 text-lg leading-6 font-bold text-gray-950 sm:text-xl">
                          {Number(product.today).toLocaleString("bn-BD")}{" "}
                          <span className="text-sm font-normal">টাকা</span>
                        </p>
                      </div>

                      <span
                        className={`mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                          isUp
                            ? "bg-[#f0f5ef] text-red-600"
                            : isDown
                              ? "bg-[#e2f4e9] text-[#079451]"
                              : "bg-[#f0f5ef] text-gray-500"
                        }`}
                      >
                        {isUp ? (
                          <BiSolidUpArrow size={10} />
                        ) : isDown ? (
                          <BiSolidDownArrow size={10} />
                        ) : (
                          <span className="text-[10px]">—</span>
                        )}
                        {Math.abs(
                          Number(product.change?.pct ?? 0),
                        ).toLocaleString("bn-BD")}
                        %
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
