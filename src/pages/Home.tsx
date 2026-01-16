import { Banner } from "@/components/Banner";
import Formations from "@/components/Formations/Formations";
import KeyFigures from "@/components/KeyFigures/KeyFigures";
import Testimonials from "@/components/Testimonials/Testimonials";
import ActualitesList from "@/components/Actualites/ActualitesList";
import Agenda from "@/components/Agenda/Agenda";
import LocationSection from "@/components/Location/LocationSection";
import ContactSection from "@/components/Contact/ContactSection";
import Footer from "@/components/Footer/Footer";
export default function Home() {
  return (
    <>
      {/* HERO */}
      <Banner />

      {/* FORMATIONS */}
      <Formations />

      {/* CHIFFRES CLÉS */}
      <KeyFigures />

      {/* TÉMOIGNAGES */}


      {/* ================= ACTUALITÉS + AGENDA ================= */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* ACTUALITÉS (2/3) */}
            <div className="lg:col-span-2">
              <ActualitesList />
            </div>

            {/* AGENDA (1/3) */}
            <div className="lg:col-span-1">
              <Agenda />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <LocationSection />
      <ContactSection />
      <Footer/>


    </>
  );
}
