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
  Send,
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
        fixed top-10 bottom-13 right-3 w-[300px]
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
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                <InboxIcon className="w-7 h-7 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-700 text-sm">Panier vide</p>
                <p className="text-gray-400 text-[11px]">Ajoutez des formations</p>
              </div>
            </div>
          )}

          {/* ITEMS */}
          {items.map((item) => (
            <div key={item.formationId} className="bg-white rounded-xl border p-3 space-y-2.5">

              <div className="flex items-start gap-2.5">

                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border">
                  {item.coverUrl ? (
                    <img
                      src={resolveMediaUrl(item.coverUrl)}
                      alt={item.titre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#00A4E0] flex items-center justify-center text-white text-[10px] font-bold">
                      {item.titre.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1 text-xs font-bold text-gray-900">
                  {item.titre}
                </div>

                <button onClick={() => remove(item.formationId)}>
                  <Trash2 size={13} />
                </button>

              </div>

              <div className="flex justify-between items-center text-xs">

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateParticipants(item.formationId, item.participants - 1)}
                    disabled={item.participants <= 1}
                  >
                    <Minus size={10} />
                  </button>

                  {item.participants}

                  <button
                    onClick={() => updateParticipants(item.formationId, item.participants + 1)}
                  >
                    <Plus size={10} />
                  </button>
                </div>

                <span className="font-bold text-[#00A4E0]">
                  {(item.prix ?? 0) * item.participants} FCFA
                </span>

              </div>
            </div>
          ))}

        </div>

        {/* ===== FOOTER ===== */}
        {items.length > 0 && (
          <div className="p-3 border-t space-y-2.5">

            <div className="flex justify-between text-sm font-bold">
              <span>Total</span>
              <span>{total.toLocaleString()} FCFA</span>
            </div>

            {/* 🔥 CTA RAPIDE */}
            <button
              onClick={() => {
                close()
                navigate("/panier")
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00A4E0] to-[#0077A8] text-white text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Send size={14} />
              Demander un devis
            </button>

            {/* NAV */}
            <button
              onClick={() => {
                close()
                navigate("/panier")
              }}
              className="w-full py-2 rounded-xl border text-sm"
            >
              Voir le panier
            </button>

          </div>
        )}
      </div>
    </>
  )
}