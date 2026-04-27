import { SessionPublique } from "@/types/preinscription";

const API_BASE_URL = "https://api-test.esiitech-gabon.com";

/* ================= ENUMS (SYNC BACKEND) ================= */
export type Civilite = "M" | "MME" | "MLLE";

export type NiveauSouhaite =
  | "PREMIERE_ANNEE"
  | "DEUXIEME_ANNEE"
  | "TROISIEME_ANNEE";

/* ================= SESSION ACTIVE ================= */
export async function fetchPreinscriptionSession(
  options?: { signal?: AbortSignal }
): Promise<SessionPublique> {

  const res = await fetch(
    `${API_BASE_URL}/api/public/preinscriptions/session-active`,
    { signal: options?.signal }
  );

  if (!res.ok) {
    throw new Error("Erreur lors du chargement de la session");
  }

  const data = await res.json();

  return {
    ouverte: data.ouverte,
    anneeUniversitaire: data.anneeUniversitaire,
    dateDebut: data.dateDebut,
    dateFin: data.dateFin,
  };
}

/* ================= SUBMIT ================= */
export async function submitPreinscription(
  payload: {
    civilite: Civilite;
    nom: string;
    prenom: string;
    dateNaissance: string;
    lieuNaissance: string;
    nationalite: string;
    email: string;
    telephone: string;
    whatsapp?: string;
    niveauSouhaite: NiveauSouhaite;
    formationId: number;
  }
): Promise<void> {

  const res = await fetch(
    `${API_BASE_URL}/api/public/preinscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {

    // ✅ gestion intelligente erreur backend
    let message = "Erreur lors de la préinscription";

    try {
      const data = await res.json();
      message = data.message || message;
    } catch {
      const text = await res.text();
      if (text) message = text;
    }

    throw new Error(message);
  }
}