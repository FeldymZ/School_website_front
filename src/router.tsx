import { createBrowserRouter } from "react-router-dom";
import App from "./App";

/* ================= PAGES ================= */
import Home from "@/pages/Home";
import FormationsList from "@/pages/FormationsList";
import FormationDetailsPage from "@/pages/FormationDetails";
import ActualitesPage from "@/pages/Actualites";
import ActualiteDetailsPage from "@/pages/ActualiteDetails";
import MotDuDG from "@/pages/MotDuDG";

/* ================= ACTIVITÉS ================= */
import ActivitesPublicList from "@/pages/public/ActivitesPublicList";
import ActivitePublicDetail from "@/pages/public/ActivitePublicDetail";

import NosDéfisPage from "./pages/nosDefis/NosDéfisPage";
import NosMissionsPage from "./pages/apropos/NosMissionsPage";
import CiscoNetworkingAcademyPage from "./pages/Cisco/CiscoNetworkingAcademyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /* ================= HOME ================= */
      { index: true, element: <Home /> },

      /* ================= À PROPOS ================= */
      {
        path: "nos-missions",
        element: <NosMissionsPage />, // ✅ NOUVELLE ROUTE
      },

      {
        path: "nos-defis",
        element: <NosDéfisPage />, // ✅ NOUVELLE ROUTE
      },

      /* ================= FORMATIONS ================= */
      {
        path: "formations",
        element: <FormationsList />,
      },
      {
        path: "formations/:slug",
        element: <FormationDetailsPage />,
      },
      {
        path: "formationsList",
        element: <FormationsList />,
      },

      {
        path:"Cisco-Networking-Academy",
        element: <CiscoNetworkingAcademyPage />,
      }
       ,

      /* ================= ACTUALITÉS ================= */
      {
        path: "actualites",
        element: <ActualitesPage />,
      },
      {
        path: "actualites/:param",
        element: <ActualiteDetailsPage />,
      },

      /* ================= ACTIVITÉS ================= */
      {
        path: "activites",
        element: <ActivitesPublicList />,
      },
      {
        path: "activites/:slug",
        element: <ActivitePublicDetail />,
      },

      /* ================= CONTACT ================= */
      {
        path: "contact",
        element: (
          <div className="max-w-7xl mx-auto px-6 py-32">
            <h1 className="text-3xl font-bold">Contact</h1>
            <p className="mt-4 text-gray-600">
              Cette section sera disponible prochainement.
            </p>
          </div>
        ),
      },

      /* ================= MOT DU DG ================= */
      {
        path: "mot-du-dg",
        element: <MotDuDG />,
      },
    ],
  },
]);
