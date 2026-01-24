import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resolveMediaUrl } from "@/utils/media";
import {
  fetchFormationDetails,
  sendFormationBrochure,
} from "@/services/formationService";
import type { FormationDetails } from "@/types/formation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Download, X } from "lucide-react";

import "swiper/css";

export default function FormationDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [formation, setFormation] = useState<FormationDetails | null>(null);
  const [loading, setLoading] = useState(true);

  /* ===== MODAL BROCHURE ===== */
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ================= CHARGEMENT DÉTAILS ================= */
  useEffect(() => {
    if (!id) return;

    fetchFormationDetails(Number(id))
      .then(setFormation)
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= ENVOI BROCHURE ================= */
  const sendBrochure = async () => {
    if (!name || !email || !id) {
      setError("Veuillez renseigner votre nom et votre email.");
      return;
    }

    try {
      setSending(true);
      setError(null);

      await sendFormationBrochure(Number(id), { name, email });

      setSuccess(true);
      setName("");
      setEmail("");
    } catch {
      setError("Erreur lors de l’envoi de la maquette. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-bold">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!formation || !formation.galleryImages?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Formation introuvable</p>
      </div>
    );
  }

  const heroImage = formation.galleryImages[0];
  const sliderImages = formation.galleryImages.slice(1);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* ================= HERO ================= */}
      <div className="relative h-[22rem] md:h-[26rem] lg:h-[25rem] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${resolveMediaUrl(heroImage)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-16">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl">
            {formation.title}
          </h1>
        </div>
      </div>

      {/* ================= CONTENU ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-10">
            <p className="text-gray-700 text-lg leading-relaxed font-bold">
              {formation.description}
            </p>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {sliderImages.length > 0 && (
              <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 3500 }}
                  loop
                  className="h-[420px]"
                >
                  {sliderImages.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={resolveMediaUrl(img)}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <button
                onClick={() => setOpen(true)}
                className="w-full py-4 rounded-xl text-white"
                style={{ backgroundColor: "#00A4E0" }}
              >
                <Download className="inline mr-2" />
                Télécharger la maquette
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => {
                setOpen(false);
                setSuccess(false);
                setError(null);
              }}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            {!success ? (
              <>
                <h2 className="text-2xl mb-6">
                  Recevoir la maquette par email
                </h2>

                <input
                  className="w-full mb-3 px-4 py-3 border rounded-lg"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="w-full mb-3 px-4 py-3 border rounded-lg"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {error && (
                  <p className="text-red-600 text-sm mb-3">{error}</p>
                )}

                <button
                  onClick={sendBrochure}
                  disabled={sending}
                  className="w-full py-3 rounded-lg text-white"
                  style={{ backgroundColor: "#00A4E0" }}
                >
                  {sending ? "Envoi en cours..." : "Recevoir la maquette"}
                </button>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-green-600 text-xl mb-2">
                  Maquette envoyée !
                </h3>
                <p>Veuillez vérifier votre boîte mail.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
