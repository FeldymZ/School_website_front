import { Outlet } from "react-router-dom";

/* ================= LAYOUT ================= */
import TopBar from "./components/TopBar/TopBar";
import MainNavbar from "./components/MainNavbar/MainNavbar";
import DidYouKnowBanner from "./components/DidYouKnowBanner/DidYouKnowBanner";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-darkBlue relative">
      {/* HEADER */}
      <TopBar />
      <MainNavbar />

      {/* CONTENU DES PAGES */}
      <main className="relative z-0">
        <Outlet />
      </main>

      {/* BANNIÈRE GLOBALE (PUBLIC) */}
      <DidYouKnowBanner />
    </div>
  );
}
