"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  fetchFormationsByLevel,
  fetchFormationDetailsBySlug,
} from "@/services/formationService";

import {
  fetchPreinscriptionSession,
  submitPreinscription,
} from "@/services/preinscription.service";


import { Formation } from "@/types/formation";
import { SessionPublique } from "@/types/preinscription";

import {
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  GraduationCap,
  Calendar,
  MessageSquare,
  Send,
  Lock,
  Sparkles,
  ChevronDown,
  Loader2,
  UserCircle,
  ShieldCheck,
} from "lucide-react";

/* ================= TYPES ================= */
type Civilite = "M" | "MME" | "MLLE";
type Niveau = "PREMIERE_ANNEE" | "DEUXIEME_ANNEE" | "TROISIEME_ANNEE";

/* ================= PAGE ================= */
export default function PreinscriptionPage() {

  const { slug } = useParams<{ slug: string }>();

  const [session, setSession] = useState<SessionPublique | null>(null);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [initialized, setInitialized] = useState(false);
  const [autoSelected, setAutoSelected] = useState(false); // ✅ IMPORTANT

  /* ✅ locked quand vient du slug */
  const [typeLocked, setTypeLocked] = useState(false);
  const [formationLocked, setFormationLocked] = useState(false);

  const [form, setForm] = useState({
    civilite: "M" as Civilite,
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    nationalite: "",
    email: "",
    telephone: "",
    whatsapp: "",
    typeFormation: "LICENCE",
    niveauSouhaite: "PREMIERE_ANNEE" as Niveau,
    formationId: "",
  });

  /* ================= LOAD SESSION ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const sessionData = await fetchPreinscriptionSession();
        setSession(sessionData);
      } catch {
        setError("Impossible de charger la session");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* ================= LOAD FORMATIONS ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const [licences, masters] = await Promise.all([
          fetchFormationsByLevel("LICENCE"),
          fetchFormationsByLevel("MASTER"),
        ]);
        setFormations([...licences, ...masters]);
      } catch {
        setError("Erreur chargement formations");
      }
    };
    load();
  }, []);

  /* ================= AUTO SELECT FORMATION ================= */
  useEffect(() => {
    if (!slug) return;

    const loadFormation = async () => {
      try {
        const formation = await fetchFormationDetailsBySlug(slug);

        setForm((prev) => ({
          ...prev,
          formationId: String(formation.id),
          typeFormation: formation.level || "LICENCE",
        }));

        setAutoSelected(true);      // ✅ clé
        setTypeLocked(true);        // ✅ verrouille le type
        setFormationLocked(true);   // ✅ verrouille la formation

      } catch {
        console.error("Formation introuvable");
      }
    };

    loadFormation();
  }, [slug]);

  /* ================= RESET SI TYPE CHANGE ================= */
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      return;
    }

    // ❌ ne reset PAS si vient du slug
    if (autoSelected) {
      setAutoSelected(false);
      return;
    }

    // ✅ reset normal si user change type
    setForm(prev => ({
      ...prev,
      niveauSouhaite: "PREMIERE_ANNEE",
      formationId: "",
    }));

  }, [form.typeFormation]);

  /* ================= HANDLE ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= NIVEAUX ================= */
  const niveaux =
    form.typeFormation === "LICENCE"
      ? [
          { value: "PREMIERE_ANNEE",  label: "1ère année (L1)" },
          { value: "DEUXIEME_ANNEE",  label: "2ème année (L2)" },
          { value: "TROISIEME_ANNEE", label: "3ème année (L3)" },
        ]
      : [
          { value: "PREMIERE_ANNEE", label: "1ère année (M1)" },
          { value: "DEUXIEME_ANNEE", label: "2ème année (M2)" },
        ];

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    setError(null);

    if (
      !form.nom.trim() ||
      !form.prenom.trim() ||
      !form.email.trim() ||
      !form.telephone.trim() ||
      !form.dateNaissance ||
      !form.lieuNaissance.trim() ||
      !form.nationalite.trim() ||
      !form.formationId
    ) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Email invalide");
      return;
    }

    try {
      setSending(true);

      await submitPreinscription({
        civilite: form.civilite,
        nom: form.nom.trim(),
        prenom: form.prenom.trim(),
        dateNaissance: form.dateNaissance,
        lieuNaissance: form.lieuNaissance.trim(),
        nationalite: form.nationalite.trim(),
        email: form.email.trim(),
        telephone: form.telephone.trim(),
        whatsapp: form.whatsapp || undefined,
        niveauSouhaite: form.niveauSouhaite,
        formationId: Number(form.formationId),
      });

      setSuccess(true);

    } catch (e: any) {
      setError(e.message || "Erreur lors de l'envoi");
    } finally {
      setSending(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-full blur-2xl opacity-30 animate-pulse" />
            <Loader2 className="relative w-12 h-12 text-[#00A4E0] animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  /* ================= FERMÉE ================= */
  if (!session?.ouverte) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 text-center max-w-md w-full space-y-5">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                <Lock className="w-10 h-10 text-gray-400" />
              </div>
              <div className="absolute -inset-2 bg-gray-200 rounded-3xl opacity-20 blur-2xl" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">Préinscriptions fermées</h2>
            <p className="text-gray-500 text-sm">La période de préinscription n'est pas encore ouverte ou est terminée.</p>
          </div>
        </div>
      </div>
    );
  }

  /* ================= SUCCESS ================= */
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 text-center max-w-md w-full space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-40 animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">Demande envoyée !</h2>
            <p className="text-gray-500 text-sm">Votre préinscription a bien été reçue. Nous vous contacterons rapidement.</p>
          </div>
        </div>
      </div>
    );
  }

  /* ================= helpers ================= */
  const inputCls = (locked = false) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all bg-white
     ${locked
       ? "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
       : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/30 focus:border-[#00A4E0]"
     }`;

  const selectCls = (locked = false) =>
    `w-full pl-10 pr-10 py-3 rounded-xl border text-sm transition-all bg-white appearance-none
     ${locked
       ? "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"
       : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/30 focus:border-[#00A4E0]"
     }`;

  const iconCls = "absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none";

  const formationName = formations.find(f => String(f.id) === form.formationId)?.title;

  /* ================= FORM ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ===== HEADER ===== */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8] rounded-3xl opacity-5 blur-3xl" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-xl text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Préinscription {session.anneeUniversitaire}
              </h1>
              <p className="text-gray-500 text-sm mt-2 flex items-center justify-center gap-1.5">
                <Sparkles size={13} className="text-[#00A4E0]" />
                Remplissez le formulaire pour soumettre votre demande
              </p>
            </div>
          </div>
        </div>

        {/* ===== SECTION : FORMATION ===== */}
        <Section title="Formation souhaitée" icon={<GraduationCap size={16} className="text-white" />} color="from-[#00A4E0] to-[#0077A8]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            {/* Type */}
            <div className="relative group">
              <GraduationCap size={15} className={`${iconCls} ${typeLocked ? "text-gray-300" : "text-gray-400 group-focus-within:text-[#00A4E0] transition-colors"}`} />
              <ChevronDown size={14} className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${typeLocked ? "text-gray-300" : "text-gray-400"}`} />
              <select name="typeFormation" value={form.typeFormation} onChange={handleChange}
                disabled={typeLocked} className={selectCls(typeLocked)}>
                <option value="LICENCE">Licence</option>
                <option value="MASTER">Master</option>
              </select>
              {typeLocked && <Lock size={11} className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />}
            </div>

            {/* Niveau */}
            <div className="relative group">
              <GraduationCap size={15} className={`${iconCls} text-gray-400 group-focus-within:text-[#00A4E0] transition-colors`} />
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              <select name="niveauSouhaite" value={form.niveauSouhaite} onChange={handleChange} className={selectCls()}>
                {niveaux.map(n => (
                  <option key={n.value} value={n.value}>{n.label}</option>
                ))}
              </select>
            </div>

            {/* Formation */}
            <div className="relative group">
              <GraduationCap size={15} className={`${iconCls} ${formationLocked ? "text-gray-300" : "text-gray-400 group-focus-within:text-[#00A4E0] transition-colors"}`} />
              <ChevronDown size={14} className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${formationLocked ? "text-gray-300" : "text-gray-400"}`} />
              <select name="formationId" value={form.formationId} onChange={handleChange}
                disabled={formationLocked} className={selectCls(formationLocked)}>
                <option value="">Choisir une formation</option>
                {formations.filter(f => f.level === form.typeFormation).map(f => (
                  <option key={f.id} value={f.id}>{f.title}</option>
                ))}
              </select>
              {formationLocked && <Lock size={11} className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />}
            </div>

          </div>

          {/* Badge formation pré-sélectionnée */}
          {formationLocked && formationName && (
            <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <ShieldCheck size={15} className="text-[#00A4E0] flex-shrink-0" />
              <p className="text-sm text-[#0077A8] font-medium">
                Formation pré-sélectionnée : <span className="font-bold">{formationName}</span>
              </p>
            </div>
          )}
        </Section>

        {/* ===== SECTION : IDENTITÉ ===== */}
        <Section title="Identité" icon={<UserCircle size={16} className="text-white" />} color="from-purple-500 to-indigo-600">

          {/* Civilité */}
          <div className="relative group">
            <User size={15} className={`${iconCls} text-gray-400 group-focus-within:text-[#00A4E0] transition-colors`} />
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            <select name="civilite" value={form.civilite} onChange={handleChange} className={selectCls()}>
              <option value="M">Monsieur</option>
              <option value="MME">Madame</option>
              <option value="MLLE">Mademoiselle</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field icon={<User size={15} />} name="nom" placeholder="Nom *" onChange={handleChange} />
            <Field icon={<User size={15} />} name="prenom" placeholder="Prénom *" onChange={handleChange} />
            <Field
  icon={<Calendar size={15} />}
  name="dateNaissance"
  type="date"
  placeholder="Date de naissance *"
  onChange={handleChange}
/>
            <Field icon={<MapPin size={15} />} name="lieuNaissance" placeholder="Lieu de naissance *" onChange={handleChange} />
            <Field icon={<Globe size={15} />} name="nationalite" placeholder="Nationalité *" onChange={handleChange} className="sm:col-span-2" />
          </div>
        </Section>

        {/* ===== SECTION : CONTACT ===== */}
        <Section title="Contact" icon={<Mail size={16} className="text-white" />} color="from-orange-400 to-amber-500">
          <Field icon={<Mail size={15} />} name="email" type="email" placeholder="Adresse email *" onChange={handleChange} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field icon={<Phone size={15} />} name="telephone" placeholder="Téléphone *" onChange={handleChange} />
            <Field icon={<MessageSquare size={15} />} name="whatsapp" placeholder="WhatsApp (optionnel)" onChange={handleChange} />
          </div>
        </Section>

        {/* ERROR */}
        {error && (
          <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={sending}
          className="group relative w-full py-4 rounded-xl text-white font-bold text-sm overflow-hidden
                     hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-blue-200
                     disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0077A8] to-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center justify-center gap-2">
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send size={16} />
                Envoyer la demande de préinscription
              </>
            )}
          </span>
        </button>

        <p className="text-center text-xs text-gray-400">* Champs obligatoires</p>

      </div>
    </div>
  );
}

/* ================= SECTION ================= */
function Section({ title, icon, color, children }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-lg overflow-hidden">
      {/* Header section */}
      <div className="relative px-6 py-4 flex items-center gap-3">
        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-[0.07]`} />
        <div className={`relative w-8 h-8 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center shadow-sm`}>
          {icon}
        </div>
        <h2 className="relative font-bold text-gray-800 text-sm uppercase tracking-wider">{title}</h2>
      </div>
      <div className="px-6 pb-6 pt-2 space-y-3">{children}</div>
    </div>
  );
}

/* ================= FIELD ================= */
function Field({ icon, name, placeholder, onChange, type = "text", className = "", label }: any) {
  return (
    <div className={`relative group ${className}`}>
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors pointer-events-none">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                   focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/30 focus:border-[#00A4E0]
                   text-sm transition-all bg-white"
      />
      {label && !placeholder && (
        <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">{label}</span>
      )}
    </div>
  );
}