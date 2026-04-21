import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resolveMediaUrl } from "@/utils/media";
import {
  fetchFormationDetailsBySlug,
  sendFormationBrochureBySlug,
} from "@/services/formationService";
import type { FormationDetails } from "@/types/formation";
import { Download, X, CheckCircle, FileText, Mail, User, ChevronLeft, ChevronRight } from "lucide-react";

/* ================= HTML DISPLAY FIX ================= */
function formatHtmlForDisplay(html: string): string {
  if (!html) return "";

  let output = html;

  output = output.replace(
    /<p>\s*((?:•.*?<br>\s*)+)<\/p>/gs,
    (_: string, list: string) => {
      const items = list
        .split("<br>")
        .map((line: string) => line.replace("•", "").trim())
        .filter(Boolean);

      return `
        <ul>
          ${items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `;
    }
  );

  return output;
}

/* ================= TYPES GALERIE (API RÉELLE) ================= */
type GalleryImage = {
  url: string;
};

export default function FormationDetailsPage() {
  const { slug } = useParams<{ slug: string }>();

  const [formation, setFormation] = useState<FormationDetails | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= MODAL BROCHURE ================= */
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ================= GALERIE ================= */
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  /* ================= PARALLAX ================= */
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= LOAD DETAILS ================= */
  useEffect(() => {
    if (!slug) return;

    fetchFormationDetailsBySlug(slug)
      .then(setFormation)
      .finally(() => setLoading(false));
  }, [slug]);

  /* ================= SEND BROCHURE ================= */
  const sendBrochure = async () => {
    if (!slug || !name || !email) {
      setError("Veuillez renseigner votre nom et votre email.");
      return;
    }

    try {
      setSending(true);
      setError(null);

      await sendFormationBrochureBySlug(slug, { name, email });

      setSuccess(true);
      setName("");
      setEmail("");
    } catch {
      setError(
        "Erreur lors de l'envoi de la maquette. Veuillez réessayer."
      );
    } finally {
      setSending(false);
    }
  };

  /* ================= DATA ================= */
  const coverImage = formation?.coverImageUrl || "/images/default-formation.jpg";
  const hasPdf = Boolean(formation?.pdfUrl);
  const gallery = (formation?.galleryImages as unknown as GalleryImage[]) || [];
  const hasGallery = gallery.length > 0;

  /* ================= AUTO SLIDER GALERIE ================= */
  useEffect(() => {
    if (gallery.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [gallery.length]);

  const goToPreviousGallery = () => {
    setCurrentGalleryIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  const goToNextGallery = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % gallery.length);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 py-20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-20 h-20 border-4 border-[#00A4E0] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-xl font-bold text-gray-700">
            Chargement de la formation...
          </p>
        </div>
      </div>
    );
  }

  if (!formation) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 py-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-red-100">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-black text-gray-900">
                Formation introuvable
              </h3>
              <p className="text-gray-600 text-lg">
                Cette formation n'existe pas ou n'est plus disponible.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
      {/* ================= HERO AVEC PARALLAXE - SANS ESPACE EN HAUT ================= */}
      <div className="relative h-[20rem] md:h-[24rem] overflow-hidden -mt-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${resolveMediaUrl(coverImage)})`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-16">
          <div className="space-y-4">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black drop-shadow-2xl">
              {formation.title}
            </h1>
            <div className="h-1 w-24 bg-[#00A4E0] rounded-full" />
          </div>
        </div>
      </div>

      {/* ================= CONTENT - GRID LAYOUT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= COLONNE GAUCHE: DESCRIPTION ================= */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 md:p-12 h-full">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Description de la formation
                </h2>
              </div>

              <div
                className="
                  prose prose-lg max-w-none
                  prose-headings:text-gray-900
                  prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-6
                  prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 prose-h3:mt-4
                  prose-p:text-gray-700 prose-p:mb-4 prose-p:leading-relaxed prose-p:mt-0
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-em:italic
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2
                  prose-li:text-gray-700 prose-li:marker:text-[#00A4E0] prose-li:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-[#00A4E0]
                  prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic
                  prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50
                  prose-blockquote:rounded-r-lg prose-blockquote:my-6
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1
                  prose-code:rounded prose-code:text-sm prose-code:text-pink-600
                  prose-code:font-mono prose-code:before:content-['']
                  prose-code:after:content-['']
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4
                  prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:mb-6
                  prose-hr:border-0 prose-hr:border-t-2 prose-hr:border-gray-200
                  prose-hr:my-8
                  prose-a:text-[#00A4E0] prose-a:no-underline prose-a:font-medium
                  prose-a:hover:underline
                "
                dangerouslySetInnerHTML={{
                  __html: formatHtmlForDisplay(formation.description ?? ""),
                }}
              />
            </div>
          </div>

          {/* ================= COLONNE DROITE: GALERIE + MAQUETTE ================= */}
          <div className="lg:col-span-1 space-y-8">

            {/* ================= GALERIE AVEC SLIDER AUTO (SANS MINIATURES) ================= */}
            {hasGallery && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
                {/* Slider principal */}
                <div className="relative h-[300px] rounded-2xl overflow-hidden">
                  {gallery.map((img, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentGalleryIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={resolveMediaUrl(img.url)}
                        alt={`Galerie ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setSelectedImage(resolveMediaUrl(img.url))}
                      />
                    </div>
                  ))}

                  {/* Boutons navigation */}
                  {gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goToPreviousGallery}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                                   w-10 h-10 rounded-full bg-white/20 hover:bg-white/30
                                   backdrop-blur-sm flex items-center justify-center
                                   text-white hover:scale-110 transition-all duration-300"
                      >
                        <ChevronLeft size={24} />
                      </button>

                      <button
                        type="button"
                        onClick={goToNextGallery}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                                   w-10 h-10 rounded-full bg-white/20 hover:bg-white/30
                                   backdrop-blur-sm flex items-center justify-center
                                   text-white hover:scale-110 transition-all duration-300"
                      >
                        <ChevronRight size={24} />
                      </button>

                      {/* Indicateurs */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                        {gallery.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentGalleryIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentGalleryIndex
                                ? "bg-white w-6"
                                : "bg-white/50 hover:bg-white/75"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* ================= MAQUETTE ================= */}
            {hasPdf && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 space-y-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex w-14 h-14 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl items-center justify-center">
                    <Download className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Télécharger la maquette
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Recevez la maquette complète par email
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="w-full py-3 rounded-xl text-white font-bold
                             bg-gradient-to-r from-[#00A4E0] to-[#0077A8]
                             hover:shadow-xl hover:shadow-blue-500/30
                             hover:scale-105 active:scale-95 transition-all duration-300
                             flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  <span>Obtenir la maquette</span>
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ================= LIGHTBOX GALERIE ================= */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 w-12 h-12 rounded-full
                       bg-white/10 hover:bg-white/20
                       flex items-center justify-center text-white
                       hover:scale-110 transition-all duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>

          <img
            src={selectedImage}
            alt="Image en grand"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ================= MODAL BROCHURE ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => {
            setOpen(false);
            setSuccess(false);
            setError(null);
          }}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSuccess(false);
                setError(null);
              }}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full
                         bg-gray-100 hover:bg-gray-200 flex items-center justify-center
                         text-gray-600 hover:scale-110 transition-all duration-300"
            >
              <X size={20} />
            </button>

            {!success ? (
              <div className="p-8">
                <div className="text-center mb-8 space-y-3">
                  <div className="inline-flex w-16 h-16 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl items-center justify-center">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Recevoir la maquette
                  </h2>
                  <p className="text-gray-600">
                    Renseignez vos informations
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg
                                 focus:border-[#00A4E0] focus:ring-2 focus:ring-[#00A4E0]/20
                                 transition-all outline-none"
                      placeholder="Votre nom complet"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg
                                 focus:border-[#00A4E0] focus:ring-2 focus:ring-[#00A4E0]/20
                                 transition-all outline-none"
                      placeholder="Votre adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">
                        {error}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={sendBrochure}
                    disabled={sending}
                    className="w-full py-3 rounded-lg text-white font-bold
                               bg-gradient-to-r from-[#00A4E0] to-[#0077A8]
                               hover:shadow-xl hover:shadow-blue-500/30
                               hover:scale-105 active:scale-95 transition-all duration-300
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                               flex items-center justify-center gap-3"
                  >
                    {sending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Download size={20} />
                        <span>Recevoir la maquette</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center space-y-6">
                <div className="inline-flex w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Maquette envoyée !
                  </h3>
                  <p className="text-gray-600">
                    Veuillez vérifier votre boîte mail.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setSuccess(false);
                  }}
                  className="px-8 py-3 rounded-lg bg-gray-100 hover:bg-gray-200
                             text-gray-700 font-semibold
                             hover:scale-105 transition-all duration-300"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
