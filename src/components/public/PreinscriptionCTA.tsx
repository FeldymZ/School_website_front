"use client";

import { useEffect, useState } from "react";
import { SessionPublique } from "@/types/preinscription";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { fetchPreinscriptionSession } from "@/services/preinscription.service";

export default function PreinscriptionCTA() {

  const [session, setSession] = useState<SessionPublique | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPreinscriptionSession();
        setSession(data);
      } catch {
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ================= LOADING ================= */
  if (loading) return null;

  /* ================= CLOSED ================= */
  if (!session || !session.ouverte) {
    return (
      <div className="text-center mt-10">
        <div className="
          px-6 py-3
          bg-gray-200 text-gray-600
          rounded-xl inline-flex items-center gap-2
        ">
          <Clock size={18} />
          Préinscriptions fermées
        </div>
      </div>
    );
  }

  /* ================= OPEN ================= */
  return (
    <div className="text-center mt-12 space-y-4">

      {/* ANNEE */}
      <p className="text-gray-500 text-sm">
        Année universitaire {session.anneeUniversitaire}
      </p>

      {/* CTA */}
      <Link
        to="/preinscription"
        className="
          group inline-flex items-center gap-3
          px-8 py-4 rounded-2xl
          font-bold text-white
          bg-gradient-to-r from-[#1b5e7a] to-secondary
          shadow-lg
          hover:shadow-2xl
          transition-all duration-300
          hover:-translate-y-1
        "
      >
        🚀 Demander une préinscription

        <ArrowUpRight
          size={18}
          className="
            transition-transform duration-300
            group-hover:translate-x-1
            group-hover:-translate-y-1
          "
        />
      </Link>

      {/* DATES (BONUS UX) */}
      {session.dateDebut && session.dateFin && (
        <p className="text-xs text-gray-400">
          Ouvert du {new Date(session.dateDebut).toLocaleDateString()} au{" "}
          {new Date(session.dateFin).toLocaleDateString()}
        </p>
      )}

    </div>
  );
}