import {
  Quote,
  GraduationCap,
  Sparkles,
  Building2,
  Target,
  Users,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";
import NetworkBackground from "@/components/ui/NetworkBackground";

export default function AboutUs() {
  return (
    <section className="relative w-full py-10 overflow-hidden bg-white">
      {/* ================== BACKGROUND ================== */}
      <NetworkBackground />
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

        {/* ================== GRID 70 / 30 ================== */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-stretch">
          {/* ================== GAUCHE (70%) ================== */}
          <div className="lg:col-span-7 space-y-4">
            {/* HEADER */}
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

            {/* CONTAINER */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-6 border border-gray-100">
              <p className="text-gray-700 leading-relaxed">
                L'École Supérieure d'Ingénierie et d'Innovation Technologique en
                abrégé <strong>ESIITECH</strong> est une école supérieure privée
                fondée par l'arrêté{" "}
                <strong>N°0136/MESRSTTENCCF du 10 Septembre 2021</strong>.
                L'ESIITECH a obtenu sa reconnaissance officielle de la part de
                l'État à travers les décrets{" "}
                <strong>071/PR/MESRSIT</strong> et{" "}
                <strong>072/PR/MESRSIT</strong> du{" "}
                <strong>14 Février 2024</strong>.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Nous formons uniquement dans les métiers des Nouvelles
                Technologies de l'Information et de la Communication (NTIC).
                Nous proposons aux jeunes une offre de formation dans des
                domaines tels que la monétique, la cybersécurité, le génie
                logiciel, le big data, etc.
              </p>

              <p className="text-gray-700 leading-relaxed">
                L'ESIITECH a ouvert ses portes à la rentrée universitaire
                2021-2022 et compte à ce jour{" "}
                <strong>3 promotions</strong> et{" "}
                <strong>plus de 100 étudiants</strong> dont{" "}
                <strong>70 % sont des étudiants boursiers de l'État</strong>.
              </p>

              <p className="text-gray-700 leading-relaxed">
                La vision de l'ESIITECH est de former des jeunes dans des métiers
                des NTIC en adéquation d'une part avec les besoins réels du
                marché de l'emploi gabonais, et d'autre part avec les évolutions
                technologiques de l'heure.
              </p>

              <div className="grid gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Target className="text-[#00A4E0] w-5 h-5" />
                  <span className="text-sm font-semibold text-gray-700">
                    Formation orientée marché
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
          </div>

          {/* ================== DROITE (30%) ================== */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            {/* HEADER */}
            <div className="flex items-center gap-3">
              <div className="bg-[#00A4E0]/10 p-2 rounded-lg">
                <Quote size={20} className="text-[#00A4E0]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Mot du DG
                </h3>
                <div className="h-1 w-12 bg-[#00A4E0] rounded-full mt-1" />
              </div>
            </div>

            {/* CONTAINER — s’étire pour matcher la hauteur */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex-1">
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-center mb-6">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src="/images/directrice-zita-moussambi.jpg"
                      alt="Dr Zita Hermance Moussambi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-gray-900">
                    Dr Zita Hermance MOUSSAMBI
                  </h4>
                  <p className="text-[#00A4E0] font-semibold text-sm">
                    Directeur Général de l’ESIITECH
                  </p>
                </div>

                <div className="relative bg-gray-50 rounded-2xl p-6 text-sm text-gray-700 leading-relaxed flex-1">
                  <Quote
                    size={22}
                    className="absolute -top-3 -left-3 text-[#00A4E0]/30"
                  />
                  <p className="font-semibold mb-2">Chers étudiants,</p>
                  <p>
                    Je vous souhaite la bienvenue sur le site de l’École
                    Supérieure d’Ingénierie et d’Innovation Technologique.
                  </p>
                  <p className="mt-3">
                    Si vous souhaitez préparer une Licence ou un Master dans
                    les métiers des NTIC, sachez que vous êtes au bon endroit.
                  </p>

                  {/* CTA */}
                  <div className="mt-4 text-center">
                    <Link
                      to="/mot-du-dg"
                      className="inline-block text-[#00A4E0] font-bold hover:underline"
                    >
                      Lire la suite →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
