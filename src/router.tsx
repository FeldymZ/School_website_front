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

/* ================= FORMATIONS CONTINUES ================= */
import FormationsContinuesList from "@/pages/public/FormationsContinuesList";
import FormationContinueDetail from "@/pages/public/FormationContinueDetail";

/* ================= AUTRES ================= */
import NosDéfisPage from "./pages/nosDefis/NosDéfisPage";
import NosMissionsPage from "./pages/apropos/NosMissionsPage";
import CiscoNetworkingAcademyPage from "./pages/Cisco/CiscoNetworkingAcademyPage";
import PanierPage from "@/pages/PanierPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      { index: true, element: <Home /> },

      { path: "nos-missions", element: <NosMissionsPage /> },
      { path: "nos-defis", element: <NosDéfisPage /> },

      /* FORMATIONS */
      { path: "formations", element: <FormationsList /> },
      { path: "formations/:slug", element: <FormationDetailsPage /> },

      { path: "Cisco-Networking-Academy", element: <CiscoNetworkingAcademyPage /> },

      /* FORMATIONS CONTINUES */
      { path: "formations-continues", element: <FormationsContinuesList /> },
      { path: "formations-continues/:slug", element: <FormationContinueDetail /> },

      /* ACTUALITÉS */
      { path: "actualites", element: <ActualitesPage /> },
      { path: "actualites/:param", element: <ActualiteDetailsPage /> },

      /* ACTIVITÉS */
      { path: "activites", element: <ActivitesPublicList /> },
      { path: "activites/:slug", element: <ActivitePublicDetail /> },

      /* CONTACT */
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

      { path: "mot-du-dg", element: <MotDuDG /> },

      /* PANIER */
      { path: "panier", element: <PanierPage /> },

      /* 404 */
      {
        path: "*",
        element: (
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">Page introuvable</h1>
          </div>
        ),
      },

    ],
  },
]);