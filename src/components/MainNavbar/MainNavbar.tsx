import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

/* ================= TYPES ================= */

type MenuKey =
  | "esiitech"
  | "formations"
  | "vie"
  | "partenariats";

/* ================= CONSTANTES ================= */

const MENU_WIDTHS: Record<MenuKey, number> = {
  esiitech: 480,
  formations: 560,
  vie: 480,
  partenariats: 420,
};

/* ================= COMPONENT ================= */

export default function MainNavbar() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [anchorLeft, setAnchorLeft] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const location = useLocation();

  const staticMenus: Record<
    Exclude<MenuKey, "formations" | "partenariats">,
    MegaMenuData
  > = {
    esiitech: esiitechMenu,
    vie: vieEtudianteMenu,
  };

  /* ================================================= */
  /* ================= ACCUEIL ====================== */
  /* ================================================= */

  const goToHomeTop = () => {
    setIsMobileOpen(false);

    if (location.pathname !== "/") {
      window.location.href = "/";
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ================================================= */
  /* ================= CONTACT ====================== */
  /* ================================================= */

  const scrollToContact = () => {
    setIsMobileOpen(false);

    if (location.pathname !== "/") {
      window.location.href = "/#contact";
      return;
    }

    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  /* ================================================= */
  /* =============== PARTENAIRES ===================== */
  /* ================================================= */

  const scrollToPartenariats = () => {
    setIsMobileOpen(false);

    if (location.pathname !== "/") {
      window.location.href = "/#partenaires";
      return;
    }

    document.getElementById("partenaires")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  /* ================================================= */
  /* ============= POSITION MEGA MENU =============== */
  /* ================================================= */

  const openMenu = (key: MenuKey, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const nav = el.closest("nav");
    if (!nav) return;

    const navRect = nav.getBoundingClientRect();
    const menuWidth = MENU_WIDTHS[key];

    const center = rect.left - navRect.left + rect.width / 2;
    let left = center - menuWidth / 2;

    const MARGIN = 12;
    left = Math.max(
      MARGIN,
      Math.min(left, navRect.width - menuWidth - MARGIN)
    );

    setAnchorLeft(left);
    setActiveMenu(key);
  };

  return (
    <nav
      className="
        sticky top-0 z-50 w-full
        bg-white border-b border-gray-100
        shadow-sm
      "
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* ================= BAR ================= */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <button onClick={goToHomeTop}>
          <img
            src="/logo.png"
            alt="ESIITECH"
            className="h-12 transition-transform hover:scale-105"
          />
        </button>

        {/* ================= DESKTOP MENU ================= */}
        <ul className="hidden lg:flex items-center gap-10 font-semibold text-gray-800">
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
              className="group relative flex items-center gap-1 cursor-pointer"
            >
              <span className="group-hover:text-secondary transition">
                {label}
              </span>
              <ChevronDown size={14} />
            </li>
          ))}

          <li>
            <button
              onClick={scrollToContact}
              className="hover:text-secondary transition"
            >
              Contact
            </button>
          </li>
        </ul>

        {/* ================= FOAD ================= */}
        <a
          href="https://foad.esiitech-gabon.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden lg:flex items-center gap-2
            px-5 py-2.5 rounded-xl
            font-bold
            text-secondary
            border-2 border-secondary
            hover:bg-secondary hover:text-white
            transition-all duration-300
          "
        >
          <ArrowUpRight size={16} />
          Accéder au FOAD
        </a>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setIsMobileOpen((v) => !v)}
        >
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t">
          <ul className="flex flex-col divide-y font-semibold">
            {/* ✅ ACCUEIL → HAUT DU HOME */}
            <li>
              <button
                onClick={goToHomeTop}
                className="w-full text-left px-6 py-4 hover:bg-gray-50 hover:text-secondary transition"
              >
                Accueil
              </button>
            </li>

            <li>
              <Link
                to="/formationsList"
                onClick={() => setIsMobileOpen(false)}
                className="block px-6 py-4 hover:bg-gray-50 hover:text-secondary transition"
              >
                Formations
              </Link>
            </li>

            <li>
              <Link
                to="/vie-etudiante"
                onClick={() => setIsMobileOpen(false)}
                className="block px-6 py-4 hover:bg-gray-50 hover:text-secondary transition"
              >
                Vie étudiante
              </Link>
            </li>

            <li>
              <button
                onClick={scrollToPartenariats}
                className="w-full text-left px-6 py-4 hover:bg-gray-50 hover:text-secondary transition"
              >
                Partenariats
              </button>
            </li>

            <li>
              <button
                onClick={scrollToContact}
                className="w-full text-left px-6 py-4 hover:bg-gray-50 hover:text-secondary transition"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* ================= MEGA MENUS DESKTOP ================= */}
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
