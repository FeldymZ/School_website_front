import { SessionPublique, PreinscriptionRequest } from "@/types/preinscription";

const API_BASE_URL = "https://api-test.esiitech-gabon.com";

/* ================= SESSION ================= */
export async function fetchPreinscriptionSession(): Promise<SessionPublique> {
  const res = await fetch(
    `${API_BASE_URL}/api/public/preinscriptions/session-active`
  );

  if (!res.ok) {
    throw new Error("Erreur lors du chargement de la session");
  }

  return res.json();
}

/* ================= SUBMIT ================= */
export async function submitPreinscription(
  payload: PreinscriptionRequest
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