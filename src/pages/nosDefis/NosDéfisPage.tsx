/* eslint-disable react-refresh/only-export-components */

import {
  Target,
  TrendingUp,
  Users,
  Briefcase,
  Lightbulb,
  Award,
  Sparkles,
} from "lucide-react";

/* ================================================= */
/* ================== DATA ========================= */
/* ================================================= */

const defis = [
  {
    id: 1,
    icon: Award,
    title: "Former des experts dans les NTIC",
    description:
      "Développer l'expertise technique de nos étudiants pour répondre aux besoins du marché des nouvelles technologies de l'information et de la communication.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Encourager l'auto-emploi de nos diplômés",
    description:
      "Favoriser l'entrepreneuriat et l'autonomie professionnelle en dotant nos diplômés des compétences nécessaires pour créer leurs propres entreprises.",
    color: "from-[#00A4E0] to-[#0077A8]",
  },
  {
    id: 3,
    icon: Briefcase,
    title: "Offrir des stages à nos étudiants",
    description:
      "Faciliter l'insertion professionnelle par des stages en entreprise permettant d'acquérir une expérience concrète du monde du travail.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    icon: Users,
    title: "Développer un réseau d'entreprises partenaires",
    description:
      "Créer des partenariats stratégiques avec les entreprises locales et internationales pour offrir des opportunités à nos étudiants.",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 5,
    icon: Target,
    title:
      "Accompagner les entreprises dans le renforcement des capacités du personnel",
    description:
      "Proposer des formations continues et sur mesure pour améliorer les compétences des équipes en entreprise.",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 6,
    icon: Lightbulb,
    title:
      "Encourager l'innovation et la créativité de nos étudiants à travers des projets innovants",
    description:
      "Stimuler la recherche et le développement en accompagnant nos étudiants dans la réalisation de projets novateurs et disruptifs.",
    color: "from-amber-500 to-yellow-600",
  },
];

/* ================================================= */
/* ================= PAGE ========================== */
/* ================================================= */

export default function NosDéfisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00A4E0] to-[#0077A8] py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl">
            Nos Défis
          </h1>

          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Des objectifs ambitieux pour former l'excellence et contribuer au
            développement économique et technologique du Gabon
          </p>

          <div className="flex items-center justify-center gap-2 mt-8">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="text-white/80 text-sm font-medium">
              6 défis majeurs pour l'avenir
            </span>
          </div>
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defis.map((defi, index) => (
            <DefiCard key={defi.id} defi={defi} index={index} />
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-3xl p-12 text-center shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Rejoignez-nous dans cette aventure
            </h2>

            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Ensemble, relevons ces défis pour bâtir un avenir technologique
              prospère
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/formationsList"
                className="px-8 py-4 bg-white rounded-xl font-bold text-[#00A4E0] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
              >
                Découvrir nos formations
              </a>

              <a
                href="/?scroll=contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white rounded-xl font-bold text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================================================= */
/* ================= CARD ========================== */
/* ================================================= */

interface DefiCardProps {
  defi: {
    id: number;
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
  };
  index: number;
}

function DefiCard({ defi, index }: DefiCardProps) {
  const Icon = defi.icon;

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
      style={{
        animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#cfe3ff] to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 group-hover:bg-gradient-to-br group-hover:from-[#00A4E0] group-hover:to-[#0077A8] group-hover:text-white transition-all duration-300">
        {defi.id}
      </div>

      <div className="p-8">
        <div className="relative inline-block mb-6">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${defi.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}
          />
          <div
            className={`relative w-16 h-16 bg-gradient-to-br ${defi.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#00A4E0] transition-colors leading-tight">
          {defi.title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-sm">
          {defi.description}
        </p>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div
            className={`h-1 w-0 bg-gradient-to-r ${defi.color} rounded-full group-hover:w-full transition-all duration-500`}
          />
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* ================= ANIMATION ===================== */
/* ================================================= */

const styles = `
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
