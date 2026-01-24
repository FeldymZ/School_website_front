import { useEffect, useState } from "react";
import { fetchFormationsByLevel } from "@/services/formationService";
import type { Formation } from "@/types/formation";
import MenuOptionCard from "./MenuOptionCard";

type Props = {
  anchorLeft: number;
};

/* ================= TYPE LOCAL POUR LE MENU ================= */

type MenuFormation = Pick<Formation, "id" | "title">;

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
      const cleaned: MenuFormation[] = data.map((f) => ({
        id: f.id,
        title: f.title,
      }));
      setLicences(cleaned);
    });

    fetchFormationsByLevel("MASTER").then((data) => {
      const cleaned: MenuFormation[] = data.map((f) => ({
        id: f.id,
        title: f.title,
      }));
      setMasters(cleaned);
    });
  }, []);

  return (
    <div
      className="
        absolute top-full z-50
        w-[560px]
        bg-white border border-gray-200
        shadow-xl rounded-2xl
        p-5
        max-h-[70vh]
        overflow-y-auto
      "
      style={{ left: anchorLeft }}
    >
      {/* ================= LICENCES ================= */}
      <section className="mb-6">
        <h4 className="text-xs font-bold uppercase text-center mb-3 sticky top-0 bg-white py-2 z-10">
          Licences informatiques
        </h4>

        <div className="grid grid-cols-2 gap-2 pr-1">
          {licences.map((f) => (
            <MenuOptionCard
              key={f.id}
              formationId={f.id}
              label={cleanFormationTitle(f.title)}
            />
          ))}
        </div>
      </section>

      {/* ================= MASTERS ================= */}
      <section>
        <h4 className="text-xs font-bold uppercase text-center mb-3 sticky top-0 bg-white py-2 z-10">
          Masters professionnels
        </h4>

        <div className="grid grid-cols-2 gap-2 pr-1">
          {masters.map((f) => (
            <MenuOptionCard
              key={f.id}
              formationId={f.id}
              label={cleanFormationTitle(f.title)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
