import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resolveMediaUrl } from "@/utils/media";
import {
  fetchFormationDetailsBySlug,
  sendFormationBrochureBySlug,
} from "@/services/formationService";
import {
  fetchPreinscriptionSession,
} from "@/services/preinscription.service";
import type { FormationDetails } from "@/types/formation";
import type { SessionPublique } from "@/types/preinscription";
import {
  Download,
  X,
  CheckCircle,
  FileText,
  Mail,
  User,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Clock,
  Sparkles,
  Images,
} from "lucide-react";

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
  const navigate = useNavigate();

  const [formation, setFormation] = useState<FormationDetails | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= SESSION PREINSCRIPTION ================= */
  const [session, setSession] = useState<SessionPublique | null>(null);

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

  /* ================= LOAD SESSION ================= */
  useEffect(() => {
    fetchPreinscriptionSession()
      .then(setSession)
      .catch(() => setSession(null));
  }, []);

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
      setError("Erreur lors de l'envoi de la maquette. Veuillez réessayer.");
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
    setCurrentGalleryIndex((prev) => prev === 0 ? gallery.length - 1 : prev - 1);
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
          <p className="text-xl font-bold text-gray-700">Chargement de la formation...</p>
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
              <h3 className="text-3xl font-black text-gray-900">Formation introuvable</h3>
              <p className="text-gray-600 text-lg">Cette formation n'existe pas ou n'est plus disponible.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 min-h-screen">

      {/* ================= HERO ================= */}
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

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= DESCRIPTION ================= */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 md:p-12 h-full">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Description de la formation</h2>
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
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2
                  prose-li:text-gray-700 prose-li:marker:text-[#00A4E0] prose-li:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-[#00A4E0]
                  prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic
                  prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50
                  prose-blockquote:rounded-r-lg prose-blockquote:my-6
                  prose-a:text-[#00A4E0] prose-a:no-underline prose-a:font-medium
                  prose-a:hover:underline
                "
                dangerouslySetInnerHTML={{
                  __html: formatHtmlForDisplay(formation.description ?? ""),
                }}
              />
            </div>
          </div>

          {/* ================= SIDEBAR ================= */}
          <div className="lg:col-span-1 space-y-6">

            {/* ===== CARD PRÉINSCRIPTION ===== */}
            {session?.ouverte ? (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl blur-md opacity-40" />
                    <div className="relative w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                      <Rocket size={18} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800">DEMANDE DE PREINSCRIPTION OUVERTE</h2>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Sparkles size={10} className="text-green-500" />
                      {session.anneeUniversitaire}
                    </p>
                  </div>
                </div>

                {session.dateDebut && session.dateFin && (
                  <div className="bg-green-50 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-green-700 font-medium">
                    <Clock size={13} />
                    Jusqu'au {new Date(session.dateFin).toLocaleDateString("fr-FR")}
                  </div>
                )}

                <button
                  onClick={() => navigate(`/preinscription/${slug}`)}
                  className="group relative w-full py-3.5 rounded-xl text-white font-bold overflow-hidden
                             hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-green-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center justify-center gap-2 text-sm">
                    <Rocket size={15} /> Demander une préinscription
                  </span>
                </button>
              </div>
            ) : session !== null && (
              /* Session chargée mais fermée */
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Clock size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700">Préinscriptions</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Actuellement fermées</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-500 text-center">
                  Les préinscriptions ne sont pas encore ouvertes pour cette période.
                </div>
              </div>
            )}

            {/* ===== GALERIE ===== */}
            {hasGallery && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Images size={14} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">Galerie photos</h3>
                </div>
                <div className="relative h-[260px] rounded-2xl overflow-hidden group">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {gallery.length > 1 && (
                    <>
                      <button type="button" onClick={goToPreviousGallery}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full
                                   bg-black/40 hover:bg-black/60 backdrop-blur flex items-center justify-center text-white
                                   opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                        <ChevronLeft size={18} />
                      </button>
                      <button type="button" onClick={goToNextGallery}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full
                                   bg-black/40 hover:bg-black/60 backdrop-blur flex items-center justify-center text-white
                                   opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                        <ChevronRight size={18} />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                        {gallery.map((_, i) => (
                          <button key={i} type="button" onClick={() => setCurrentGalleryIndex(i)}
                            className={`rounded-full transition-all duration-300 ${
                              i === currentGalleryIndex ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/60"
                            }`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* ===== MAQUETTE ===== */}
            {hasPdf && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 space-y-5">
                <div className="text-center space-y-3">
                  <div className="inline-flex w-14 h-14 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl items-center justify-center">
                    <Download className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Télécharger la maquette</h3>
                  <p className="text-gray-600 text-sm">Recevez la maquette complète par email</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="group relative w-full py-3 rounded-xl text-white font-bold overflow-hidden
                             hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-blue-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0077A8] to-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center justify-center gap-2">
                    <Download size={18} /> Obtenir la maquette
                  </span>
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ================= LIGHTBOX ================= */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}>
          <button type="button"
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20
                       flex items-center justify-center text-white hover:scale-110 transition-all"
            onClick={() => setSelectedImage(null)}>
            <X size={24} />
          </button>
          <img src={selectedImage} alt="Image en grand"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* ================= MODAL BROCHURE ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => { setOpen(false); setSuccess(false); setError(null); }}>
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden
                          animate-in fade-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}>

            {/* Header modal */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center ring-1 ring-white/30">
                    <Mail size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-base">Maquette pédagogique</h2>
                    <p className="text-white/60 text-xs mt-0.5">Reçue directement par email</p>
                  </div>
                </div>
                <button onClick={() => { setOpen(false); setSuccess(false); setError(null); }}
                  className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all">
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Body modal */}
            <div className="p-6 space-y-4">
              {success ? (
                <div className="text-center py-8 space-y-5">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-400 rounded-2xl blur-xl opacity-40 animate-pulse" />
                      <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900 text-lg">Maquette envoyée !</p>
                    <p className="text-gray-500 text-sm">Vérifiez votre boîte email.</p>
                  </div>
                  <button onClick={() => { setOpen(false); setSuccess(false); }}
                    className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-all">
                    Fermer
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={15} />
                    <input placeholder="Votre nom complet" value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/30 focus:border-[#00A4E0] text-sm transition-all" />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={15} />
                    <input type="email" placeholder="Votre adresse email" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/30 focus:border-[#00A4E0] text-sm transition-all" />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">{error}</div>
                  )}
                  <button type="button" onClick={sendBrochure} disabled={sending}
                    className="group relative w-full py-3.5 rounded-xl text-white font-bold text-sm overflow-hidden
                               hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-200
                               disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0077A8] to-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center justify-center gap-2">
                      {sending ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi en cours...</>
                      ) : (
                        <><Download size={16} /> Recevoir la maquette</>
                      )}
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}