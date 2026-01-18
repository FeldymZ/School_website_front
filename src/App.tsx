import { Outlet } from "react-router-dom";

/* ================= LAYOUT ================= */
import TopBar from "./components/TopBar/TopBar";
import MainNavbar from "./components/MainNavbar/MainNavbar";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-darkBlue">
      {/* HEADER */}
      <TopBar />
      <MainNavbar />

      {/* CONTENU DES PAGES */}
      <Outlet />
    </div>
  );
}
