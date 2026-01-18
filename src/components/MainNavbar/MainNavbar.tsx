import { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  const staticMenus: Record<
    Exclude<MenuKey, "formations" | "partenariats">,
    MegaMenuData
  > = {
    esiitech: esiitechMenu,
    vie: vieEtudianteMenu,
  };

  /* ================================================= */
  /* ================= SCROLL ======================== */
  /* ================================================= */

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className={`
        sticky z-50 w-full
        bg-white border-b border-gray-100
        shadow-sm transition-all duration-300
        ${isScrolled ? "top-0" : "top-12"}
      `}
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* ================= BAR ================= */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link to="/" onClick={() => setIsMobileOpen(false)}>
          <img
            src="/logo.png"
            alt="ESIITECH"
            className="h-12 transition-transform hover:scale-105"
          />
        </Link>

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
              <span
                className="
                  absolute -bottom-2 left-0
                  h-[2px] w-0 bg-secondary
                  transition-all duration-300
                  group-hover:w-full
                "
              />
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
      {isMobileOpen && !isScrolled && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t">
          <ul className="flex flex-col divide-y font-semibold">
            <MobileLink to="/" label="Accueil" onClick={() => setIsMobileOpen(false)} />
            <MobileLink to="/formationsList" label="Formations" onClick={() => setIsMobileOpen(false)} />
            <MobileLink to="/vie-etudiante" label="Vie étudiante" onClick={() => setIsMobileOpen(false)} />
            <MobileLink to="/partenariats" label="Partenariats" onClick={() => setIsMobileOpen(false)} />
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

      {/* ================= MEGA MENUS ================= */}
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

/* ================= MOBILE LINK ================= */

function MobileLink({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className="block px-6 py-4 hover:bg-gray-50 hover:text-secondary transition"
      >
        {label}
      </Link>
    </li>
  );
}
