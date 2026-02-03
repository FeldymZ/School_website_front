import { useEffect, useState } from "react";
import { fetchFormationsByLevel } from "@/services/formationService";
import type { Formation } from "@/types/formation";
import MenuOptionCard from "./MenuOptionCard";

type Props = {
  anchorLeft: number;
};

/* ================= TYPE LOCAL POUR LE MENU ================= */

type MenuFormation = Pick<Formation, "slug" | "title">;

/* ================= UTIL ================= */

function cleanFormationTitle(title: string) {
  return title
    .replace(/^Master\s+/i, "")
    .replace(/^Licence\s+/i, "");
}

/* ========================================================= */
/* ==================== COMPONENT ========================== */
/* ========================================================= */

export default function MegaMenuFormations({ anchorLeft }: Props) {
  const [licences, setLicences] = useState<MenuFormation[]>([]);
  const [masters, setMasters] = useState<MenuFormation[]>([]);

  useEffect(() => {
    fetchFormationsByLevel("LICENCE").then((data) => {
      setLicences(
        data.map((f) => ({
          slug: f.slug,
          title: f.title,
        }))
      );
    });

    fetchFormationsByLevel("MASTER").then((data) => {
      setMasters(
        data.map((f) => ({
          slug: f.slug,
          title: f.title,
        }))
      );
    });
  }, []);

  return (
    <div
      className="
        absolute top-full z-50
        w-[560px]
        bg-white
        border border-gray-200
        shadow-xl
        rounded-2xl
        p-5
        max-h-[70vh]
        overflow-y-auto
      "
      style={{ left: anchorLeft }}
    >
      {/* ================= LICENCES ================= */}
      <section className="mb-6">
        <h4 className="
          text-xs font-bold uppercase text-center mb-3
          sticky top-0 bg-white py-2 z-10
        ">
          Licences informatiques
        </h4>

        <div className="grid grid-cols-1 gap-1 pr-1">
          {licences.map((f) => (
            <div
              key={f.slug}
              className="
                rounded-xl transition-colors duration-200
                hover:bg-[#EAF7FD] hover:text-[#0A2A6A]
              "
            >
              <MenuOptionCard
                formationSlug={f.slug}
                label={cleanFormationTitle(f.title)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ================= MASTERS ================= */}
      <section>
        <h4 className="
          text-xs font-bold uppercase text-center mb-3
          sticky top-0 bg-white py-2 z-10
        ">
          Masters professionnels
        </h4>

        <div className="grid grid-cols-1 gap-1 pr-1">
          {masters.map((f) => (
            <div
              key={f.slug}
              className="
                rounded-xl transition-colors duration-200
                hover:bg-[#EAF7FD] hover:text-[#0A2A6A]
              "
            >
              <MenuOptionCard
                formationSlug={f.slug}
                label={cleanFormationTitle(f.title)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
