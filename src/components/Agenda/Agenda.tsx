import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import {
  fetchUpcomingEvents,
  fetchPastEvents,
} from "@/services/agendaService";
import type { AgendaEvent } from "@/types/agenda";

/* ================================================= */
/* ==================== AGENDA ===================== */
/* ================================================= */

export default function Agenda() {
  const [upcoming, setUpcoming] = useState<AgendaEvent[]>([]);
  const [past, setPast] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchUpcomingEvents(), fetchPastEvents()])
      .then(([u, p]) => {
        setUpcoming(u);
        setPast(p);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* ================= TITRE ================= */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2.5">
          <div className="bg-[#1b5e7a] p-3 rounded-xl">
            <Calendar size={24} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#1b5e7a]">
            Agenda
          </h2>
        </div>
        <div className="h-[2px] w-28 bg-[#1b5e7a]" />
      </div>

      {/* ================= À VENIR ================= */}
      <AgendaSection
        title="Événements à venir"
        icon={<Calendar size={15} />}
        events={upcoming}
        highlight
        headerClass="bg-[#1b5e7a] text-white"
      />

      {/* ================= PASSÉS ================= */}
      {past.length > 0 && (
        <AgendaSection
          title="Événements passés"
          icon={<Clock size={15} />}
          events={past}
          headerClass="bg-gray-100 text-gray-700"
        />
      )}
    </div>
  );
}

/* ================================================= */
/* ================== SECTION ====================== */
/* ================================================= */

function AgendaSection({
  title,
  icon,
  events,
  highlight = false,
  headerClass,
}: {
  title: string;
  icon: React.ReactNode;
  events: AgendaEvent[];
  highlight?: boolean;
  headerClass: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (events.length <= ITEMS_PER_PAGE) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [events.length, totalPages]);

  const startIndex = currentIndex * ITEMS_PER_PAGE;
  const visibleEvents = events.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* HEADER */}
      <div
        className={`px-4 py-2.5 flex items-center justify-between ${headerClass}`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-bold">{title}</h3>
        </div>
        {events.length > ITEMS_PER_PAGE && (
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-300
                  ${
                    index === currentIndex
                      ? "bg-white w-5"
                      : "bg-white/40"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* LISTE avec animation */}
      <div className="p-3 relative overflow-hidden min-h-[280px]">
        {events.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">
            Aucun événement.
          </p>
        ) : (
          <div
            className="space-y-2.5 transition-all duration-500 ease-in-out"
            key={currentIndex}
            style={{
              animation: 'fadeSlideIn 0.5s ease-in-out'
            }}
          >
            {visibleEvents.map((event) => (
              <AgendaItem
                key={event.id}
                event={event}
                highlight={highlight}
              />
            ))}
          </div>
        )}
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

/* ================================================= */
/* ================== ITEM ========================= */
/* ================================================= */

function AgendaItem({
  event,
  highlight,
}: {
  event: AgendaEvent;
  highlight?: boolean;
}) {
  const date = new Date(event.eventDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("fr-FR", {
    month: "short",
  });

  return (
    <div
      className={`
        group
        flex gap-2.5 p-2.5 rounded-xl transition-all duration-300
        cursor-pointer
        ${
          highlight
            ? "bg-gradient-to-r from-[#1b5e7a]/5 to-transparent hover:from-[#1b5e7a]/10 hover:shadow-md"
            : "hover:bg-gray-50 hover:shadow-sm"
        }
      `}
    >
      {/* DATE */}
      <div
        className={`
          min-w-[44px] h-[44px] rounded-lg
          flex flex-col items-center justify-center
          font-bold
          transition-all duration-300
          group-hover:scale-110
          group-hover:shadow-lg
          ${
            highlight
              ? "bg-[#1b5e7a] text-white group-hover:bg-[#15505f]"
              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
          }
        `}
      >
        <span className="text-lg leading-none">
          {day}
        </span>
        <span className="text-[9px] uppercase">
          {month}
        </span>
      </div>

      {/* CONTENU */}
      <div className="flex-1">
        <h5 className={`
          text-xs font-bold mb-0.5 line-clamp-2
          transition-colors duration-300
          ${
            highlight
              ? "text-gray-900 group-hover:text-[#1b5e7a]"
              : "text-gray-600 group-hover:text-gray-900"
          }
        `}>
          {event.title}
        </h5>

        <p className="text-[11px] text-gray-600 line-clamp-2 mb-1 group-hover:text-gray-700 transition-colors">
          {event.description}
        </p>

        {event.location && (
          <div className="flex items-center gap-1 text-[10px] text-gray-500 group-hover:text-[#1b5e7a] transition-colors">
            <MapPin size={10} className="group-hover:scale-110 transition-transform" />
            <span>{event.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
