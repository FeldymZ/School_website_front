"use client"

import { usePanier, PanierItem } from "@/store/usePanier"
import { resolveMediaUrl } from "@/utils/media"

import {
  ShoppingCart,
  Trash2,
  Users,
  Banknote,
  InboxIcon,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle,
  User,
  Mail,
  Phone,
  Building2,
  Send,
} from "lucide-react"

import { useNavigate } from "react-router-dom"
import { sendDemandeDevisGlobal } from "@/services/FormationsContinuesPublicService"
import { useState } from "react"

const inputCls =
  "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/30 focus:border-[#00A4E0] text-sm transition-all bg-white"

export default function PanierPage() {

  const navigate = useNavigate()
  const { items, remove, updateParticipants } = usePanier()

  const [client, setClient] = useState({
    nomClient: "",
    email: "",
    telephone: "",
    entreprise: false,
    nomStructure: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const total = items.reduce(
    (sum: number, i: PanierItem) => sum + (i.prix ?? 0) * i.participants,
    0
  )

  const isInvalid =
    !client.nomClient.trim() ||
    !client.email.trim() ||
    !client.telephone.trim() ||
    (client.entreprise && !client.nomStructure.trim())

  const handleSubmit = async () => {

    if (isInvalid) {
      setError("Veuillez remplir tous les champs")
      return
    }

    if (!/\S+@\S+\.\S+/.test(client.email)) {
      setError("Email invalide")
      return
    }

    try {

      setLoading(true)
      setError(null)

      await sendDemandeDevisGlobal({
        ...client,
        formations: items.map(i => ({
          slug: i.slug,
          participants: i.participants,
        }))
      })

      setSuccess(true)

    } catch (err) {

      const message =
        err instanceof Error ? err.message : "Erreur lors de l'envoi"

      setError(message)

    } finally {
      setLoading(false)
    }
  }

  /* ================= SUCCESS ================= */
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-40 animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Demande envoyée avec succès !</h2>
            <p className="text-gray-500">Nous vous contacterons rapidement.</p>
          </div>
          <button
            onClick={() => navigate("/formations-continues")}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden
                       hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-200"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0077A8] to-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Voir le catalogue <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    )
  }

  /* ================= EMPTY ================= */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-16 text-center space-y-6 border border-gray-100 shadow-xl max-w-md w-full">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                <InboxIcon className="w-12 h-12 text-gray-400" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl opacity-20 blur-2xl" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Panier vide</h3>
            <p className="text-gray-500">Votre panier est vide.</p>
          </div>
          <button
            onClick={() => navigate("/formations-continues")}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden
                       hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-200"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0077A8] to-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Voir le catalogue <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    )
  }

  /* ================= MAIN ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-8">

        {/* ===== HEADER ===== */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8] rounded-3xl opacity-5 blur-3xl" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-xl">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Panier
                </h1>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#00A4E0]" />
                  {items.length} formation{items.length > 1 ? "s" : ""} sélectionnée{items.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ===== LISTE + FORM CLIENT ===== */}
          <div className="lg:col-span-2 space-y-6">

            {/* Items */}
            <div className="space-y-3">
              {items.map((item: PanierItem, index) => (
                <div
                  key={item.formationId}
                  className="bg-white rounded-2xl border border-gray-100 shadow-md p-5
                             hover:shadow-lg hover:border-blue-100 transition-all duration-200"
                  style={{ animation: `fadeIn 0.3s ease-out ${index * 0.06}s both` }}
                >
                  <div className="flex items-start justify-between gap-4">

                    {/* LEFT */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">

                      {/* IMAGE */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border flex-shrink-0">
                        {item.coverUrl ? (
                          <img
                            src={resolveMediaUrl(item.coverUrl)}
                            alt={item.titre}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00A4E0] to-[#0077A8]">
                            <span className="text-white font-bold">
                              {item.titre.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* TEXT */}
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 truncate">{item.titre}</h3>
                        {item.prix && (
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Banknote size={11} />
                            {item.prix.toLocaleString()} FCFA / participant
                          </p>
                        )}
                      </div>

                    </div>

                    {/* DELETE */}
                    <button
                      onClick={() => remove(item.formationId)}
                      className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50
                                 transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                  {/* FOOTER */}
                  <div className="mt-4 flex items-center justify-between">

                    {/* PARTICIPANTS */}
                    <div className="relative group">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={14} />
                      <input
                        type="number"
                        value={item.participants}
                        min={1}
                        onChange={(e) =>
                          updateParticipants(item.formationId, Number(e.target.value))
                        }
                        className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200
                                   focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/30 focus:border-[#00A4E0]
                                   text-sm w-32 transition-all bg-white"
                      />
                    </div>

                    {/* SOUS-TOTAL */}
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Sous-total</p>
                      <p className="font-bold text-gray-900 text-lg">
                        {((item.prix ?? 0) * item.participants).toLocaleString()}
                        <span className="text-xs font-medium text-gray-500 ml-1">FCFA</span>
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Formulaire client */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-5">

              <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl blur-md opacity-50" />
                  <div className="relative w-11 h-11 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Informations client</h2>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Sparkles size={10} className="text-[#00A4E0]" />
                    Réponse sous 24h
                  </p>
                </div>
              </div>

              <div className="space-y-3">

                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={15} />
                  <input
                    placeholder="Nom complet"
                    value={client.nomClient}
                    onChange={(e) => setClient({ ...client, nomClient: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={15} />
                  <input
                    placeholder="Adresse email"
                    value={client.email}
                    onChange={(e) => setClient({ ...client, email: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00A4E0] transition-colors" size={15} />
                  <input
                    placeholder="Téléphone"
                    value={client.telephone}
                    onChange={(e) => setClient({ ...client, telephone: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setClient({ ...client, entreprise: !client.entreprise })}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    client.entreprise
                      ? "border-[#00A4E0] bg-blue-50 text-[#0077A8]"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Building2 size={15} />
                  {client.entreprise ? "Demande pour une structure" : "Demande pour une structure ?"}
                  <span className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    client.entreprise ? "border-[#00A4E0] bg-[#00A4E0]" : "border-gray-300"
                  }`}>
                    {client.entreprise && <span className="w-2 h-2 bg-white rounded-full" />}
                  </span>
                </button>

                {client.entreprise && (
                  <div className="relative group">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00A4E0]" size={15} />
                    <input
                      placeholder="Nom de la structure"
                      value={client.nomStructure}
                      onChange={(e) => setClient({ ...client, nomStructure: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#00A4E0]/40 bg-blue-50/30
                                 focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/30 focus:border-[#00A4E0]
                                 text-sm transition-all"
                    />
                  </div>
                )}

              </div>

              {error && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || isInvalid}
                className="group relative w-full py-3.5 rounded-xl text-white font-bold text-sm overflow-hidden
                           hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-200
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                           flex items-center justify-center gap-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0077A8] to-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer la demande
                    </>
                  )}
                </span>
              </button>

            </div>
          </div>

          {/* ===== RÉSUMÉ STICKY ===== */}
          <div className="lg:col-span-1 sticky top-6">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-5">

              <h2 className="font-bold text-gray-900 text-lg">Résumé</h2>

              <div className="space-y-3 divide-y divide-gray-100">
                {items.map((item: PanierItem) => (
                  <div key={item.formationId} className="flex justify-between items-center pt-3 first:pt-0">
                    <span className="text-sm text-gray-600 truncate max-w-[60%]">{item.titre}</span>
                    <span className="text-sm font-semibold text-gray-800 flex-shrink-0">
                      {((item.prix ?? 0) * item.participants).toLocaleString()} FCFA
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-[#00A4E0]">
                    {total.toLocaleString()}
                    <span className="text-base font-semibold text-gray-500 ml-1">FCFA</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/formations-continues")}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm
                           hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Continuer ma sélection
              </button>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}