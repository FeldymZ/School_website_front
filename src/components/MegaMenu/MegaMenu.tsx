import type { MegaMenuData } from "@/types/menu";
import { Link } from "react-router-dom";

type Props = {
  columns: MegaMenuData;
  anchorLeft: number;
};

export default function MegaMenu({
  columns,
  anchorLeft,
}: Props) {
  return (
    <div
      className="
        absolute top-full z-50
        w-[480px]
        bg-white border border-gray-200
        shadow-xl rounded-2xl
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
                    px-3 py-2
                    rounded-lg
                    border border-gray-200
                    text-sm font-medium
                    hover:bg-secondary/10
                    transition-all
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
