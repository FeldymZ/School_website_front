import { Link } from "react-router-dom";

type Props = {
  label: string;
  formationId: number;
};

export default function MenuOptionCard({
  label,
  formationId,
}: Props) {
  return (
    <Link
      to={`/formations/${formationId}`}
      className="
        relative group
        block
        px-3 py-2
        min-w-[160px]
        rounded-lg
        border border-gray-200
        bg-white
        overflow-hidden
        transition-all duration-300
        hover:border-blue-400
        hover:shadow-sm
      "
    >
      {/* BARRE BLEUE ANIMÉE */}
      <span
        className="
          absolute inset-y-0 left-0
          w-1 bg-blue-500
          scale-y-0
          group-hover:scale-y-100
          origin-top
          transition-transform duration-300
        "
      />

      {/* TEXTE */}
      <span className="
        relative z-10
        text-xs font-medium text-gray-700
        group-hover:text-blue-700
        transition-colors duration-300
      ">
        {label}
      </span>
    </Link>
  );
}
