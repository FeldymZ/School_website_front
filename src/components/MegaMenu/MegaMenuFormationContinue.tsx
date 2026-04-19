import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight } from "lucide-react";

type Props = {
  anchorLeft: number;
};

export default function MegaMenuFormationContinue({ anchorLeft }: Props) {

  return (
    <div
      className="absolute top-full z-50 w-[380px] bg-white border border-gray-100
                 shadow-2xl rounded-2xl p-5 overflow-hidden"
      style={{ left: anchorLeft }}
    >
      {/* Déco gradient */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#00A4E0]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

     

      {/* Liens */}
      <div className="flex flex-col gap-1 pr-1 relative">
        <Link
          to="/formations-continues"
          className="group flex items-center justify-between px-4 py-3 rounded-xl
                     text-sm font-semibold text-[#0A2A6A] bg-white
                     hover:bg-[#EAF7FD]
                     transition-all duration-300"
        >
          <span>CATALOGUE DES FORMATIONS CONTINUES</span>
          <ArrowRight
            size={15}
            className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
          />
        </Link>
      </div>
    </div>
  );
}