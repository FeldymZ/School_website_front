import { useState } from "react";

import type {
  Civilite,
  NiveauSouhaite,
  PreinscriptionRequest,
} from "@/types/preinscription";

type FormState = {

  /* ================= IDENTITE ================= */

  civilite: Civilite;

  nom: string;
  prenom: string;

  dateNaissance: string;
  lieuNaissance: string;

  nationalite: string;

  /* ================= CONTACT ================= */

  email: string;

  telephone: string;

  whatsapp: string;

  /* ================= FORMATION ================= */

  formationId: string;

  niveauSouhaite: NiveauSouhaite;

  /* ================= DIPLOME ================= */

  diplome: string;

  anneeObtention: string;

  etablissementProvenance: string;
};

/* ================= LISTES (mêmes valeurs que le backend) ================= */

const CIVILITES: { value: Civilite; label: string }[] = [
  { value: "M", label: "Monsieur" },
  { value: "MME", label: "Madame" },
  { value: "MLLE", label: "Mademoiselle" },
];

const NIVEAUX: { value: NiveauSouhaite; label: string }[] = [
  { value: "PREMIERE_ANNEE", label: "1ère année" },
  { value: "DEUXIEME_ANNEE", label: "2e année" },
  { value: "TROISIEME_ANNEE", label: "3e année" },
];

/* Champs texte (tous les champs de FormState sauf les 2 listes) */
type ChampTexte = Exclude<keyof FormState, "civilite" | "niveauSouhaite">;

const CHAMPS: { name: ChampTexte; label: string; type?: string }[] = [
  { name: "nom", label: "Nom" },
  { name: "prenom", label: "Prénom" },
  { name: "dateNaissance", label: "Date de naissance", type: "date" },
  { name: "lieuNaissance", label: "Lieu de naissance" },
  { name: "nationalite", label: "Nationalité" },
  { name: "email", label: "Email", type: "email" },
  { name: "telephone", label: "Téléphone", type: "tel" },
  { name: "whatsapp", label: "WhatsApp", type: "tel" },
  { name: "formationId", label: "Formation (id)", type: "number" },
  { name: "diplome", label: "Diplôme" },
  { name: "anneeObtention", label: "Année d'obtention", type: "number" },
  { name: "etablissementProvenance", label: "Établissement de provenance" },
];

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-normal bg-white " +
  "focus:outline-none focus:ring-2 focus:ring-[#00A4E0] focus:border-transparent";

export default function Example() {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({

    /* ================= IDENTITE ================= */

    civilite: "M",

    nom: "",
    prenom: "",

    dateNaissance: "",
    lieuNaissance: "",

    nationalite: "",

    /* ================= CONTACT ================= */

    email: "",

    telephone: "",

    whatsapp: "",

    /* ================= FORMATION ================= */

    formationId: "",

    niveauSouhaite: "PREMIERE_ANNEE",

    /* ================= DIPLOME ================= */

    diplome: "",

    anneeObtention: "",

    etablissementProvenance: "",
  });

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload: PreinscriptionRequest = {

        civilite: form.civilite,

        nom: form.nom.trim(),
        prenom: form.prenom.trim(),

        dateNaissance: form.dateNaissance,

        lieuNaissance: form.lieuNaissance.trim(),

        nationalite: form.nationalite.trim(),

        email: form.email.trim(),

        telephone: form.telephone.trim(),

        whatsapp:
          form.whatsapp.trim() || undefined,

        niveauSouhaite:
          form.niveauSouhaite,

        formationId:
          Number(form.formationId),

        /* ================= DIPLOME ================= */

        diplomePresente:
          form.diplome.trim(),

        statutDiplome:
          form.anneeObtention
            ? "OBTENU"
            : "EN_COURS",

        anneeObtention:
          form.anneeObtention
            ? Number(form.anneeObtention)
            : undefined,

        etablissementProvenance:
          form.etablissementProvenance.trim(),
      };

      console.log(payload);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  /* ================= UI ================= */

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Civilité */}
        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          <span>Civilité</span>
          <select name="civilite" value={form.civilite} onChange={handleChange} className={inputClass}>
            {CIVILITES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>

        {/* Niveau souhaité */}
        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          <span>Niveau souhaité</span>
          <select name="niveauSouhaite" value={form.niveauSouhaite} onChange={handleChange} className={inputClass}>
            {NIVEAUX.map((n) => (
              <option key={n.value} value={n.value}>{n.label}</option>
            ))}
          </select>
        </label>

        {/* Champs texte */}
        {CHAMPS.map((c) => (
          <label key={c.name} className="space-y-1.5 text-sm font-semibold text-gray-700">
            <span>{c.label}</span>
            <input
              name={c.name}
              type={c.type ?? "text"}
              value={form[c.name]}
              onChange={handleChange}
              className={inputClass}
            />
          </label>
        ))}

      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full min-h-[48px] rounded-xl font-bold text-white
                   bg-gradient-to-r from-[#00A4E0] to-[#0077A8]
                   disabled:opacity-50 transition-all"
      >
        {loading ? "Envoi en cours..." : "Envoyer"}
      </button>

    </form>
  );
}