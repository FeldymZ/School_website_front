"use client"

import { usePanier, PanierItem } from "@/store/usePanier"
import { resolveMediaUrl } from "@/utils/media"
import { useNavigate } from "react-router-dom"
import { sendDemandeDevisGlobal } from "@/services/FormationsContinuesPublicService"
import { useState } from "react"
import {
  Trash2,
  Users,
  CheckCircle,
  ShoppingBag,
  Banknote,
  MessageCircle,
  User,
  Mail,
  Phone,
  Building2,
  AlertCircle,
  Send,
  ArrowLeft,
} from "lucide-react"

const inputCls =
  "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 " +
  "focus:ring-[#00A4E0]/30 focus:border-[#00A4E0] text-sm bg-white font-medium transition-all"

export default function PanierPage() {

  const navigate = useNavigate()
  const { items, remove, updateParticipants, clear } = usePanier()

  const [client, setClient] = useState({
    nomClient: "",
    email: "",
    telephone: "",
    entreprise: false,
    nomStructure: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  /* ================= LOGIQUE ================= */
  const total = items.reduce((sum, i) => {
    if (!i.afficherPrix) return sum
    return sum + (i.prix ?? 0) * i.participants
  }, 0)

  const hasDevis = items.some(i => !i.afficherPrix)
  const hasPrix  = items.some(i => i.afficherPrix)

  const isInvalid =
    !client.nomClient.trim() ||
    !client.email.trim() ||
    !client.telephone.trim() ||
    (client.entreprise && !client.nomStructure.trim())

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (isInvalid) { setError("Veuillez remplir tous les champs"); return }
    if (!/\S+@\S+\.\S+/.test(client.email)) { setError("Email invalide"); return }

    try {
      setLoading(true)
      setError(null)
      await sendDemandeDevisGlobal({
        ...client,
        formations: items.map(i => ({ slug: i.slug, participants: i.participants })),
      })
      setSuccess(true)
      clear()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi")
    } finally {
      setLoading(false)
    }
  }

  /* ================= SUCCESS ================= */
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 text-center max-w-md w-full">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-20" />
            <div className="relative w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
              <CheckCircle className="text-green-500" size={36} />
            </div>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Demande envoyée !</h2>
          <p className="text-gray-500 text-sm mb-8">Nous vous contacterons dans les plus brefs délais.</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                       bg-gradient-to-r from-[#00A4E0] to-[#0077A8] text-white font-semibold text-sm
                       hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft size={15} />
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  /* ================= EMPTY ================= */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-gray-400" size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Panier vide</h2>
          <p className="text-gray-500 text-sm mb-8">Ajoutez des formations pour commencer.</p>
          <button
            onClick={() => navigate("/formations-continues")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                       bg-gradient-to-r from-[#00A4E0] to-[#0077A8] text-white font-semibold text-sm
                       hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Voir les formations
          </button>
        </div>
      </div>
    )
  }

  /* ================= MAIN ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">

        {/* ===== HEADER ===== */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8] rounded-3xl opacity-5 blur-3xl" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-2xl blur-xl opacity-50" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Mon panier
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  {items.length} formation{items.length > 1 ? "s" : ""} sélectionnée{items.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ===== LISTE + FORM ===== */}
          <div className="lg:col-span-2 space-y-4">

            {/* ITEMS */}
            {items.map((item: PanierItem, index) => (
              <div
                key={item.formationId}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6"
                style={{ animation: `fadeIn 0.3s ease-out ${index * 0.06}s both` }}
              >
                <div className="flex items-start gap-4">

                  {/* COVER */}
                  {item.coverUrl && (
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={resolveMediaUrl(item.coverUrl)} alt={item.titre} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-gray-900 leading-snug">{item.titre}</h3>
                      <button
                        onClick={() => remove(item.formationId)}
                        className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* PRIX */}
                    {item.afficherPrix ? (
                      <div className="flex items-center gap-1.5 mt-1">
                        <Banknote size={13} className="text-[#00A4E0]" />
                        <span className="text-sm font-bold text-[#00A4E0]">
                          {item.prix?.toLocaleString()} FCFA / pers.
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 mt-1">
                        <MessageCircle size={13} className="text-orange-500" />
                        <span className="text-sm font-bold text-orange-500">Sur devis</span>
                      </div>
                    )}

                    {/* PARTICIPANTS + SOUS-TOTAL */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="relative group w-32">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={13} />
                        <input
                          type="number"
                          value={item.participants}
                          min={1}
                          onChange={(e) => updateParticipants(item.formationId, Number(e.target.value))}
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-sm font-bold
                                     focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/30 focus:border-[#00A4E0] transition-all"
                        />
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-400">Sous-total</p>
                        <p className="font-black text-gray-900">
                          {item.afficherPrix
                            ? `${((item.prix ?? 0) * item.participants).toLocaleString()} FCFA`
                            : "Sur devis"
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* ===== FORM CLIENT ===== */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className="relative px-6 py-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center ring-1 ring-white/30">
                    <User size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-black text-white">Vos informations</h2>
                    <p className="text-white/60 text-xs mt-0.5">Requis pour finaliser votre demande</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">

                {/* NOM */}
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={15} />
                  <input
                    placeholder="Nom complet"
                    value={client.nomClient}
                    onChange={(e) => setClient({ ...client, nomClient: e.target.value })}
                    className={inputCls}
                  />
                </div>

                {/* EMAIL */}
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={15} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={client.email}
                    onChange={(e) => setClient({ ...client, email: e.target.value })}
                    className={inputCls}
                  />
                </div>

                {/* TELEPHONE */}
                <div className="relative group">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={15} />
                  <input
                    placeholder="Téléphone"
                    value={client.telephone}
                    onChange={(e) => setClient({ ...client, telephone: e.target.value })}
                    className={inputCls}
                  />
                </div>

                {/* ENTREPRISE TOGGLE */}
                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                  <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${client.entreprise ? "bg-[#00A4E0]" : "bg-gray-200"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${client.entreprise ? "translate-x-5" : "translate-x-0.5"}`} />
                    <input type="checkbox" checked={client.entreprise} onChange={(e) => setClient({ ...client, entreprise: e.target.checked })} className="sr-only" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">Inscription au nom d'une entreprise</span>
                </label>

                {/* NOM STRUCTURE */}
                {client.entreprise && (
                  <div className="relative group">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={15} />
                    <input
                      placeholder="Nom de la structure"
                      value={client.nomStructure}
                      onChange={(e) => setClient({ ...client, nomStructure: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                )}

                {/* ERROR */}
                {error && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold">
                    <AlertCircle size={15} className="flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="group relative w-full py-4 rounded-xl font-bold text-sm text-white overflow-hidden
                             hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-200
                             disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                             flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0077A8] to-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi en cours...</>
                    ) : (
                      <><Send size={15} />
                        {hasDevis && !hasPrix ? "Envoyer demande de devis"
                          : hasDevis && hasPrix ? "Envoyer commande + devis"
                          : "Valider la commande"}
                      </>
                    )}
                  </span>
                </button>

              </div>
            </div>
          </div>

          {/* ===== RÉSUMÉ ===== */}
          <div className="sticky top-6">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-4">

              <h3 className="font-black text-gray-900 text-lg">Résumé</h3>

              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.formationId} className="flex items-start justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-700 truncate">{item.titre}</p>
                      <p className="text-xs text-gray-400">{item.participants} participant{item.participants > 1 ? "s" : ""}</p>
                    </div>
                    <span className={`font-black flex-shrink-0 ${item.afficherPrix ? "text-gray-900" : "text-orange-500"}`}>
                      {item.afficherPrix
                        ? `${((item.prix ?? 0) * item.participants).toLocaleString()} FCFA`
                        : "Devis"
                      }
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                {total > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">Total connu</span>
                    <span className="font-black text-xl text-[#00A4E0]">
                      {total.toLocaleString()} <span className="text-sm">FCFA</span>
                    </span>
                  </div>
                )}
                {hasDevis && (
                  <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-orange-50 border border-orange-100">
                    <MessageCircle size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-orange-600 font-medium">
                      Certaines formations nécessitent un devis personnalisé.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}