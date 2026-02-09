import {
  Target,
  Sparkles,
  GraduationCap,
  Briefcase,
  Lightbulb,
  TrendingUp,
  Users,
  Code,
} from "lucide-react";
import Footer from "@/components/Footer/Footer";

const NosMissionsPage = () => {
  const missions = [
    {
      icon: <GraduationCap size={28} />,
      title: "Formation d'experts",
      description:
        "Former des experts dans les métiers des NTIC dont les profils sont les plus recherchés sur le marché de l'emploi au Gabon",
    },
    {
      icon: <Briefcase size={28} />,
      title: "Stages et immersion",
      description:
        "Trouver des stages d'immersion et de fin de cycle à chaque étudiant à travers notre réseau d'entreprises partenaires",
    },
    {
      icon: <Lightbulb size={28} />,
      title: "Auto-emploi et startups",
      description:
        "Encourager nos jeunes diplômés à s'orienter vers l'auto emploi à travers la création de startups",
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Renforcement des capacités",
      description:
        "Participer aux renforcements des capacités des professionnels en activité à travers des formations à la carte",
    },
    {
      icon: <Users size={28} />,
      title: "Partenariats stratégiques",
      description:
        "Développer des partenariats avec d'autres grandes écoles impliquées dans l'enseignement des NTIC",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Innovation et créativité",
      description:
        "Innover et encourager la créativité, l'esprit critique et l'ouverture aux nouvelles technologies pour répondre aux défis actuels et futurs",
    },
    {
      icon: <Code size={28} />,
      title: "Développement de plateformes",
      description:
        "Concevoir et développer des plateformes web et mobile visant à améliorer les conditions de vie des populations",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
        {/* ================= HERO (IDENTIQUE NOS DEFIS) ================= */}
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
              Nos Missions
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Sept engagements stratégiques pour former, innover et contribuer
              durablement au développement technologique du Gabon
            </p>
          </div>
        </section>

        {/* ================= MISSIONS ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missions.slice(0, 3).map((mission, index) => (
              <MissionCard key={index} mission={mission} index={index} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {missions.slice(3, 7).map((mission, index) => (
              <MissionCard
                key={index + 3}
                mission={mission}
                index={index + 3}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default NosMissionsPage;

/* ================= CARD ================= */

interface MissionCardProps {
  mission: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  index: number;
}

function MissionCard({ mission, index }: MissionCardProps) {
  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
      style={{
        animation: `slideUp 0.6s ease-out ${index * 0.08}s both`,
      }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#cfe3ff] to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-8">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-[#00A4E0]/30 rounded-2xl blur-xl opacity-40" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-2xl flex items-center justify-center shadow-lg">
            <div className="text-white">{mission.icon}</div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {mission.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          {mission.description}
        </p>
      </div>
    </div>
  );
}
