import {
  Quote,
  GraduationCap,
  Sparkles,
  Building2,
  Target,
  Users,
  Lightbulb,
} from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";

export default function AboutUs() {
  return (
    <section className="relative w-full py-10 overflow-hidden bg-white">

      {/* ================== BACKGROUND ANIMÉ ================== */}
      <NetworkBackground />

      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-white/85" />

      {/* ================== CONTENU ================== */}
      <div className="relative max-w-7xl mx-auto px-6">

        {/* ================== TITRE PRINCIPAL ================== */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3">
            <GraduationCap className="text-[#00A4E0] w-7 h-7" />

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              À propos <span className="text-[#00A4E0]">de nous</span>
            </h2>

            <Sparkles className="text-[#00A4E0] w-6 h-6" />
          </div>

          <div className="mt-4 flex justify-center">
            <span className="block h-[3px] w-32 bg-[#00A4E0] rounded-full" />
          </div>
        </div>

        {/* ================== CONTENU ================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ===== PRESENTATION ECOLE ===== */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-6 border border-gray-100">

            <div className="flex items-center gap-4">
              <div className="bg-[#00A4E0]/10 p-3 rounded-xl">
                <Building2 size={28} className="text-[#00A4E0]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Qui sommes-nous ?
                </h3>
                <div className="h-1 w-16 bg-[#00A4E0] rounded-full mt-2" />
              </div>
            </div>

            <p className="text-gray-700 text-base leading-relaxed">
              L’
              <strong className="text-gray-900">
                École Supérieure d’Ingénierie et d’Innovation Technologique
                (ESIITECH)
              </strong>{" "}
              est une institution d’enseignement supérieur privée reconnue par
              l’État gabonais.
            </p>

            <p className="text-gray-700 text-base leading-relaxed">
              À travers des formations de haut niveau, l’ESIITECH contribue au
              développement du numérique au Gabon et en Afrique.
            </p>

            <div className="grid gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Target className="text-[#00A4E0] w-5 h-5" />
                <span className="text-sm font-semibold text-gray-700">
                  Formation d’excellence
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Lightbulb className="text-[#00A4E0] w-5 h-5" />
                <span className="text-sm font-semibold text-gray-700">
                  Innovation technologique
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Users className="text-[#00A4E0] w-5 h-5" />
                <span className="text-sm font-semibold text-gray-700">
                  Accompagnement personnalisé
                </span>
              </div>
            </div>
          </div>

          {/* ===== MOT DE LA DIRECTRICE ===== */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-[#00A4E0] py-3 text-center">
              <p className="text-white font-bold flex items-center justify-center gap-2">
                <Quote size={18} />
                Mot de la Directrice
              </p>
            </div>

            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src="/images/directrice-zita-moussambi.jpg"
                    alt="Dr Zita Hermance Moussambi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Dr Zita Hermance MOUSSAMBI
                </h3>
                <p className="text-[#00A4E0] font-semibold text-sm">
                  Directeur Général de l’ESIITECH
                </p>
              </div>

              <div className="relative bg-gray-50 rounded-2xl p-6 text-sm text-gray-700 leading-relaxed">
                <Quote
                  size={22}
                  className="absolute -top-3 -left-3 text-[#00A4E0]/30"
                />
                <p className="font-semibold text-gray-900 mb-2">
                  Chers étudiants,
                </p>
                <p>
                  Notre mission est de former les talents numériques dont le
                  Gabon et l’Afrique ont besoin.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
