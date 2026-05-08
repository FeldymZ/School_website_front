import { useState } from "react";

import {
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

  const handleSubmit = async () => {

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

    } catch (e) {

      console.error(e);

    } finally {

      setLoading(false);

    }
  };

  return null;
}