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
        block
        px-3 py-2
        min-w-[160px]
        rounded-lg
        border border-gray-200
        bg-white
        hover:bg-blue-50
        hover:border-blue-300
        hover:shadow-sm
        transition-all
        duration-200
        group
        text-center
        flex-shrink-0
      "
    >
      <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 leading-tight">
        {label}
      </span>
    </Link>
  );
}
