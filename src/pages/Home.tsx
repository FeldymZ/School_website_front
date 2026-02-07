import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Banner } from "@/components/Banner";
import Formations from "@/components/Formations/Formations";
import KeyFigures from "@/components/KeyFigures/KeyFigures";
import Testimonials from "@/components/Testimonials/Testimonials";
import ActualitesList from "@/components/Actualites/ActualitesList";
import Agenda from "@/components/Agenda/Agenda";
import LocationSection from "@/components/Location/LocationSection";
import ContactSection from "@/components/Contact/ContactSection";
import Footer from "@/components/Footer/Footer";
import AboutUs from "@/components/AboutUs/AboutUs";
import PartnersSection from "@/components/Partenaires/Partenaires";

export default function Home() {
  const location = useLocation();

  /* ================= SCROLL CONTROLE ================= */
  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const targetId = params.get("scroll");

  if (!targetId) return;

  let attempts = 0;
  const MAX_ATTEMPTS = 20;

  const tryScroll = () => {
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return;
    }

    attempts++;
    if (attempts < MAX_ATTEMPTS) {
      setTimeout(tryScroll, 100);
    }
  };

  tryScroll();
}, [location.search]);


  return (
    <>
      {/* HERO */}
      <Banner />

      {/* QUI SOMMES-NOUS */}
      <AboutUs />

      {/* FORMATIONS */}
      <Formations />

      {/* CHIFFRES CLÉS */}
      <KeyFigures />

      {/* ================= ACTUALITÉS & AGENDA ================= */}
      <section
        id="actualites-agenda"
        className="relative w-full py-20 bg-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-white" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00a8e8]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Actualités & Agenda
              </h2>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00a8e8]" />
            </div>

            <div className="h-[2px] w-40 bg-[#00a8e8] mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <ActualitesList />
            </div>

            <div className="lg:col-span-1">
              <Agenda />
            </div>
          </div>
        </div>
      </section>

      <PartnersSection />
      <Testimonials />
      <LocationSection />
      <ContactSection />
      <Footer />
    </>
  );
}
