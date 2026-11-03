import { useState } from "react";
import {
  User, Mail, Phone, MapPin, CalendarDays, Briefcase, Loader2, Send, CheckCircle2, AlertCircle, Users,
} from "lucide-react";

import { SessionFormationPublicService } from "@/services/sessionFormation.service";
import { periode } from "@/utils/sessionFormation";
import type { InscriptionSessionPayload, SessionPublic } from "@/types/sessionFormation";

/* =========================================================
   Formulaire d'inscription à une session
   (remplace la demande de devis pour les sessions)
========================================================= */

type FormState = {
  nom: string;
  prenom: string;
  sexe: "M" | "F" | "";
  dateNaissance: string;
  lieuNaissance: string;
  email: string;
  telephone: string;
  lieuResidence: string;
  enActivite: "oui" | "non" | "";
  profession: string;
};

const VIDE: FormState = {
  nom: "", prenom: "", sexe: "", dateNaissance: "", lieuNaissance: "",
  email: "", telephone: "", lieuResidence: "", enActivite: "", profession: "",
};

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base bg-white " +
  "focus:outline-none focus:ring-2 focus:ring-[#00A4E0] focus:border-transparent transition-all hover:border-gray-300";

const labelClass = "flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700";

const Champ = ({ label, icon: Icon, requis = true, children }: {
  label: string; icon: React.ElementType; requis?: boolean; children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className={labelClass}>
      <Icon size={14} className="text-[#00A4E0] flex-shrink-0" /> {label}
      {requis && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

/* Bouton radio en forme de pastille */
const Choix = ({ actif, onClick, children }: { actif: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" onClick={onClick} aria-pressed={actif}
    className={`flex-1 min-h-[48px] px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
      actif ? "border-[#00A4E0] bg-[#00A4E0]/10 text-[#0077A8]" : "border-gray-200 text-gray-600 hover:border-gray-300"
    }`}>
    {children}
  </button>
);

interface Props {
  session: SessionPublic;
  formationLibelle: string;
}

const InscriptionSessionForm = ({ session, formationLibelle }: Props) => {
  const [form, setForm] = useState<FormState>(VIDE);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoye, setEnvoye] = useState<string | null>(null); // email de confirmation

  const maj = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const valider = (): string | null => {
    if (!form.nom.trim() || !form.prenom.trim()) return "Indiquez votre nom et votre prénom.";
    if (!form.sexe) return "Indiquez votre sexe.";
    if (!form.dateNaissance) return "Indiquez votre date de naissance.";
    if (!form.lieuNaissance.trim()) return "Indiquez votre lieu de naissance.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) return "Adresse email invalide.";
    if (form.telephone.replace(/\D/g, "").length < 8) return "Numéro de téléphone invalide.";
    if (!form.lieuResidence.trim()) return "Indiquez votre lieu de résidence.";
    if (!form.enActivite) return "Indiquez si vous êtes en activité.";
    if (form.enActivite === "oui" && !form.profession.trim()) return "Indiquez votre profession.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = valider();
    if (msg) return setErreur(msg);

    const payload: InscriptionSessionPayload = {
      nom: form.nom.trim(),
      prenom: form.prenom.trim(),
      sexe: form.sexe as "M" | "F",
      dateNaissance: form.dateNaissance,
      lieuNaissance: form.lieuNaissance.trim(),
      email: form.email.trim(),
      telephone: form.telephone.trim(),
      lieuResidence: form.lieuResidence.trim(),
      enActivite: form.enActivite === "oui",
      profession: form.enActivite === "oui" ? form.profession.trim() : null,
    };

    try {
      setEnvoi(true);
      setErreur(null);
      await SessionFormationPublicService.inscrire(session.id, payload);
      setEnvoye(payload.email);
      setForm(VIDE);
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "L'inscription n'a pas pu être envoyée");
    } finally {
      setEnvoi(false);
    }
  };

  /* Date de naissance : au moins 10 ans */
  const maxNaissance = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 10);
    return d.toISOString().slice(0, 10);
  })();

  /* ================= SUCCÈS ================= */
  if (envoye) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-emerald-500" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-gray-900">Inscription envoyée !</h3>
        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          Merci pour votre inscription à <strong>{formationLibelle}</strong> ({periode(session.dateDebut, session.dateFin).toLowerCase()}).
          Un mail de confirmation a été envoyé à <strong>{envoye}</strong>. Notre équipe vous recontactera pour confirmer votre participation.
        </p>
        <button type="button" onClick={() => setEnvoye(null)}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-700 hover:border-[#00A4E0] hover:text-[#00A4E0] transition-all">
          <Users size={16} /> Inscrire une autre personne
        </button>
      </div>
    );
  }

  /* ================= FORMULAIRE ================= */
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Identité */}
      <fieldset className="space-y-4">
        <legend className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Identité</legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Champ label="Nom" icon={User}>
            <input name="nom" value={form.nom} onChange={handleChange} autoComplete="family-name" maxLength={100} placeholder="MBA" className={inputClass} />
          </Champ>
          <Champ label="Prénom" icon={User}>
            <input name="prenom" value={form.prenom} onChange={handleChange} autoComplete="given-name" maxLength={100} placeholder="Kevin" className={inputClass} />
          </Champ>
        </div>

        <Champ label="Sexe" icon={User}>
          <div className="flex gap-3">
            <Choix actif={form.sexe === "M"} onClick={() => maj("sexe", "M")}>Homme</Choix>
            <Choix actif={form.sexe === "F"} onClick={() => maj("sexe", "F")}>Femme</Choix>
          </div>
        </Champ>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Champ label="Date de naissance" icon={CalendarDays}>
            <input type="date" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} max={maxNaissance} className={inputClass} />
          </Champ>
          <Champ label="Lieu de naissance" icon={MapPin}>
            <input name="lieuNaissance" value={form.lieuNaissance} onChange={handleChange} maxLength={120} placeholder="Libreville" className={inputClass} />
          </Champ>
        </div>
      </fieldset>

      {/* Contact */}
      <fieldset className="space-y-4">
        <legend className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Contact</legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Champ label="Email" icon={Mail}>
            <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" maxLength={150} placeholder="vous@exemple.com" className={inputClass} />
          </Champ>
          <Champ label="Téléphone" icon={Phone}>
            <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} autoComplete="tel" maxLength={30} placeholder="+241 77 00 00 00" className={inputClass} />
          </Champ>
        </div>

        <Champ label="Lieu de résidence" icon={MapPin}>
          <input name="lieuResidence" value={form.lieuResidence} onChange={handleChange} maxLength={150} placeholder="Libreville, Akanda" className={inputClass} />
        </Champ>
      </fieldset>

      {/* Situation */}
      <fieldset className="space-y-4">
        <legend className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Situation professionnelle</legend>

        <Champ label="Êtes-vous en activité ?" icon={Briefcase}>
          <div className="flex gap-3">
            <Choix actif={form.enActivite === "oui"} onClick={() => maj("enActivite", "oui")}>Oui</Choix>
            <Choix actif={form.enActivite === "non"} onClick={() => maj("enActivite", "non")}>Non</Choix>
          </div>
        </Champ>

        {form.enActivite === "oui" && (
          <Champ label="Profession" icon={Briefcase}>
            <input name="profession" value={form.profession} onChange={handleChange} maxLength={150} placeholder="Ex. : Comptable, Ingénieur réseau…" className={inputClass} autoFocus />
          </Champ>
        )}
      </fieldset>

      {erreur && (
        <div className="p-3.5 sm:p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-2" role="alert">
          <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-red-700 font-medium">{erreur}</p>
        </div>
      )}

      <button type="submit" disabled={envoi || session.complete}
        className="w-full min-h-[52px] px-6 py-3.5 rounded-xl font-bold text-white text-sm sm:text-base
                   bg-gradient-to-r from-[#00A4E0] to-[#0077A8] shadow-lg shadow-[#00A4E0]/30
                   hover:shadow-xl hover:shadow-[#00A4E0]/40 active:scale-[0.98]
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
        {envoi ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</> : <><Send size={18} /> Envoyer mon inscription</>}
      </button>

      <p className="text-[11px] sm:text-xs text-gray-400 text-center">
        Les champs marqués <span className="text-red-500">*</span> sont obligatoires. Vos informations servent uniquement à traiter votre inscription.
      </p>
    </form>
  );
};

export default InscriptionSessionForm;