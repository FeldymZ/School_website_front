import { Quote, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function MotDuDG() {
  return (
    <section className="w-full bg-gray-50 pt-8 pb-20">

      <div className="max-w-4xl mx-auto px-3">
        {/* ===== RETOUR ===== */}
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-[#00A4E0] font-semibold mb-8 hover:underline"
        >
          <ArrowLeft size={20} />
          Retour à l’accueil
        </Link>

        {/* ===== HEADER ===== */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-[#00A4E0] py-4 text-center">
            <p className="text-white font-bold flex items-center justify-center gap-2 text-lg">
              <Quote size={20} />
              Mot du Directeur Général
            </p>
          </div>

          {/* ===== CONTENU ===== */}
          <div className="p-8 md:p-10 space-y-6">
            {/* PHOTO */}
            <div className="flex justify-center">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src="/images/directrice-zita-moussambi.jpg"
                  alt="Dr Zita Hermance Moussambi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* IDENTITÉ */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Dr Zita Hermance MOUSSAMBI
              </h1>
              <p className="text-[#00A4E0] font-semibold">
                Directeur Général de l’ESIITECH
              </p>
            </div>

            {/* TEXTE */}
            <div className="relative bg-gray-50 rounded-2xl p-6 md:p-8 text-gray-700 leading-relaxed">
              <Quote
                size={26}
                className="absolute -top-4 -left-4 text-[#00A4E0]/30"
              />

              <p className="font-semibold text-gray-900 mb-4">
                Chers étudiants,
              </p>

              <p className="mb-4">
                Je vous souhaite la bienvenue sur le site de l’École Supérieure
                d’Ingénierie et d’Innovation Technologique dont j’ai l’honneur de
                présider en qualité de Directeur Général.
              </p>

              <p className="mb-4">
                Si vous souhaitez préparer une Licence ou un Master dans les
                métiers des Nouvelles Technologies de l’Information et de la
                Communication (NTIC), sachez que vous êtes au bon endroit.
                L’ESIITECH vous propose des formations uniques dans des métiers
                exigeants et pointus tels que la cyber défense, la monétique,
                le développement web et mobile, le big data, l’archivage
                numérique, les réseaux haut débit et sans fil, le cloud
                computing, entre autres.
              </p>

              <p className="mb-4">
                Notre offre de formation, unique au Gabon, vous ouvrira
                directement les portes de l’emploi. En intégrant l’ESIITECH,
                vous serez non seulement formé par des experts de haut niveau,
                mais vous bénéficierez également de stages offerts par l’école
                grâce à son réseau d’entreprises partenaires.
              </p>

              <p className="mb-4">
                À l’ESIITECH, <strong>2 étudiants sur 3</strong> trouvent leur
                premier emploi à peine un mois après leur soutenance. Cette
                performance est la preuve évidente que les entreprises
                partenaires reconnaissent la qualité de nos diplômés.
              </p>

              <p>
                Si vous recherchez une école d’excellence pour vous former dans
                les métiers des NTIC, je vous invite à prendre le temps de
                visiter notre site web. Je serai également ravie de vous
                rencontrer au siège de l’école, situé derrière le Palais de
                Justice de Libreville.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
