import { Routes, Route } from "react-router-dom";

/* ================= LAYOUT ================= */
import TopBar from "./components/TopBar/TopBar";
import MainNavbar from "./components/MainNavbar/MainNavbar";

/* ================= PAGES ================= */
import Home from "@/pages/Home";
import FormationDetails from "./pages/FormationDetails";
import ActualitesPage from "./pages/Actualites";
import ActualiteDetailsPage from "./pages/ActualiteDetails";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-darkBlue">
      <TopBar />
      <MainNavbar />

      <Routes>
        {/* ACCUEIL */}
        <Route path="/" element={<Home />} />

        {/* FORMATIONS */}
        <Route path="/formations/:id" element={<FormationDetails />} />

        {/* ACTUALITÉS */}
        <Route path="/actualites" element={<ActualitesPage />} />
        <Route path="/actualites/:id" element={<ActualiteDetailsPage />} />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={
            <div className="max-w-7xl mx-auto px-6 py-32">
              <h1 className="text-3xl font-bold">Contact</h1>
              <p className="mt-4 text-gray-600">
                Cette section sera disponible prochainement.
              </p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
