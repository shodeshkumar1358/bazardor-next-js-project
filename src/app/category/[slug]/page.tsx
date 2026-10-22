import Link from "next/link";
import { notFound } from "next/navigation";
import type { Products } from "@/type/type";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProducts(): Promise<Products[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

function getPriceChange(today: number, yesterday: number) {
  if (yesterday === 0) return null;
  return ((today - yesterday) / yesterday) * 100;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const products = await getProducts();

  const categoryProducts = products.filter(
    (product) => product.category === slug,
  );

  if (categoryProducts.length === 0) {
    notFound();
  }

  const category = categoryProducts[0];

  return (
    <main className="min-h-screen bg-[#f0f5f0]">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        {/* Category Header */}
        <section className="rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eff5ef] text-2xl">
              {category.image}
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#17251c] sm:text-2xl">
                {category.categoryNameBn}
              </h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {categoryProducts.length.toLocaleString("bn-BD")}টি পণ্যের আজকের
                দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        {/* Product Count */}
        <div className="mb-4 mt-6 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-slate-600 sm:text-base">
            মোট {categoryProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো
            হচ্ছে
          </p>
        </div>

        {/* Product Grid */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => {
            const change = getPriceChange(
              Number(product.today),
              Number(product.yesterday),
            );

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
              >
                {/* Product Name */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                    {product.image}
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-[#17251c] transition-colors group-hover:text-green-700 sm:text-lg">
                      {product.nameBn}
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      প্রতি {product.unit}
                    </p>
                  </div>
                </div>

                {/* Price and Change */}
                <div className="mt-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-slate-500">আজকের দাম</p>

                    <p className="mt-1 text-lg font-bold text-[#17251c] sm:text-xl">
                      {Number(product.today).toLocaleString("bn-BD")} টাকা
                    </p>
                  </div>

                  {change !== null && (
                    <span
                      className={`mb-0.5 shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                        change > 0
                          ? "bg-red-50 text-red-600"
                          : change < 0
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {change > 0 ? "▲" : change < 0 ? "▼" : "—"}{" "}
                      {Math.abs(change).toLocaleString("bn-BD", {
                        maximumFractionDigits: 1,
                      })}
                      %
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
