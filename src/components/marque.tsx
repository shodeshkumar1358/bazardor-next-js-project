import { Products } from "@/type/type";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
const Marque = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data = await res.json();
  const products = data;
  //   console.log(headlines);

  return (
    <section className="w-full overflow-hidden border-b border-gray-200 bg-white">
      <MarqueeText direction="right" duration={15} pauseOnHover>
        <div className="flex h-9 items-center">
          {products.map((product: Products) => {
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";

            return (
              <div
                key={product.id}
                className="flex shrink-0 items-center border-r border-gray-200 px-6"
              >
                <div className="flex items-center gap-2 whitespace-nowrap">
                  {/* Product Icon */}
                  <span className="text-base">{product.image}</span>

                  {/* Product Name */}
                  <span className="text-sm font-medium text-gray-700">
                    {product.nameBn}
                  </span>

                  {/* Price */}
                  <span className="text-sm text-gray-500">
                    {product.today.toLocaleString("bn-BD")} টাকা/
                    {product.unit === "kg"
                      ? "কেজি"
                      : product.unit === "dozen"
                        ? "ডজন"
                        : product.unit === "piece"
                          ? "পিস"
                          : "লিটার"}
                  </span>

                  {/* Change */}
                  <span
                    className={`flex items-center gap-0.5 text-xs font-semibold ${
                      isUp
                        ? "text-red-500"
                        : isDown
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {isUp && <BiSolidUpArrow size={13} />}
                    {isDown && <BiSolidDownArrow size={13} />}
                    {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </section>
  );
};

export default Marque;
