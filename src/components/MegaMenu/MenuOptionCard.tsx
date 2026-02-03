import { Link } from "react-router-dom";

type Props = {
  label: string;
  formationSlug: string;
};

export default function MenuOptionCard({
  label,
  formationSlug,
}: Props) {
  return (
    <Link
      to={`/formations/${formationSlug}`}
      className="
        block
        w-full
        px-4 py-3
        rounded-xl
        border border-gray-200
        bg-white

        text-sm font-medium text-gray-700

        transition-colors duration-200

        hover:bg-[#EAF7FD]
        hover:text-[#0A2A6A]
        hover:border-[#CFEAF8]
      "
    >
      {label}
    </Link>
  );
}
