import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Clock, Search, ArrowRight, Sparkles, AlertCircle, Inbox, Timer, BookOpen } from "lucide-react";

import { SessionFormationPublicService, imageFormation, imageUrl } from "@/services/sessionFormation.service";
import { IMAGE_FOND_SESSIONS, formatDuree, jourMois, periode } from "@/utils/sessionFormation";
import type { FormationAvecSessions, PageSessionsFormation } from "@/types/sessionFormation";

/* Textes affichés pendant le chargement ou si le serveur ne répond pas */
const PAGE_DEFAUT: PageSessionsFormation = {
  badge: "Formations continues",
  titre: "Sessions de formation",
  sousTitre: "Découvrez les prochaines sessions programmées et inscrivez-vous directement en ligne.",
  image: null,
};

/* =========================================================
   Onglet « Session de formation » :
   uniquement les formations qui ont une session ouverte
========================================================= */
const SessionsFormationPage = () => {
  const [liste, setListe] = useState<FormationAvecSessions[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [recherche, setRecherche] = useState("");
  const [page, setPage] = useState<PageSessionsFormation>(PAGE_DEFAUT);
  const [pageChargee, setPageChargee] = useState(false); // évite d'afficher l'ancien texte une fraction de seconde

  /* 🆕 Image et textes de l'en-tête (modifiés dans le back office) */
  useEffect(() => {
    let actif = true;
    SessionFormationPublicService.page()
      .then((p) => { if (actif) setPage(p); })
      .catch(() => { /* on garde les textes par défaut */ })
      .finally(() => { if (actif) setPageChargee(true); });
    return () => { actif = false; };
  }, []);

  useEffect(() => {
    let actif = true;
    SessionFormationPublicService.formations()
      .then((l) => { if (actif) setListe(l); })
      .catch((e) => { if (actif) setErreur(e instanceof Error ? e.message : "Erreur de chargement"); })
      .finally(() => { if (actif) setLoading(false); });
    return () => { actif = false; };
  }, []);

  /* Triées par prochaine session */
  const visibles = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return liste
      .filter((f) => !q || f.formation.libelle.toLowerCase().includes(q))
      .sort((a, b) => (a.sessions[0]?.dateDebut ?? "").localeCompare(b.sessions[0]?.dateDebut ?? ""));
  }, [liste, recherche]);

  const totalSessions = liste.reduce((n, f) => n + f.sessions.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      {/* ===== En-tête (image + textes modifiables dans le back office) ===== */}
      <section className="relative overflow-hidden bg-gray-900 text-white min-h-[400px] sm:min-h-[480px] lg:min-h-[540px] flex items-center">
        {/* Image choisie dans le back office, sinon l'image par défaut du site */}
        {pageChargee && <img key={page.image ?? "defaut"} src={imageUrl(page.image) ?? IMAGE_FOND_SESSIONS} alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; }} />}
        {/* Voile sombre neutre (pas de bleu) pour que le texte reste lisible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
        <div className={`relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 transition-opacity duration-300 ${pageChargee ? "opacity-100" : "opacity-0"}`}>
          {page.badge && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs sm:text-sm font-semibold">
              <Sparkles size={14} /> {page.badge}
            </span>
          )}
          <h1 className="mt-4 text-4xl sm:text-6xl font-black leading-tight max-w-4xl drop-shadow-lg">{page.titre}</h1>
          {page.sousTitre && (
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-white/90 max-w-2xl whitespace-pre-line">
              {page.sousTitre}
            </p>
          )}

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative w-full sm:w-96">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher une formation"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-gray-900 text-sm sm:text-base shadow-lg focus:outline-none focus:ring-4 focus:ring-white/40" />
            </div>
            {!loading && !erreur && (
              <span className="text-sm text-white/90 font-medium">
                {liste.length} formation{liste.length > 1 ? "s" : ""} · {totalSessions} session{totalSessions > 1 ? "s" : ""} à venir
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ===== Liste ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-44 bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                  <div className="h-10 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {erreur && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-2 max-w-xl mx-auto">
            <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">{erreur}</p>
          </div>
        )}

        {!loading && !erreur && visibles.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-10 sm:p-16 text-center max-w-xl mx-auto">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
              <Inbox className="w-6 h-6 text-gray-300" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-gray-800">
              {liste.length === 0 ? "Aucune session programmée pour le moment" : "Aucune formation trouvée"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {liste.length === 0 ? "Revenez bientôt : de nouvelles sessions sont ajoutées régulièrement." : `Aucun résultat pour « ${recherche} ».`}
            </p>
          </div>
        )}

        {!loading && visibles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {visibles.map(({ formation: f, sessions }) => {
              const prochaine = sessions[0];
              const { jour, mois } = jourMois(prochaine.dateDebut);
              const image = imageFormation(f);
              const duree = formatDuree(f.duree, f.uniteDuree);
              return (
                <Link key={f.id} to={`/sessions-formation/${f.slug}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-44 bg-gradient-to-br from-[#00A4E0]/15 to-[#0077A8]/20 overflow-hidden">
                    {image ? (
                      <img src={image} alt={f.libelle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-[#00A4E0]/50" />
                      </div>
                    )}
                    {/* Date de la prochaine session */}
                    <div className="absolute top-3 left-3 w-14 h-14 rounded-xl bg-white shadow-lg flex flex-col items-center justify-center">
                      <span className="text-lg font-black text-[#0077A8] leading-none">{jour}</span>
                      <span className="text-[10px] font-bold uppercase text-gray-500">{mois}</span>
                    </div>
                    {sessions.length > 1 && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-semibold">
                        {sessions.length} sessions
                      </span>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#0077A8] transition-colors line-clamp-2">{f.libelle}</h2>

                    <div className="mt-3 space-y-1.5 text-sm text-gray-600">
                      <p className="flex items-center gap-2"><CalendarDays size={15} className="text-[#00A4E0] flex-shrink-0" /> {periode(prochaine.dateDebut, prochaine.dateFin)}</p>
                      {(prochaine.lieu || f.lieu) && <p className="flex items-center gap-2"><MapPin size={15} className="text-[#00A4E0] flex-shrink-0" /> <span className="truncate">{prochaine.lieu ?? f.lieu}</span></p>}
                      {prochaine.horaires && <p className="flex items-center gap-2"><Clock size={15} className="text-[#00A4E0] flex-shrink-0" /> <span className="truncate">{prochaine.horaires}</span></p>}
                      {duree && <p className="flex items-center gap-2"><Timer size={15} className="text-[#00A4E0] flex-shrink-0" /> {duree}</p>}
                    </div>

                    <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                      {prochaine.complete ? (
                        <span className="text-xs font-semibold text-red-600">Prochaine session complète</span>
                      ) : prochaine.placesRestantes != null ? (
                        <span className={`text-xs font-semibold ${prochaine.placesRestantes <= 5 ? "text-amber-600" : "text-emerald-600"}`}>
                          {prochaine.placesRestantes} place{prochaine.placesRestantes > 1 ? "s" : ""} restante{prochaine.placesRestantes > 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-600">Inscriptions ouvertes</span>
                      )}
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00A4E0] to-[#0077A8] text-white text-sm font-bold shadow-md group-hover:shadow-lg transition-all">
                        S'inscrire <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default SessionsFormationPage;