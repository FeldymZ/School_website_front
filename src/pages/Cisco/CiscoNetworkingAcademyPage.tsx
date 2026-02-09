import { useState } from "react";
import {
  Target,
  Network,
  Shield,
  Code,
  Radio,
  Award,
  BookOpen,
  Users,
  Globe,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Briefcase,

} from "lucide-react";
import Footer from "@/components/Footer/Footer";

const CiscoNetworkingAcademyPage = () => {
  const [activeTab, setActiveTab] = useState<
    "formations" | "certifications" | "avantages"
  >("formations");

  /* ================= DATA ================= */

  const formations = [
    {
      icon: <Network size={32} />,
      title: "Réseaux informatiques",
      description:
        "Apprenez à concevoir, configurer et gérer des infrastructures réseau professionnelles",
      modules: [
        "Introduction aux réseaux (CCNA 1)",
        "Routage et commutation (CCNA 2)",
        "Évolutivité des réseaux (CCNA 3)",
        "Services réseau (CCNA 4)",
      ],
    },
    {
      icon: <Shield size={32} />,
      title: "Cybersécurité",
      description:
        "Maîtrisez les concepts de sécurité informatique et protégez les systèmes",
      modules: [
        "Introduction à la cybersécurité",
        "Cybersecurity Essentials",
        "Sécurité des réseaux",
      ],
    },
    {
      icon: <Code size={32} />,
      title: "Programmation",
      description:
        "Automatisez et développez des applications orientées réseau",
      modules: [
        "Python Essentials",
        "Programmation réseau",
        "Automatisation des infrastructures",
      ],
    },
    {
      icon: <Radio size={32} />,
      title: "Internet des Objets (IoT)",
      description:
        "Découvrez les technologies IoT et leurs applications industrielles",
      modules: [
        "Introduction à l'IoT",
        "IoT Fundamentals",
        "Sécurité IoT",
      ],
    },
  ];

  const certifications = [
    {
      name: "CCNA (Cisco Certified Network Associate)",
      level: "Associé",
      description: "Certification réseau reconnue mondialement",
    },
    {
      name: "CyberOps Associate",
      level: "Associé",
      description: "Certification en opérations de cybersécurité",
    },
    {
      name: "DevNet Associate",
      level: "Associé",
      description: "Certification pour développeurs d'applications réseau",
    },
  ];

  const avantages = [
    {
      icon: <BookOpen size={24} />,
      title: "Contenu officiel Cisco",
      description: "Cours conçus et mis à jour par Cisco",
    },
    {
      icon: <Users size={24} />,
      title: "Instructeurs certifiés",
      description: "Formateurs certifiés Cisco",
    },
    {
      icon: <Globe size={24} />,
      title: "Reconnaissance mondiale",
      description: "Certifications reconnues par les employeurs IT",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Insertion professionnelle",
      description: "Accès à des opportunités de carrière internationales",
    },
    {
      icon: <Briefcase size={24} />,
      title: "Partenariats entreprises",
      description: "Stages et emplois via le réseau Cisco",
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
              Cisco Networking Academy
            </h1>

            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-6">
              Aussi connue sous le nom de <strong>NetAcad</strong>, est un programme
              mondial d'éducation et de développement professionnel en TI, initié
              par le géant américain Cisco Systems en 1997. Elle propose des
              formations en réseau, cybersécurité, programmation et IoT, mêlant
              cours en ligne et travaux pratiques, préparant à des certifications
              reconnues comme le <strong>CCNA</strong>.
            </p>

            <p className="text-white/90 font-semibold">
              L’ESIITECH est membre de CISCO NETWORKING ACADEMY depuis 2021.
            </p>

            <div className="flex items-center justify-center gap-2 mt-8">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white/80 text-sm font-medium">
                Programme international de référence
              </span>
            </div>
          </div>
        </section>

        {/* ================= TABS ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              ["formations", "Formations"],
              ["certifications", "Certifications"],
              ["avantages", "Avantages"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() =>
                  setActiveTab(
                    key as "formations" | "certifications" | "avantages"
                  )
                }
                className={`px-8 py-4 rounded-xl font-bold transition-all ${
                  activeTab === key
                    ? "bg-gradient-to-r from-[#00A4E0] to-[#0077A8] text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ================= CONTENT ================= */}
          {activeTab === "formations" && (
            <div className="grid md:grid-cols-2 gap-8">
              {formations.map((f, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-[#00A4E0]">{f.icon}</div>
                    <h3 className="text-xl font-bold">{f.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{f.description}</p>
                  <ul className="space-y-2">
                    {f.modules.map((m, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle
                          size={16}
                          className="text-green-500"
                        />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === "certifications" && (
            <div className="grid md:grid-cols-2 gap-8">
              {certifications.map((c, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
                >
                  <Award className="w-10 h-10 text-[#00A4E0] mb-4" />
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <p className="text-sm font-semibold text-[#00A4E0] mb-2">
                    Niveau {c.level}
                  </p>
                  <p className="text-gray-600">{c.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "avantages" && (
            <div className="grid md:grid-cols-3 gap-8">
              {avantages.map((a, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
                >
                  <div className="text-[#00A4E0] mb-4">{a.icon}</div>
                  <h3 className="font-bold mb-2">{a.title}</h3>
                  <p className="text-gray-600 text-sm">{a.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default CiscoNetworkingAcademyPage;
