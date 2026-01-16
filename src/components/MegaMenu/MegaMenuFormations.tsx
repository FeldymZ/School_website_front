import { useEffect, useState } from "react";
import { fetchFormationsByLevel } from "@/services/formationService";
import type { Formation } from "@/types/formation";
import MenuOptionCard from "./MenuOptionCard";

type Props = {
  anchorLeft: number;
};

function cleanFormationTitle(title: string) {
  return title
    .replace(/^Master\s+/i, "")
    .replace(/^Licence\s+/i, "");
}

export default function MegaMenuFormations({ anchorLeft }: Props) {
  const [licences, setLicences] = useState<Formation[]>([]);
  const [masters, setMasters] = useState<Formation[]>([]);

  useEffect(() => {
    fetchFormationsByLevel("LICENCE").then(setLicences);
    fetchFormationsByLevel("MASTER").then(setMasters);
  }, []);

  return (
    <div
      className="
        absolute top-full z-50
        w-[560px]
        bg-white border border-gray-200
        shadow-xl rounded-2xl
        p-5
      "
      style={{ left: anchorLeft }}
    >
      {/* LICENCES */}
      <section className="mb-5">
        <h4 className="text-xs font-bold uppercase text-center mb-3">
          Licences informatiques
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {licences.map((f) => (
            <MenuOptionCard
              key={f.id}
              formationId={f.id}
              label={cleanFormationTitle(f.title)}
            />
          ))}
        </div>
      </section>

      {/* MASTERS */}
      <section>
        <h4 className="text-xs font-bold uppercase text-center mb-3">
          Masters professionnels
        </h4>

        <div className="grid grid-cols-2 gap-2">
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
