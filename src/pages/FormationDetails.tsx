import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resolveMediaUrl } from "@/utils/media";
import {
  fetchFormationDetailsBySlug,
  sendFormationBrochureBySlug,
} from "@/services/formationService";
import type { FormationDetails } from "@/types/formation";
import { Download, X, CheckCircle, FileText, Mail, User, ChevronLeft, ChevronRight, Images } from "lucide-react";

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
      <div className="relative h-[24rem] md:h-[28rem] overflow-hidden -mt-6">
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

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        {/* ================= DESCRIPTION ================= */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 md:p-12">
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
              prose prose-lg max-w-none text-gray-700
              prose-ul:pl-6
              prose-li:marker:text-[#00A4E0]
              prose-p:my-3
            "
            dangerouslySetInnerHTML={{
              __html: formatHtmlForDisplay(formation.description ?? ""),
            }}
          />
        </div>

        {/* ================= GALERIE AVEC SLIDER AUTO ================= */}
        {hasGallery && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl flex items-center justify-center">
                <Images className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Galerie de la formation
              </h2>
            </div>

            {/* Slider principal */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-6">
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
                    onClick={goToPreviousGallery}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                               w-12 h-12 rounded-full bg-white/20 hover:bg-white/30
                               backdrop-blur-sm flex items-center justify-center
                               text-white hover:scale-110 transition-all duration-300"
                  >
                    <ChevronLeft size={28} />
                  </button>

                  <button
                    onClick={goToNextGallery}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                               w-12 h-12 rounded-full bg-white/20 hover:bg-white/30
                               backdrop-blur-sm flex items-center justify-center
                               text-white hover:scale-110 transition-all duration-300"
                  >
                    <ChevronRight size={28} />
                  </button>

                  {/* Indicateurs */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentGalleryIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          index === currentGalleryIndex
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Miniatures */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryIndex(index)}
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                    index === currentGalleryIndex
                      ? "ring-4 ring-[#00A4E0] scale-105"
                      : "hover:scale-105 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={resolveMediaUrl(img.url)}
                    alt={`Miniature ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= MAQUETTE ================= */}
        {hasPdf && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 space-y-6 max-w-md mx-auto">
            <div className="text-center space-y-3">
              <div className="inline-flex w-16 h-16 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl items-center justify-center">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Télécharger la maquette
              </h3>
              <p className="text-gray-600 text-sm">
                Recevez la maquette complète par email
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="w-full py-4 rounded-xl text-white font-bold
                         bg-gradient-to-r from-[#00A4E0] to-[#0077A8]
                         hover:shadow-xl hover:shadow-blue-500/30
                         hover:scale-105 active:scale-95 transition-all duration-300
                         flex items-center justify-center gap-3"
            >
              <Download size={20} />
              <span>Obtenir la maquette</span>
            </button>
          </div>
        )}
      </div>

      {/* ================= LIGHTBOX GALERIE ================= */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
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
