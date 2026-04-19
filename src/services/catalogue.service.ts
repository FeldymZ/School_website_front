const API = "https://api-test.esiitech-gabon.com"

/* ================= CATEGORIES ================= */

export async function fetchCategories() {
  const res = await fetch(`${API}/api/public/categories`)
  if (!res.ok) throw new Error("Erreur categories")
  return res.json()
}

/* ================= SOUS CATEGORIES ================= */

export async function fetchSousCategories(categorieId?: number) {

  let url = `${API}/api/public/sous-categories`

  if (categorieId) {
    url += `?categorieId=${categorieId}`
  }

  const res = await fetch(url)

  if (!res.ok) throw new Error("Erreur sous categories")

  return res.json()
}