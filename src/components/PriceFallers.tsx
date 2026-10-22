import Link from "next/link";
import { Products } from "@/type/type";

const PriceDown = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const products: Products[] = await res.json();

  const priceDownProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => a.change!.pct - b.change!.pct)
    .slice(0, 6);

  return (
    <section className="bg-[#edfff2dc] py-5 sm:py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm text-green-600">▼</span>
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            আজ দাম কমেছে
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {priceDownProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="block rounded-2xl outline-none transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-green-600"
              aria-label={`${product.nameBn} এর বিস্তারিত দাম দেখুন`}
            >
              <article className="h-full rounded-2xl border border-[#dfe7df] bg-[#fbfcfa] p-3 transition-shadow duration-200 hover:shadow-md sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ef] text-2xl">
                    {product.image || product.categoryIcon || "🛒"}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-base leading-5 font-bold text-gray-900 sm:text-lg">
                      {product.nameBn}
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                      প্রতি{" "}
                      {product.unit === "kg"
                        ? "কেজি"
                        : product.unit === "piece"
                          ? "পিস"
                          : product.unit === "dozen"
                            ? "ডজন"
                            : product.unit === "liter"
                              ? "লিটার"
                              : product.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-gray-500">আজকের দাম</p>

                    <p className="mt-0.5 text-lg leading-6 font-bold text-gray-950 sm:text-xl">
                      {Number(product.today).toLocaleString("bn-BD")}{" "}
                      <span className="text-sm font-normal">টাকা</span>
                    </p>
                  </div>

                  <span className="mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f5ef] px-2.5 py-1 text-xs font-medium text-green-600">
                    <span className="text-[10px]">▼</span>
                    {Math.abs(Number(product.change?.pct ?? 0)).toLocaleString(
                      "bn-BD",
                    )}
                    %
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {priceDownProducts.length === 0 && (
          <p className="rounded-xl bg-white p-5 text-center text-sm text-gray-500">
            আজ দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
};

export default PriceDown;
