import type { MegaMenuData } from "@/types/menu";
import { Link } from "react-router-dom";

type Props = {
  columns: MegaMenuData;
  anchorLeft: number;
};

export default function MegaMenu({ columns, anchorLeft }: Props) {
  return (
    <div
      className="
        absolute top-full z-50
        w-[480px]
        bg-white
        border border-gray-200
        shadow-xl
        rounded-2xl
        p-5
      "
      style={{ left: anchorLeft }}
    >
      {columns.map((col, i) => (
        <section key={i} className="mb-4 last:mb-0">
          <h4 className="text-xs font-bold uppercase text-center mb-3">
            {col.title}
          </h4>

          <ul className="space-y-2">
            {col.items.map((item, j) => (
              <li key={j}>
                <Link
                  to={item.path}
                  className="
                    block
                    px-4 py-2.5
                    rounded-xl
                    border border-transparent
                    text-sm font-medium
                    text-gray-800
                    transition-colors duration-200
                    hover:bg-[#EAF7FD]
                    hover:text-[#0A2A6A]
                  "
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
