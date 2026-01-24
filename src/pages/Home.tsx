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
  return (
    <>
      {/* HERO */}
      <Banner />

      {/* Qui sommes nous */}
      <AboutUs />

      {/* FORMATIONS */}
      <Formations />

      {/* CHIFFRES CLÉS */}
      <KeyFigures />

      {/* ================= ACTUALITÉS + AGENDA ================= */}
      <section className="w-full bg-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-6">

    {/* ================= TITRE COMMUN ================= */}
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

    {/* ================= CONTENU ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

      {/* ===== ACTUALITÉS (70%) ===== */}
      <div className="lg:col-span-2">
        <ActualitesList />
      </div>

      {/* ===== AGENDA (30%) ===== */}
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
