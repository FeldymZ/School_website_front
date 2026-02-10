import type { MegaMenuData } from "@/types/menu";

/* ================= ESIITECH ================= */
export const esiitechMenu: MegaMenuData = [
  {
    title: "L'ÉCOLE",
    items: [
      { label: "NOS DEFIS", path: "/nos-defis" },
      { label: "NOS MISSIONS", path: "/nos-missions" },
      { label: "MOT DU DG", path: "/mot-du-dg" },
      { label: "CISCO NETWORKING ACADEMY", path: "/Cisco-Networking-Academy" },
    ],
  },
];

/* ================= VIE ÉTUDIANTE ================= */
export const vieEtudianteMenu: MegaMenuData = [
  {
    title: "VIE ÉTUDIANTE",
    items: [
      {
        label: "ACTIVITES DE L'ECOLE",
        path: "/activites",
      },
      {
        label: "LA MUTUELLE DES ETUDIANTS",
        path: "https://mutuelle.esiitech-gabon.com/", // ✅ LIEN EXTERNE
      },
    ],
  },
];
