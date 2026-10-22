import Link from "next/link";
import { notFound } from "next/navigation";
import type { Products } from "@/type/type";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProducts(): Promise<Products[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  return res.json();
}

function formatPrice(price: number) {
  return price.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const products = await getProducts();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const lowestMarket = markets.reduce<number | null>(
    (lowest, market) =>
      lowest === null
        ? Number(market.min)
        : Math.min(lowest, Number(market.min)),
    null,
  );

  const highestMarket = markets.reduce<number | null>(
    (highest, market) =>
      highest === null
        ? Number(market.max)
        : Math.max(highest, Number(market.max)),
    null,
  );

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (sum, market) => sum + (Number(market.min) + Number(market.max)) / 2,
          0,
        ) / markets.length
      : Number(product.today);

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-5 sm:px-6 sm:py-7">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-800">{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4 sm:p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#eff5ef] text-3xl sm:h-[72px] sm:w-[72px] sm:text-4xl">
                {product.image}
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold text-[#17251c] sm:text-2xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  প্রতি {product.unit} · {product.categoryNameBn}
                </p>

                {(isUp || isDown) && (
                  <p
                    className={`mt-1.5 flex flex-wrap items-center gap-1 text-xs font-medium sm:text-sm ${
                      isUp ? "text-red-600" : "text-green-700"
                    }`}
                  >
                    {isUp ? (
                      <BiSolidUpArrow size={10} />
                    ) : (
                      <BiSolidDownArrow size={10} />
                    )}
                    গতকালের তুলনায় দাম {isUp ? "বেড়েছে" : "কমেছে"}
                    {product.change?.pct != null &&
                      ` ${formatPrice(Math.abs(Number(product.change.pct)))}%`}
                  </p>
                )}
              </div>
            </div>

            {/* Today's Price */}
            <div className="w-full shrink-0 rounded-xl bg-[#eff5ef] px-4 py-3 text-left sm:w-36 sm:text-center">
              <p className="text-xs text-slate-500 sm:text-sm">আজকের দাম</p>

              <p className="mt-1 text-2xl font-extrabold text-[#07883f] sm:text-3xl">
                {formatPrice(Number(product.today))}
              </p>

              <p className="text-xs text-slate-500">টাকা / {product.unit}</p>

              {(isUp || isDown) && (
                <p
                  className={`mt-1.5 flex items-center gap-1 text-xs font-semibold sm:justify-center ${
                    isUp ? "text-red-600" : "text-green-700"
                  }`}
                >
                  {isUp ? (
                    <BiSolidUpArrow size={10} />
                  ) : (
                    <BiSolidDownArrow size={10} />
                  )}

                  {product.change?.pct != null
                    ? `${formatPrice(Math.abs(Number(product.change.pct)))}%`
                    : isUp
                      ? "দাম বেড়েছে"
                      : "দাম কমেছে"}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Price Summary and Markets */}
        <section className="mt-4 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="mb-3 text-base font-bold text-[#17251c] sm:text-lg">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#dfe8df] p-3.5 sm:p-4">
              <p className="text-xs text-slate-500 sm:text-sm">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-xl font-bold text-green-700 sm:text-2xl">
                {formatPrice(lowestMarket ?? Number(product.today))}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-slate-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#dfe8df] p-3.5 sm:p-4">
              <p className="text-xs text-slate-500 sm:text-sm">সর্বোচ্চ দাম</p>

              <p className="mt-1 text-xl font-bold text-red-600 sm:text-2xl">
                {formatPrice(highestMarket ?? Number(product.today))}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-slate-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#dfe8df] p-3.5 sm:p-4">
              <p className="text-xs text-slate-500 sm:text-sm">গড় দাম</p>

              <p className="mt-1 text-xl font-bold text-green-700 sm:text-2xl">
                {formatPrice(averagePrice)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-slate-500">
                প্রতি {product.unit}-এর হিসাবে
              </p>
            </div>
          </div>

          {/* Market Price Table */}
          <h2 className="mb-3 mt-6 text-base font-bold text-[#17251c] sm:text-lg">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-[#dfe8df]">
            <table className="w-full min-w-[600px] border-collapse text-xs sm:text-sm">
              <thead className="bg-[#f6f9f6] text-slate-500">
                <tr>
                  <th className="px-3 py-3 text-left font-medium sm:px-4">
                    বাজার
                  </th>
                  <th className="px-3 py-3 text-left font-medium sm:px-4">
                    বিভাগ
                  </th>
                  <th className="px-3 py-3 text-right font-medium sm:px-4">
                    সর্বনিম্ন
                  </th>
                  <th className="px-3 py-3 text-right font-medium sm:px-4">
                    সর্বোচ্চ
                  </th>
                  <th className="px-3 py-3 text-right font-medium sm:px-4">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => {
                  const min = Number(market.min);
                  const max = Number(market.max);
                  const average = (min + max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className={`border-t border-[#e7ede7] transition hover:bg-green-50/70 ${
                        index % 2 === 1 ? "bg-[#f6f9f6]" : "bg-[#fbfdfb]"
                      }`}
                    >
                      <td className="px-3 py-3 font-medium text-slate-800 sm:px-4">
                        {market.market}
                      </td>

                      <td className="px-3 py-3 text-slate-600 sm:px-4">
                        {market.division}
                      </td>

                      <td className="px-4 py-3 text-right font-medium text-green-700 sm:px-4">
                        {formatPrice(min)} টাকা
                      </td>

                      <td className="px-4 py-3 text-right font-medium text-red-600 sm:px-4">
                        {formatPrice(max)}টাকা
                      </td>

                      <td className="px-4 py-3 text-right font-medium text-slate-700 sm:px-4">
                        {formatPrice(average)}টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500 sm:text-sm">
            মোট {markets.length.toLocaleString("bn-BD")}টি বাজারের দাম দেখানো
            হচ্ছে। সব দাম প্রতি {product.unit} হিসেবে দেওয়া হয়েছে।
          </p>

          <Link
            href={`/category/${product.category}`}
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#07883f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800 sm:text-sm"
          >
            সব {product.categoryNameBn}
          </Link>
        </section>
      </div>
    </main>
  );
}
