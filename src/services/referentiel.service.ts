const API_BASE = "https://api-repository.solutech-one.com/api/v1/referentiel";

/* ================= GENERIC FETCH ================= */
async function fetchReferentiel(code: string) {
  const res = await fetch(`${API_BASE}/categorie/${code}`);

  if (!res.ok) {
    throw new Error("Erreur chargement référentiel");
  }

  return res.json();
}

/* ================= SPECIFIQUES ================= */

export const fetchNationalites = () => fetchReferentiel("002");
export const fetchDiplomes     = () => fetchReferentiel("023");
export const fetchAnnees       = () => fetchReferentiel("035");