import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  FileText,
  Clock,
  Banknote,
  ShoppingCart,
  Users,
  CheckCircle,
  Target,
  Award,
} from "lucide-react"

import { fetchPublicFormationContinueBySlug, sendDemandeDevisFormationContinue } from "@/services/FormationsContinuesPublicService"
import { resolveMediaUrl } from "@/utils/media"

import { sanitizeHTML } from "@/utils/sanitize"
import { usePanier } from "@/store/usePanier"

import type { FormationContinue } from "@/types/formation-continue"

/* ================= HTML DISPLAY FIX ================= */
function formatHtmlForDisplay(html: string): string {
  if (!html) return ""

  let output = html

  output = output.replace(
    /<p>\s*((?:•.*?<br>\s*)+)<\/p>/gs,
    (_: string, list: string) => {
      const items = list
        .split("<br>")
        .map((line: string) => line.replace("•", "").trim())
        .filter(Boolean)

      return `
        <ul>
          ${items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `
    }
  )

  return output
}

export default function FormationContinueDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const { add, open } = usePanier()

  const [formation, setFormation] = useState<FormationContinue | null>(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  const [participants, setParticipants] = useState(1)

  /* ================= PARALLAX ================= */
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* ================= LOAD ================= */
  useEffect(() => {
    if (!slug) return

    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchPublicFormationContinueBySlug(slug)
        setFormation(data)
      } catch (err) {
        console.error(err)
        setFormation(null)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [slug])

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-20 h-20 border-4 border-[#00A4E0] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-xl font-bold text-gray-700">Chargement de la formation...</p>
        </div>
      </div>
    )
  }

  if (!formation) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-red-100 text-center max-w-md w-full">
          <h3 className="text-3xl font-black text-gray-900 mb-3">Formation introuvable</h3>
          <p className="text-gray-600">Cette formation n'existe pas ou n'est plus disponible.</p>
        </div>
      </div>
    )
  }

  /* ================= ACTION ================= */
  const handleAddToCart = () => {
    add({
      formationId: formation.id,
      titre: formation.libelle,
      prix: formation.prix,
      participants,
      slug: formation.slug,
      coverUrl: formation.coverUrl ?? undefined,
    })

    open()
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/20 min-h-screen">

      {/* ===== HERO ===== */}
      <div className="relative h-[26rem] md:h-[36rem] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${resolveMediaUrl(formation.coverUrl)})`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-14">
          <div className="space-y-5 w-full">

            {/* TITRE */}
            <div className="space-y-3">
              <h1 className="text-white text-4xl md:text-6xl font-black drop-shadow-2xl leading-tight max-w-4xl
                             [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
                {formation.libelle}
              </h1>
              <div className="h-1.5 w-28 bg-[#00A4E0] rounded-full" />
            </div>

            {/* Meta pills */}
            <div className="flex items-center gap-3 flex-wrap">
              {formation.prix != null && (
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 backdrop-blur border border-white/20 text-white text-sm font-semibold">
                  <Banknote size={15} />
                  {formation.prix.toLocaleString()} FCFA
                </div>
              )}
              {formation.duree != null && (
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 backdrop-blur border border-white/20 text-white text-sm font-semibold">
                  <Clock size={15} />
                  {formation.duree} {formation.uniteDuree}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ===== COLONNE GAUCHE ===== */}
          <div className="lg:col-span-2 space-y-6">

            {/* ===== DESCRIPTION ===== */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">

              <div className="mb-6 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-black text-gray-900 leading-tight">{formation.libelle}</h2>
              </div>

              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl blur-md opacity-40" />
                  <div className="relative w-11 h-11 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl flex items-center justify-center shadow-md">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-700">Description</h3>
              </div>

              <div
                className="prose prose-lg max-w-none
                           prose-headings:text-gray-900 prose-headings:font-bold
                           prose-p:text-gray-600 prose-p:leading-relaxed
                           prose-li:text-gray-600
                           prose-blockquote:border-[#00A4E0] prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-xl
                           prose-a:text-[#00A4E0] prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(formatHtmlForDisplay(formation.description ?? "")),
                }}
              />
            </div>

            {/* ===== OBJECTIFS ===== */}
            {formation.objectifs && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl blur-md opacity-40" />
                    <div className="relative w-11 h-11 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl flex items-center justify-center shadow-md">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-700">Objectifs</h3>
                </div>

                <div
                  className="prose prose-lg max-w-none
                             prose-headings:text-gray-900 prose-headings:font-bold
                             prose-p:text-gray-600 prose-p:leading-relaxed
                             prose-li:text-gray-600
                             prose-a:text-[#00A4E0] prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(formatHtmlForDisplay(formation.objectifs)),
                  }}
                />
              </div>
            )}

            {/* ===== COMPÉTENCES ===== */}
            {formation.competences && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl blur-md opacity-40" />
                    <div className="relative w-11 h-11 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl flex items-center justify-center shadow-md">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-700">Compétences acquises</h3>
                </div>

                <div
                  className="prose prose-lg max-w-none
                             prose-headings:text-gray-900 prose-headings:font-bold
                             prose-p:text-gray-600 prose-p:leading-relaxed
                             prose-li:text-gray-600
                             prose-a:text-[#00A4E0] prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(formatHtmlForDisplay(formation.competences)),
                  }}
                />
              </div>
            )}

          </div>

          {/* ===== SIDEBAR ===== */}
          <div className="lg:col-span-1 sticky top-6 space-y-4">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-5">

              {/* Prix recap */}
              {formation.prix != null && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100 space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prix par participant</p>
                  <p className="text-2xl font-black text-[#00A4E0]">
                    {formation.prix.toLocaleString()} <span className="text-base font-semibold">FCFA</span>
                  </p>
                  {formation.duree != null && (
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <Clock size={11} />
                      {formation.duree} {formation.uniteDuree}
                    </p>
                  )}
                </div>
              )}

              {/* Participants */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                  Nombre de participants
                </label>
                <div className="relative group">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={15} />
                  <input
                    type="number"
                    min={1}
                    value={participants}
                    onChange={(e) => setParticipants(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                               focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/30 focus:border-[#00A4E0]
                               text-sm transition-all bg-white font-medium"
                  />
                </div>

                {/* Total */}
                {formation.prix != null && (
                  <div className="mt-2.5 flex items-center justify-between text-sm px-1">
                    <span className="text-gray-500">Total estimé</span>
                    <span className="font-bold text-gray-900">
                      {(formation.prix * participants).toLocaleString()} FCFA
                    </span>
                  </div>
                )}
              </div>

              {/* ADD TO CART */}
              <button
                onClick={handleAddToCart}
                className={`group relative w-full py-3.5 rounded-xl font-bold text-sm overflow-hidden
                            hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg
                            flex items-center justify-center gap-2 ${
                  added ? "shadow-green-200" : "shadow-blue-200"
                }`}
              >
                <div className={`absolute inset-0 transition-opacity duration-300 ${added ? "opacity-100" : "opacity-0"} bg-gradient-to-r from-green-500 to-emerald-600`} />
                <div className={`absolute inset-0 transition-opacity duration-300 ${added ? "opacity-0" : "opacity-100"} bg-gradient-to-r from-[#00A4E0] to-[#0077A8]`} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0077A8] to-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white flex items-center gap-2">
                  {added ? (
                    <><CheckCircle size={16} /> Ajouté au panier !</>
                  ) : (
                    <><ShoppingCart size={16} /> Ajouter au panier</>
                  )}
                </span>
              </button>

              {/* VIEW CART */}
              <button
                onClick={() => navigate("/panier")}
                className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm
                           hover:border-[#00A4E0] hover:text-[#00A4E0] hover:bg-blue-50
                           transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                Voir le panier
              </button>

              {/* DIVIDER */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <div className="flex-1 h-px bg-gray-100" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}