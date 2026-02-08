import { useState } from "react";
import {
  Target,
  Heart,
  Award,
  TrendingUp,
  Globe,
  Code,
  Shield,
  CheckCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Crown,
  Trophy,
  Star,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Users,
} from "lucide-react";
import Footer from "@/components/Footer/Footer";

const AProposPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    {
      url: "/images/histoire/escalier.jpeg",
    },
    {
      url: "/images/histoire/reunion.jpeg",
    },
    {
      url: "/images/histoire/entree.jpeg",
    }
  ];

  const missions = [
    {
      icon: <GraduationCap size={24} />,
      title: "Formation d'experts",
      description: "Former des experts dans les métiers des NTIC dont les profils sont les plus recherchés sur le marché de l'emploi au Gabon",
    },
    {
      icon: <Briefcase size={24} />,
      title: "Stages et immersion",
      description: "Trouver des stages d'immersion et de fin de cycle à chaque étudiant à travers notre réseau d'entreprises partenaires",
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Auto-emploi et startups",
      description: "Encourager nos jeunes diplômés à s'orienter vers l'auto emploi à travers la création de startups",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Renforcement des capacités",
      description: "Participer aux renforcements des capacités des professionnels en activité à travers des formations à la carte",
    },
    {
      icon: <Users size={24} />,
      title: "Partenariats stratégiques",
      description: "Développer des partenariats avec d'autres grandes écoles impliquées dans l'enseignement des NTIC",
    },
    {
      icon: <Sparkles size={24} />,
      title: "Innovation et créativité",
      description: "Innover et encourager la créativité, l'esprit critique et l'ouverture aux nouvelles technologies pour répondre aux défis actuels et futurs",
    },
    {
      icon: <Code size={24} />,
      title: "Développement de plateformes",
      description: "Concevoir et développer des plateformes web et mobile visant à améliorer les conditions de vie des populations",
    },
  ];

  const valeurs = [
    {
      icon: <Award size={32} />,
      title: "Excellence académique",
      description: "L'excellence académique est la valeur cardinale de l'ESIITECH. Pour y parvenir, nos étudiants sont soumis à un rythme de travail soutenu à travers les cours magistraux, les travaux dirigés (TD), les travaux pratiques (TP) et les projets tutorés.",
      highlights: [
        "54% du volume horaire consacré à la théorie",
        "56% consacré à la pratique via nos plateformes de TP",
        "Note éliminatoire de 8/20 à chaque module",
      ],
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Intégrité et professionnalisme",
      description: "Il s'agit de promouvoir l'honnêteté intellectuelle, l'éthique, la transparence et le respect des règles.",
      highlights: [
        "Lutte contre l'absentéisme",
        "10H d'absence non justifiée = exclusion des stages",
        "Éthique professionnelle rigoureuse",
      ],
    },
    {
      icon: <Globe size={32} />,
      title: "Responsabilité sociale",
      description: "Former des professionnels engagés, conscients de leur rôle dans le développement économique, social et durable du pays.",
      highlights: [
        "Formation citoyenne",
        "Développement durable",
        "Impact social positif",
      ],
    },
  ];

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#cfe3ff]/30">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-[#00A4E0] text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

          <div className="relative max-w-7xl mx-auto px-6 py-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
                <Sparkles size={18} className="animate-pulse" />
                <span className="font-bold text-sm">À propos de l'ESIITECH</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black drop-shadow-2xl">
                École Supérieure d'Ingénierie<br />et d'Innovation Technologique
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">
                Un établissement supérieur privé proposant des formations dans le domaine des Nouvelles Technologies de l'Information et de la Communication
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <div className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                  <p className="text-xs text-white/80">Fondée en</p>
                  <p className="text-xl font-black">2021</p>
                </div>
                <div className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                  <p className="text-xs text-white/80">Décrets</p>
                  <p className="text-base font-black">0071 & 0072</p>
                </div>
                <div className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                  <p className="text-xs text-white/80">PR/MESRSIT</p>
                  <p className="text-xl font-black">24/02/2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
          {/* Galerie d'images - SANS TEXTE */}
          <section className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-black text-gray-900">
                Découvrez notre campus
              </h2>
              <p className="text-[#A6A6A6] text-lg">
                Un environnement moderne pour votre réussite
              </p>
            </div>

            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={img.url}
                    alt="Campus ESIITECH"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Navigation */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
                           bg-white/20 hover:bg-white/30 backdrop-blur-sm
                           flex items-center justify-center text-white
                           hover:scale-110 transition-all duration-300 border border-white/30"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
                           bg-white/20 hover:bg-white/30 backdrop-blur-sm
                           flex items-center justify-center text-white
                           hover:scale-110 transition-all duration-300 border border-white/30"
              >
                <ChevronRight size={28} />
              </button>

              {/* Indicateurs */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Présidente */}
          <section className="relative overflow-hidden bg-[#00A4E0] rounded-3xl shadow-2xl p-12 text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border-4 border-white/30 shadow-2xl">
                <Crown size={64} className="text-white" />
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <Star size={18} className="animate-pulse" />
                  <span className="font-bold">Direction</span>
                </div>

                <h2 className="text-4xl font-black drop-shadow-lg">
                  Hermance Zita MOUSSAMBI
                </h2>

                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white/90">
                    Docteur en Physique
                  </p>
                  <p className="text-xl text-white/80">
                    Enseignante-Chercheuse
                  </p>
                </div>

                <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
                  Depuis son ouverture, l'ESIITECH est présidée par le Dr. Hermance Zita MOUSSAMBI, qui guide l'établissement avec expertise et dévouement vers l'excellence académique.
                </p>
              </div>
            </div>
          </section>

          {/* Première promotion */}
          <section className="relative overflow-hidden bg-white rounded-3xl shadow-2xl p-12 border-2 border-[#cfe3ff]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#cfe3ff]/20 to-transparent" />

            <div className="relative space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-flex w-24 h-24 bg-[#00A4E0] rounded-3xl items-center justify-center border-4 border-[#cfe3ff] shadow-2xl">
                  <Trophy size={56} className="text-white" />
                </div>

                <h2 className="text-5xl font-black text-gray-900">
                  Première Promotion
                </h2>

                <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#cfe3ff] rounded-full shadow-lg">
                  <Sparkles size={20} className="text-[#00A4E0] animate-pulse" />
                  <span className="text-xl font-bold text-gray-900">2 Février 2025</span>
                </div>
              </div>

              <div className="max-w-3xl mx-auto bg-[#cfe3ff]/30 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#cfe3ff] shadow-xl">
                <div className="text-center space-y-4">
                  <p className="text-2xl font-bold text-gray-900">
                    Promotion baptisée
                  </p>

                  <h3 className="text-4xl md:text-5xl font-black text-[#00A4E0]">
                    "DOUMPAMBY MATOKA"
                  </h3>

                  <div className="pt-4 border-t-2 border-[#cfe3ff]">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Du nom de l'ancien <span className="font-bold text-gray-900">Ministre de l'Économie et des Finances</span> du Gabon
                    </p>
                  </div>

                  <div className="flex justify-center gap-4 pt-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-[#cfe3ff]">
                      <Award size={18} className="text-[#00A4E0]" />
                      <span className="font-bold text-gray-900">Honneur</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-[#cfe3ff]">
                      <Star size={18} className="text-[#00A4E0]" />
                      <span className="font-bold text-gray-900">Excellence</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-[#cfe3ff]">
                      <Trophy size={18} className="text-[#00A4E0]" />
                      <span className="font-bold text-gray-900">Réussite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Nos Missions - 3 sur la première ligne, 4 sur la deuxième */}
          <section className="space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#00A4E0] text-white rounded-full shadow-lg">
                <Target size={24} />
                <h2 className="text-2xl font-black">Nos Missions</h2>
              </div>
              <p className="text-[#A6A6A6] text-lg max-w-2xl mx-auto">
                Sept engagements pour votre avenir professionnel
              </p>
            </div>

            {/* Première ligne - 3 missions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {missions.slice(0, 3).map((mission, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#00A4E0]"
                >
                  <div className="absolute inset-0 bg-[#cfe3ff] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                  <div className="relative p-6 space-y-4">
                    <div className="w-14 h-14 bg-[#00A4E0] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">{mission.icon}</div>
                    </div>

                    <h3 className="text-xl font-black text-gray-900">
                      {mission.title}
                    </h3>

                    <p className="text-[#A6A6A6] leading-relaxed">
                      {mission.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {/* Deuxième ligne - 4 missions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {missions.slice(3, 7).map((mission, index) => (
                <div
                  key={index + 3}
                  className="group relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#00A4E0]"
                >
                  <div className="absolute inset-0 bg-[#cfe3ff] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                  <div className="relative p-6 space-y-4">
                    <div className="w-14 h-14 bg-[#00A4E0] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">{mission.icon}</div>
                    </div>

                    <h3 className="text-xl font-black text-gray-900">
                      {mission.title}
                    </h3>

                    <p className="text-[#A6A6A6] leading-relaxed">
                      {mission.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </section>

          {/* Nos Valeurs */}
          <section className="space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#00A4E0] text-white rounded-full shadow-lg">
                <Heart size={24} />
                <h2 className="text-2xl font-black">Nos Valeurs</h2>
              </div>
              <p className="text-[#A6A6A6] text-lg max-w-2xl mx-auto">
                Les principes qui guident notre action
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {valeurs.map((valeur, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden bg-white rounded-3xl shadow-2xl border-2 border-gray-200 hover:border-[#00A4E0] hover:shadow-3xl transition-all duration-500 group"
                >
                  <div className="absolute inset-0 bg-[#cfe3ff] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                  <div className="relative p-8 space-y-6">
                    <div className="inline-flex w-16 h-16 bg-[#00A4E0] rounded-2xl items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">{valeur.icon}</div>
                    </div>

                    <h3 className="text-2xl font-black text-gray-900">
                      {valeur.title}
                    </h3>

                    <p className="text-gray-700 leading-relaxed">
                      {valeur.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t-2 border-gray-100">
                      {valeur.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-1 w-6 h-6 bg-[#00A4E0] rounded-lg flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={14} className="text-white" />
                          </div>
                          <p className="text-sm text-gray-700 font-medium">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CISCO Networking Academy */}
          <section className="relative overflow-hidden bg-[#00A4E0] rounded-3xl shadow-2xl p-12 text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

            <div className="relative space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl">
                  <Shield size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-black drop-shadow-lg">
                    CISCO NETWORKING ACADEMY
                  </h2>
                  <p className="text-white/80 text-lg mt-1">
                    Partenaire depuis 2021
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-white/90">
                    Aussi connue sous le nom de <span className="font-bold">NetAcad</span>, est un programme mondial d'éducation et de développement professionnel en TI, initié par le géant américain <span className="font-bold">Cisco Systems en 1997</span>.
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <Award size={20} />
                    <span className="font-bold">L'ESIITECH est membre depuis 2021</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Formations proposées :</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Réseau", "Cybersécurité", "Programmation", "IoT"].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                      >
                        <CheckCircle size={18} className="flex-shrink-0" />
                        <span className="font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-white/80 text-sm">
                    Préparation à des certifications reconnues comme le <span className="font-bold text-white">CCNA</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default AProposPage;
