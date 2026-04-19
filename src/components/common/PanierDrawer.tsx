"use client"

import { usePanier } from "@/store/usePanier"
import { resolveMediaUrl } from "@/utils/media"
import {
  X,
  Trash2,
  ShoppingCart,
  Sparkles,
  Banknote,
  Users,
  ArrowRight,
  InboxIcon,
  Minus,
  Plus,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function PanierDrawer() {

  const { items, isOpen, close, remove, updateParticipants } = usePanier()
  const navigate = useNavigate()

  const total = items.reduce(
    (sum, i) => sum + (i.prix ?? 0) * i.participants,
    0
  )

  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        />
      )}

      {/* DRAWER */}
      <div className={`
        fixed top-32 bottom-32 right-3 w-[300px]
        bg-white z-50 shadow-2xl flex flex-col rounded-2xl overflow-hidden border border-gray-100
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-[calc(100%+12px)] opacity-0 pointer-events-none"}
      `}>

        {/* ===== HEADER ===== */}
        <div className="relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "18px 18px" }}
          />
          <div className="relative px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-xl blur-md" />
                <div className="relative w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center ring-1 ring-white/30">
                  <ShoppingCart size={14} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-white text-sm">Mon panier</h2>
                <p className="text-white/60 text-[10px] flex items-center gap-1 mt-0.5">
                  <Sparkles size={8} />
                  {items.length} formation{items.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <button
              onClick={close}
              className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center
                         text-white transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">

          {/* EMPTY */}
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-12 space-y-3">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <InboxIcon className="w-7 h-7 text-gray-400" />
                </div>
                <div className="absolute -inset-1 bg-gray-200 rounded-2xl opacity-20 blur-xl" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-700 text-sm">Panier vide</p>
                <p className="text-gray-400 text-[11px] mt-0.5">Ajoutez des formations pour commencer</p>
              </div>
            </div>
          )}

          {/* ITEMS */}
          {items.map((item, index) => (
            <div
              key={item.formationId}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 space-y-2.5
                         hover:border-blue-100 hover:shadow-md transition-all duration-200"
              style={{ animation: `fadeIn 0.25s ease-out ${index * 0.05}s both` }}
            >
              {/* TOP */}
              <div className="flex items-start gap-2.5">

                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border flex-shrink-0">
                  {item.coverUrl ? (
                    <img
                      src={resolveMediaUrl(item.coverUrl)}
                      alt={item.titre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#00A4E0] to-[#0077A8] flex items-center justify-center text-white text-[10px] font-bold">
                      {item.titre.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">{item.titre}</p>
                  {item.prix != null && (
                    <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <Banknote size={9} />
                      {item.prix.toLocaleString()} FCFA / pers.
                    </p>
                  )}
                </div>

                <button
                  onClick={() => remove(item.formationId)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50
                             transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
                  title="Retirer"
                >
                  <Trash2 size={13} />
                </button>

              </div>

              {/* BOTTOM — stepper + sous-total */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-1.5">
                  <Users size={10} className="text-gray-400" />
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                    <button
                      onClick={() => updateParticipants(item.formationId, item.participants - 1)}
                      disabled={item.participants <= 1}
                      className="w-5 h-5 rounded-md flex items-center justify-center text-gray-600
                                 hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus size={9} />
                    </button>
                    <span className="text-xs font-bold text-gray-800 w-5 text-center">
                      {item.participants}
                    </span>
                    <button
                      onClick={() => updateParticipants(item.formationId, item.participants + 1)}
                      className="w-5 h-5 rounded-md flex items-center justify-center text-gray-600
                                 hover:bg-white hover:shadow-sm transition-all"
                    >
                      <Plus size={9} />
                    </button>
                  </div>
                </div>

                <span className="text-xs font-black text-[#00A4E0]">
                  {((item.prix ?? 0) * item.participants).toLocaleString()} FCFA
                </span>

              </div>
            </div>
          ))}

        </div>

        {/* ===== FOOTER ===== */}
        {items.length > 0 && (
          <div className="flex-shrink-0 p-3 border-t border-gray-100 space-y-2.5 bg-gradient-to-br from-white to-gray-50">

            <div className="flex justify-between items-center px-0.5">
              <span className="font-bold text-gray-800 text-sm">Total</span>
              <span className="font-black text-base text-[#00A4E0]">
                {total.toLocaleString()}
                <span className="text-[11px] font-semibold text-gray-500 ml-1">FCFA</span>
              </span>
            </div>

            <button
              onClick={() => {
                close()
                navigate("/panier")
              }}
              className="group relative w-full py-2.5 rounded-xl font-semibold text-white text-sm overflow-hidden
                         hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0077A8] to-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-1.5">
                Voir le panier
                <ArrowRight size={14} />
              </span>
            </button>

          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  )
}