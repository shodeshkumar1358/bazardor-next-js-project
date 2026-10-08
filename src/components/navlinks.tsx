import { LinkType } from "@/type/type";
import Link from "next/link";

const Navlinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  const data = await res.json();
  //   console.log(data);

  return (
    <div className="flex gap-2 justify-start py-2 max-w-6xl mx-auto">
      {data.map((n: LinkType, i: number) => (
        <Link className="" href={n.slug} key={i}>
          <div className="rounded-[7px] px-[15px] py-[8px] text-[13px] font-semibold  transition-colors hover:bg-slate-300">
            {n.icon}
            <span className="ml-1 text-slate-800">{n.nameBn}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Navlinks;
