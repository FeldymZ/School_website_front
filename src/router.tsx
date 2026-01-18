import { createBrowserRouter } from "react-router-dom";
import App from "./App";

/* ================= PAGES ================= */
import Home from "@/pages/Home";
import FormationDetailsPage from "@/pages/FormationDetails";
import ActualitesPage from "@/pages/Actualites";
import ActualiteDetailsPage from "@/pages/ActualiteDetails";
import FormationsList from "@/pages/FormationsList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /* ================= ACCUEIL ================= */
      {
        index: true,
        element: <Home />,
      },

      /* ================= FORMATIONS ================= */
      {
        path: "formationsList", // ✅ ICI
        element: <FormationsList />,
      },
      {
        path: "formations/:id",
        element: <FormationDetailsPage />,
      },

      /* ================= ACTUALITÉS ================= */
      {
        path: "actualites",
        element: <ActualitesPage />,
      },
      {
        path: "actualites/:id",
        element: <ActualiteDetailsPage />,
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
    ],
  },
]);
