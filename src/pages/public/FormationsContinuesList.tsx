import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { fetchPublicFormationsContinues } from "@/services/FormationsContinuesPublicService"
import { fetchCategories } from "@/services/catalogue.service"
import { resolveMediaUrl } from "@/utils/media"
import {
  ChevronDown,
  Tag,
  Layers,
  BookOpen,
  Sparkles,
  GraduationCap,
} from "lucide-react"

const selectCls =
  "w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 appearance-none bg-white text-sm text-gray-700 " +
  "focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/30 focus:border-[#00A4E0] transition-all"

export default function FormationsContinuesList() {

  const [searchParams, setSearchParams] = useSearchParams()

  const [categories, setCategories] = useState<any[]>([])
  const [sousCategories, setSousCategories] = useState<any[]>([])

  const [formations, setFormations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  /* ================= URL STATE ================= */
  const categorieId = searchParams.get("cat")
  const sousCategorieId = searchParams.get("sub")

  /* ================= LOAD CATEGORIES ================= */
  useEffect(() => {
    const load = async () => {
      const data = await fetchCategories()
      setCategories(data)
    }
    load()
  }, [])

  /* ================= UPDATE SOUS-CATEGORIES ================= */
  useEffect(() => {
    if (!categorieId) {
      setSousCategories([])
      return
    }
    const cat = categories.find(c => c.id === Number(categorieId))
    setSousCategories(cat?.sousCategories || [])
  }, [categorieId, categories])

  /* ================= LOAD FORMATIONS ================= */
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await fetchPublicFormationsContinues(
        0,
        10,
        categorieId ? Number(categorieId) : undefined,
        sousCategorieId ? Number(sousCategorieId) : undefined
      )
      setFormations(data.content)
      setLoading(false)
    }
    load()
  }, [categorieId, sousCategorieId])

  /* ================= HANDLERS ================= */
  const handleCategorieChange = (value: string) => {
    const params: any = {}
    if (value) params.cat = value
    setSearchParams(params)
  }

  const handleSousCategorieChange = (value: string) => {
    const params: any = {}
    if (categorieId) params.cat = categorieId
    if (value) params.sub = value
    setSearchParams(params)
  }

  const selectedCategorieName = categories.find(c => c.id === Number(categorieId))?.libelle
  const selectedSousCategorieName = sousCategories.find(sc => sc.id === Number(sousCategorieId))?.libelle

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* ===== HEADER ===== */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8] rounded-3xl opacity-5 blur-3xl" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-xl">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-14 h-14 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Catalogue des formations
                </h1>
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#00A4E0]" />
                  {selectedCategorieName
                    ? `${selectedCategorieName}${selectedSousCategorieName ? ` › ${selectedSousCategorieName}` : ""}`
                    : `${formations.length} formation${formations.length > 1 ? "s" : ""} disponible${formations.length > 1 ? "s" : ""}`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FILTRES ===== */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">

            {/* CATEGORIE */}
            <div className="relative flex-1 group">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors pointer-events-none" size={15} />
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              <select
                value={categorieId || ""}
                onChange={(e) => handleCategorieChange(e.target.value)}
                className={selectCls}
              >
                <option value="">Toutes les catégories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.libelle}</option>
                ))}
              </select>
            </div>

            {/* SOUS-CATEGORIE */}
            <div className="relative flex-1 group">
              <Layers className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                !categorieId ? "text-gray-300" : "text-gray-400 group-focus-within:text-[#00A4E0]"
              }`} size={15} />
              <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                !categorieId ? "text-gray-300" : "text-gray-400"
              }`} size={14} />
              <select
                value={sousCategorieId || ""}
                onChange={(e) => handleSousCategorieChange(e.target.value)}
                disabled={!categorieId}
                className={`${selectCls} ${!categorieId ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`}
              >
                <option value="">Toutes les sous-catégories</option>
                {sousCategories.map(sc => (
                  <option key={sc.id} value={sc.id}>{sc.libelle}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* ===== LOADING ===== */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <div className="h-44 bg-gray-200 animate-pulse" />
                <div className="p-5 space-y-2.5">
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-4/5" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== EMPTY ===== */}
        {!loading && formations.length === 0 && (
          <div className="bg-white rounded-3xl p-16 text-center space-y-4 border border-gray-100 shadow-lg">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-gray-400" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl opacity-20 blur-2xl" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Aucune formation trouvée</h3>
              <p className="text-gray-500 text-sm">Essayez une autre catégorie ou sous-catégorie.</p>
            </div>
          </div>
        )}

        {/* ===== GRID ===== */}
        {!loading && formations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((f, index) => (
              <Link
                key={f.id}
                to={`/formations-continues/${f.slug}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300
                           overflow-hidden hover:-translate-y-1 border border-gray-100"
                style={{ animation: `fadeIn 0.3s ease-out ${index * 0.05}s both` }}
              >
                {/* IMAGE */}
                <div className="h-44 overflow-hidden relative">
                  {f.coverUrl ? (
                    <img
                      src={resolveMediaUrl(f.coverUrl)}
                      alt={f.libelle}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#00A4E0]/10 to-indigo-100 flex items-center justify-center">
                      <GraduationCap className="w-12 h-12 text-[#00A4E0]/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-[#003d5c] line-clamp-2 group-hover:text-[#00A4E0] transition-colors leading-snug">
                    {f.libelle}
                  </h3>

                  <div className="flex items-center gap-3 flex-wrap">
                    {f.prix != null && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-[#00A4E0] text-xs font-bold border border-blue-100">
                        Prix : {f.prix.toLocaleString()} FCFA
                      </span>
                    )}
                    {f.duree != null && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-semibold border border-gray-100">
                        Durée : {f.duree} {f.uniteDuree}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}