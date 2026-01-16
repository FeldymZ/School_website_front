import { useEffect, useState } from "react";
import { fetchPartenaires } from "@/services/partenaireService";
import type { Partenaire } from "@/services/partenaireService";

type Props = {
  anchorLeft: number;
};

export default function MegaMenuPartenariats({ anchorLeft }: Props) {
  const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchPartenaires()
      .then((data) => {
        if (mounted) setPartenaires(data);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      className="
        absolute top-full z-50
        w-[420px]
        bg-white border border-gray-200
        shadow-xl rounded-2xl
        p-5
      "
      style={{ left: anchorLeft }}
    >
      <h4 className="text-xs font-bold uppercase text-center mb-4">
        Partenariats
      </h4>

      {loading ? (
        <p className="text-sm text-gray-500 text-center">
          Chargement...
        </p>
      ) : (
        <ul className="space-y-2">
          {partenaires.map((p) => (
            <li key={p.id}>
              <a
                href={p.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block
                  px-3 py-2
                  rounded-lg
                  border border-gray-200
                  bg-white
                  text-sm font-medium
                  hover:bg-secondary/10
                  transition-all
                "
              >
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
