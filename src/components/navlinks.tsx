import { LinkType } from "@/type/type";
import Link from "next/link";

const Navlinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: LinkType[] = await res.json();

  return (
    <nav className="sticky top-0 z-40 border-b-amber-50 bg-white">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2">
        {data.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="shrink-0 rounded-[7px] px-[15px] py-[8px] text-[13px] font-semibold transition-colors hover:bg-slate-200"
          >
            {category.icon}
            <span className="ml-1 text-slate-800">{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navlinks;
