import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, CalendarDays, MapPin, Clock, Users, CheckCircle2, AlertCircle, Timer, Award, BookOpen, ClipboardEdit, Banknote,
  Target, Sparkles, ArrowRight, X,
} from "lucide-react";

import { SessionFormationPublicService, imageFormation, imageUrl } from "@/services/sessionFormation.service";
import { IMAGE_FOND_SESSIONS, formatDuree, formatPrix, jourMois, nbJours, periode } from "@/utils/sessionFormation";
import type { FormationAvecSessions, PageSessionsFormation } from "@/types/sessionFormation";
import InscriptionSessionForm from "@/components/sessions/InscriptionSessionForm";
import HTMLContent from "@/components/common/HTMLContent"; // ⚠️ chemin de votre composant HTMLContent

/* =========================================================
   Une formation + ses sessions + le formulaire d'inscription
   Route : /sessions-formation/:slug
========================================================= */
const SessionFormationDetailPage = () => {
  const { slug = "" } = useParams();
  const [data, setData] = useState<FormationAvecSessions | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [choixId, setChoixId] = useState<number | null>(null);
  const [page, setPage] = useState<PageSessionsFormation | null>(null);
  const [formOuvert, setFormOuvert] = useState(false); // 🆕 formulaire caché jusqu'au clic
  const [demandeScroll, setDemandeScroll] = useState(0); // +1 à chaque clic sur « Voulez-vous participer ? »
  const formRef = useRef<HTMLDivElement>(null);

  /* Ouvre le formulaire ; l'effet ci-dessous descend jusqu'à lui une fois affiché */
  const ouvrirFormulaire = () => {
    setFormOuvert(true);
    setDemandeScroll((n) => n + 1);
  };

  /* 🆕 Descente jusqu'au formulaire (après son affichage), en tenant compte du menu collé en haut */
  useEffect(() => {
    if (demandeScroll === 0) return;
    const id = window.requestAnimationFrame(() => {
      const el = formRef.current;
      if (!el) return;
      const menu = document.querySelector("nav");
      const hauteurMenu = menu ? menu.getBoundingClientRect().height : 0;
      const y = el.getBoundingClientRect().top + window.scrollY - hauteurMenu - 16;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      /* Curseur dans le premier champ, sans re-sauter */
      el.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, [demandeScroll]);

  /* 🆕 Image d'arrière-plan choisie dans le back office (si la formation n'a pas d'image) */
  useEffect(() => {
    let actif = true;
    SessionFormationPublicService.page()
      .then((p) => { if (actif) setPage(p); })
      .catch(() => { /* image par défaut */ });
    return () => { actif = false; };
  }, []);

  useEffect(() => {
    let actif = true;
    SessionFormationPublicService.formation(slug)
      .then((d) => { if (actif) setData(d); })
      .catch((e) => { if (actif) setErreur(e instanceof Error ? e.message : "Erreur de chargement"); });
    return () => { actif = false; };
  }, [slug]);

  /* Session choisie : celle cliquée, sinon la première qui n'est pas complète (calculée, pas de state) */
  const sessionChoisie =
    data?.sessions.find((s) => s.id === choixId) ??
    data?.sessions.find((s) => !s.complete) ??
    data?.sessions[0] ?? null;

  /* ================= ERREUR ================= */
  if (erreur) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center max-w-md">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h1 className="text-lg font-bold text-gray-900">{erreur}</h1>
          <p className="mt-1 text-sm text-gray-500">Les inscriptions sont peut-être closes pour cette formation.</p>
          <Link to="/sessions-formation" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00A4E0] hover:underline">
            <ArrowLeft size={16} /> Voir toutes les sessions
          </Link>
        </div>
      </div>
    );
  }

  /* ================= CHARGEMENT ================= */
  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="inline-flex items-center gap-3 text-[#00A4E0]">
          <div className="w-6 h-6 border-2 border-[#00A4E0] border-t-transparent rounded-full animate-spin" />
          <span className="font-semibold">Chargement...</span>
        </div>
      </div>
    );
  }

  const { formation: f, sessions } = data;
  const image = imageFormation(f);
  const duree = formatDuree(f.duree, f.uniteDuree);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      {/* ===== En-tête ===== */}
      <section className="relative overflow-hidden bg-gray-900 text-white min-h-[360px] sm:min-h-[440px] lg:min-h-[300px] flex items-center">
        {/* Image de la formation, sinon celle du back office, sinon l'image par défaut */}
        <img key={image ?? page?.image ?? "defaut"} src={image ?? imageUrl(page?.image) ?? IMAGE_FOND_SESSIONS} alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; }} />
        {/* Voile sombre neutre (pas de bleu) pour que le texte reste lisible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <Link to="/sessions-formation" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white">
            <ArrowLeft size={16} /> Sessions de formation
          </Link>
          <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black leading-tight max-w-4xl drop-shadow-lg">{f.libelle}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {duree && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-xs sm:text-sm font-semibold"><Timer size={14} /> {duree}</span>}
            {f.titreDelivre && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-xs sm:text-sm font-semibold"><Award size={14} /> {f.titreDelivre}</span>}
            {f.afficherPrix !== false && f.prix ? <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-xs sm:text-sm font-semibold"><Banknote size={14} /> {formatPrix(f.prix)}</span> : null}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-xs sm:text-sm font-semibold"><CalendarDays size={14} /> {sessions.length} session{sessions.length > 1 ? "s" : ""}</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
        {/* ===== Colonne gauche : présentation de la formation (HTML) ===== */}
        <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
          {f.description || f.objectifs || f.competences ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-8 space-y-8">
              {f.description && (
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2 mb-3">
                    <BookOpen size={20} className="text-[#00A4E0]" /> À propos de la formation
                  </h2>
                  <HTMLContent html={f.description} />
                </div>
              )}
              {f.objectifs && (
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2 mb-3">
                    <Target size={20} className="text-[#00A4E0]" /> Objectifs
                  </h2>
                  <HTMLContent html={f.objectifs} />
                </div>
              )}
              {f.competences && (
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2 mb-3">
                    <Sparkles size={20} className="text-[#00A4E0]" /> Compétences visées
                  </h2>
                  <HTMLContent html={f.competences} />
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center text-sm text-gray-500">
              Le programme détaillé de cette formation sera bientôt disponible.
            </div>
          )}
        </div>

        {/* ===== Colonne droite : sessions + bouton « Voulez-vous participer ? » ===== */}
        <div className="lg:col-span-2 order-1 lg:order-2 lg:sticky lg:top-28">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <CalendarDays size={18} className="text-[#00A4E0]" /> {sessions.length > 1 ? "Choisissez votre session" : "Session programmée"}
            </h2>

            <div className="mt-4 space-y-3">
              {sessions.map((s) => {
                const actif = sessionChoisie?.id === s.id;
                const { jour, mois } = jourMois(s.dateDebut);
                return (
                  <button key={s.id} type="button" disabled={s.complete} onClick={() => setChoixId(s.id)} aria-pressed={actif}
                    className={`w-full text-left p-3.5 rounded-xl border-2 flex items-start gap-3 transition-all ${
                      s.complete ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                        : actif ? "border-[#00A4E0] bg-[#00A4E0]/5 shadow-md"
                        : "border-gray-200 hover:border-[#00A4E0]/50"
                    }`}>
                    <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${
                      actif ? "bg-gradient-to-br from-[#00A4E0] to-[#0077A8] text-white" : "bg-gray-100 text-gray-700"
                    }`}>
                      <span className="text-base font-black leading-none">{jour}</span>
                      <span className="text-[10px] font-bold uppercase">{mois}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900">{periode(s.dateDebut, s.dateFin)}</p>
                      <p className="text-xs text-gray-500">{nbJours(s.dateDebut, s.dateFin)} jour{nbJours(s.dateDebut, s.dateFin) > 1 ? "s" : ""}</p>
                      <div className="mt-1.5 space-y-0.5 text-xs text-gray-600">
                        {(s.lieu || f.lieu) && <p className="flex items-center gap-1.5"><MapPin size={12} className="text-[#00A4E0]" /> {s.lieu ?? f.lieu}</p>}
                        {s.horaires && <p className="flex items-center gap-1.5"><Clock size={12} className="text-[#00A4E0]" /> {s.horaires}</p>}
                        <p className="flex items-center gap-1.5">
                          <Users size={12} className="text-[#00A4E0]" />
                          {s.complete ? <span className="font-semibold text-red-600">Complète</span>
                            : s.placesRestantes != null ? <span className={s.placesRestantes <= 5 ? "font-semibold text-amber-600" : ""}>{s.placesRestantes} place{s.placesRestantes > 1 ? "s" : ""} restante{s.placesRestantes > 1 ? "s" : ""}</span>
                            : "Places disponibles"}
                        </p>
                      </div>
                    </div>
                    {actif && <CheckCircle2 size={20} className="text-[#00A4E0] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* 🆕 Bouton qui affiche le formulaire */}
            {sessionChoisie && !sessionChoisie.complete ? (
              <button type="button" onClick={ouvrirFormulaire}
                className="group mt-5 w-full min-h-[56px] px-6 py-4 rounded-xl font-bold text-white text-base
                           bg-gradient-to-r from-[#00A4E0] to-[#0077A8] shadow-lg shadow-[#00A4E0]/30
                           hover:shadow-xl hover:shadow-[#00A4E0]/40 active:scale-[0.98] transition-all
                           flex items-center justify-center gap-2">
                Voulez-vous participer ?
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <p className="text-sm font-bold text-amber-800">Toutes les sessions sont complètes</p>
                <p className="mt-0.5 text-xs text-amber-700">De nouvelles sessions seront bientôt programmées.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== Formulaire d'inscription : affiché seulement après le clic ===== */}
      {formOuvert && sessionChoisie && !sessionChoisie.complete && (
        <section ref={formRef} id="inscription" className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="relative px-4 sm:px-8 py-5 border-b border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8] opacity-10" />
              <div className="relative flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00A4E0] to-[#0077A8] flex items-center justify-center shadow-lg flex-shrink-0">
                  <ClipboardEdit className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-black text-gray-900">Inscription</h2>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {f.libelle} — {periode(sessionChoisie.dateDebut, sessionChoisie.dateFin).toLowerCase()}
                  </p>
                </div>
                <button type="button" onClick={() => setFormOuvert(false)} aria-label="Fermer le formulaire" title="Fermer"
                  className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors flex-shrink-0">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-8">
              <InscriptionSessionForm key={sessionChoisie.id} session={sessionChoisie} formationLibelle={f.libelle} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SessionFormationDetailPage;