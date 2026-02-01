import { useState } from "react";
import { sendPreinscription } from "@/services/preinscription.service";
import type { FormationPreinscriptionRequest } from "@/types/preinscription";

type FormState = {
  nom: string;
  prenom: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: string;
  nationalite: string;
  adresse: string;
  telephone: string;
  email: string;
  situationFamiliale: string;

  nomEtablissement: string;
  typeEtablissement: string;
  serieBaccalaureat: string;
  anneeObtention: string;

  formationId: string;
  niveau: string;
  niveauEtude: string;

  statutEtudiant: string;
  modeFinancement: string;
  autreFinancement: string;

  profession: string;
};

const initialFormState: FormState = {
  nom: "",
  prenom: "",
  dateNaissance: "",
  lieuNaissance: "",
  sexe: "",
  nationalite: "",
  adresse: "",
  telephone: "",
  email: "",
  situationFamiliale: "",

  nomEtablissement: "",
  typeEtablissement: "",
  serieBaccalaureat: "",
  anneeObtention: "",

  formationId: "",
  niveau: "",
  niveauEtude: "",

  statutEtudiant: "",
  modeFinancement: "",
  autreFinancement: "",

  profession: "",
};

export default function PreinscriptionForm() {
  /* =========================
     STATE
     ========================= */

  const [form, setForm] = useState<FormState>(initialFormState);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     HANDLERS
     ========================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     SUBMIT
     ========================= */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const payload: FormationPreinscriptionRequest = {
      nom: form.nom,
      prenom: form.prenom,
      dateNaissance: form.dateNaissance,
      lieuNaissance: form.lieuNaissance,
      sexe: form.sexe as FormationPreinscriptionRequest["sexe"],
      nationalite: form.nationalite,
      adresse: form.adresse,
      telephone: form.telephone,
      email: form.email,
      situationFamiliale:
        form.situationFamiliale as FormationPreinscriptionRequest["situationFamiliale"],

      nomEtablissement: form.nomEtablissement,
      typeEtablissement:
        form.typeEtablissement as FormationPreinscriptionRequest["typeEtablissement"],
      serieBaccalaureat:
        form.serieBaccalaureat as FormationPreinscriptionRequest["serieBaccalaureat"],
      anneeObtention: Number(form.anneeObtention),

      formationId: Number(form.formationId),
      niveau: form.niveau as FormationPreinscriptionRequest["niveau"],
      niveauEtude: Number(form.niveauEtude),

      statutEtudiant:
        form.statutEtudiant as FormationPreinscriptionRequest["statutEtudiant"],
      modeFinancement:
        form.modeFinancement as FormationPreinscriptionRequest["modeFinancement"],
      autreFinancement: form.autreFinancement || undefined,

      profession: form.profession,
    };

    try {
      await sendPreinscription(payload);
      setSuccess("Votre préinscription a été envoyée avec succès.");
      setForm(initialFormState);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur lors de l’envoi de la préinscription");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     RENDER
     ========================= */

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Formulaire de préinscription
      </h1>

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* =========================
            INFOS PERSONNELLES
           ========================= */}
        <section className="space-y-4">
          <h2 className="font-semibold text-lg">Informations personnelles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" className="input" required />
            <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" className="input" required />
            <input type="date" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} className="input" required />
            <input name="lieuNaissance" value={form.lieuNaissance} onChange={handleChange} placeholder="Lieu de naissance" className="input" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="sexe" value={form.sexe} onChange={handleChange} className="input" required>
              <option value="">Sexe</option>
              <option value="MASCULIN">Masculin</option>
              <option value="FEMININ">Féminin</option>
            </select>

            <select name="situationFamiliale" value={form.situationFamiliale} onChange={handleChange} className="input" required>
              <option value="">Situation familiale</option>
              <option value="CELIBATAIRE_SANS_ENFANT">Célibataire sans enfant</option>
              <option value="CELIBATAIRE_AVEC_ENFANT">Célibataire avec enfant</option>
              <option value="COUPLE_SANS_ENFANT">Couple sans enfant</option>
              <option value="COUPLE_AVEC_ENFANT">Couple avec enfant</option>
            </select>
          </div>
        </section>

        {/* =========================
            CONTACT
           ========================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="Téléphone" className="input" required />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" required />
        </section>

        {/* =========================
            FORMATION
           ========================= */}
        <section className="space-y-4">
          <h2 className="font-semibold text-lg">Formation souhaitée</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="formationId" value={form.formationId} onChange={handleChange} placeholder="ID formation" className="input" required />
            <select name="niveau" value={form.niveau} onChange={handleChange} className="input" required>
              <option value="">Niveau</option>
              <option value="LICENCE">Licence</option>
              <option value="MASTER">Master</option>
            </select>
            <input name="niveauEtude" value={form.niveauEtude} onChange={handleChange} placeholder="Niveau d’étude" className="input" required />
          </div>
        </section>

        {/* =========================
            SUBMIT
           ========================= */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Envoyer la préinscription"}
        </button>
      </form>
    </div>
  );
}
