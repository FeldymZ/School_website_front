import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

import MegaMenu from "../MegaMenu/MegaMenu";
import MegaMenuFormations from "../MegaMenu/MegaMenuFormations";
import MegaMenuPartenariats from "../MegaMenu/MegaMenuPartenariats";

import {
  esiitechMenu,
  vieEtudianteMenu,
} from "@/data/menus";

import type { MegaMenuData } from "@/types/menu";

type MenuKey =
  | "esiitech"
  | "formations"
  | "vie"
  | "partenariats";

/* Largeurs des MegaMenus */
const MENU_WIDTHS: Record<MenuKey, number> = {
  esiitech: 480,
  formations: 560,
  vie: 480,
  partenariats: 420,
};

export default function MainNavbar() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [anchorLeft, setAnchorLeft] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const staticMenus: Record<
    Exclude<MenuKey, "formations" | "partenariats">,
    MegaMenuData
  > = {
    esiitech: esiitechMenu,
    vie: vieEtudianteMenu,
  };

  /* ===== Positionnement MegaMenu (desktop) ===== */
  const openMenu = (key: MenuKey, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const nav = el.closest("nav");
    if (!nav) return;

    const navRect = nav.getBoundingClientRect();
    const menuWidth = MENU_WIDTHS[key];

    const center =
      rect.left - navRect.left + rect.width / 2;

    let left = center - menuWidth / 2;

    const MARGIN = 8;
    left = Math.max(
      MARGIN,
      Math.min(left, navRect.width - menuWidth - MARGIN)
    );

    setAnchorLeft(left);
    setActiveMenu(key);
  };

  return (
    <nav
      className="relative w-full bg-white border-b z-50"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* ================= BARRE HAUTE ================= */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link to="/" onClick={() => setIsMobileOpen(false)}>
          <img src="/logo.png" alt="ESIITECH" className="h-12" />
        </Link>

        {/* ===== MENU DESKTOP ===== */}
        <ul className="hidden lg:flex gap-10 font-semibold">
          {[
            ["esiitech", "ESIITECH"],
            ["formations", "Formations"],
            ["vie", "Vie étudiante"],
            ["partenariats", "Partenariats"],
          ].map(([key, label]) => (
            <li
              key={key}
              onMouseEnter={(e) =>
                openMenu(key as MenuKey, e.currentTarget)
              }
              className="flex items-center gap-1 cursor-pointer"
            >
              {label}
              <ChevronDown size={14} />
            </li>
          ))}

          <li>
            <Link
              to="/contact"
              className="hover:text-secondary transition"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* ===== FOAD DESKTOP ===== */}
        <a
          href="https://foad.esiitech-gabon.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden lg:flex
            items-center gap-2
            border-2 border-secondary
            px-4 py-2
            rounded-md
          "
        >
          <ArrowUpRight size={16} />
          ACCÉDER AU FOAD
        </a>

        {/* ===== BOUTON MENU MOBILE ===== */}
        <button
          className="lg:hidden"
          onClick={() => setIsMobileOpen((v) => !v)}
        >
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ================= MENU MOBILE ================= */}
      {isMobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-xl">
          <ul className="flex flex-col divide-y">
            <MobileLink to="/" onClick={() => setIsMobileOpen(false)}>
              Accueil
            </MobileLink>

            <MobileLink to="/formations" onClick={() => setIsMobileOpen(false)}>
              Formations
            </MobileLink>

            <MobileLink to="/vie-etudiante" onClick={() => setIsMobileOpen(false)}>
              Vie étudiante
            </MobileLink>

            <MobileLink to="/partenariats" onClick={() => setIsMobileOpen(false)}>
              Partenariats
            </MobileLink>

            <MobileLink to="/contact" onClick={() => setIsMobileOpen(false)}>
              Contact
            </MobileLink>

            {/* FOAD MOBILE */}
            <li className="p-4">
              <a
                href="https://foad.esiitech-gabon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-center gap-2
                  bg-secondary text-white
                  px-4 py-3 rounded-lg
                "
              >
                <ArrowUpRight size={18} />
                Accéder au FOAD
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* ================= MEGA MENUS (DESKTOP) ================= */}
      {activeMenu === "formations" && (
        <MegaMenuFormations anchorLeft={anchorLeft} />
      )}

      {activeMenu === "partenariats" && (
        <MegaMenuPartenariats anchorLeft={anchorLeft} />
      )}

      {activeMenu &&
        activeMenu !== "formations" &&
        activeMenu !== "partenariats" && (
          <MegaMenu
            columns={staticMenus[activeMenu]}
            anchorLeft={anchorLeft}
          />
        )}
    </nav>
  );
}

/* ================= COMPOSANT LIEN MOBILE ================= */

function MobileLink({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className="block px-6 py-4 font-semibold text-gray-800 hover:bg-gray-50"
      >
        {children}
      </Link>
    </li>
  );
}
