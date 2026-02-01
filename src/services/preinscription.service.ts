import type { FormationPreinscriptionRequest } from "@/types/preinscription";

const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Envoi d'une demande de préinscription
 * Endpoint public (pas de token)
 */
export async function sendPreinscription(
  data: FormationPreinscriptionRequest
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/public/preinscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Erreur lors de la préinscription");
  }
}
