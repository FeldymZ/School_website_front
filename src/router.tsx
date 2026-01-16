import { createBrowserRouter } from "react-router-dom";
import App from "./App";

/* ===== PAGES ===== */
import Home from "@/pages/Home";
import FormationDetailsPage from "@/pages/FormationDetails";
import ActualitesPage from "@/pages/Actualites";
import ActualiteDetailsPage from "@/pages/ActualiteDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout global : Topbar + Navbar + Outlet
    children: [
      /* ================= ACCUEIL ================= */
      {
        index: true,
        element: <Home />,
      },

      /* ================= FORMATIONS ================= */

      // (optionnel) page liste formations
      {
        path: "formations",
        element: <></>, // ou <Formations />
      },

      // ✅ DÉTAIL FORMATION (route canonique)
      {
        path: "formations/:id",
        element: <FormationDetailsPage />,
      },

      /* ================= ACTUALITÉS ================= */

      // ✅ LISTE DES ACTUALITÉS
      {
        path: "actualites",
        element: <ActualitesPage />,
      },

      // ✅ DÉTAIL ACTUALITÉ
      {
        path: "actualites/:id",
        element: <ActualiteDetailsPage />,
      },

      /* ================= AUTRES (À VENIR) ================= */

      // Contact (sera implémenté plus tard)
      {
        path: "contact",
        element: <></>,
      },
    ],
  },
]);
