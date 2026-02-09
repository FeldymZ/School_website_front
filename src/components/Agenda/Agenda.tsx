import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, X, Info } from "lucide-react";
import {
  fetchUpcomingEvents,
  fetchPastEvents,
} from "@/services/agendaService";
import type { AgendaEvent } from "@/types/agenda";

/* ================================================= */
/* ==================== AGENDA ===================== */
/* ================================================= */

const PRIMARY_COLOR = "#00a8e8";

export default function Agenda({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const [upcoming, setUpcoming] = useState<AgendaEvent[]>([]);
  const [past, setPast] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<AgendaEvent | null>(null);

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
    <>
      <div className="space-y-5">
        {/* ================= TITRE ================= */}
        {showHeader && (
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-2.5">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                <Calendar size={24} className="text-white" />
              </div>
              <h2
                className="text-xl font-bold"
                style={{ color: PRIMARY_COLOR }}
              >
                Agenda
              </h2>
            </div>
            <div
              className="h-[2px] w-28"
              style={{ backgroundColor: PRIMARY_COLOR }}
            />
          </div>
        )}

        {/* ================= À VENIR ================= */}
        <AgendaSection
          title="Événements à venir"
          icon={<Calendar size={15} />}
          events={upcoming}
          highlight
          headerClass="text-white"
          headerStyle={{ backgroundColor: PRIMARY_COLOR }}
          onEventClick={setSelectedEvent}
        />

        {/* ================= PASSÉS ================= */}
        {past.length > 0 && (
          <AgendaSection
            title="Événements passés"
            icon={<Clock size={15} />}
            events={past}
            headerClass="bg-gray-100 text-gray-700"
            onEventClick={setSelectedEvent}
          />
        )}
      </div>

      {/* ================= MODAL DÉTAILS ================= */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
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
  headerStyle,
  onEventClick,
}: {
  title: string;
  icon: React.ReactNode;
  events: AgendaEvent[];
  highlight?: boolean;
  headerClass: string;
  headerStyle?: React.CSSProperties;
  onEventClick: (event: AgendaEvent) => void;
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
        style={headerStyle}
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
                  h-1.5 rounded-full transition-all duration-300
                  ${
                    index === currentIndex
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/40"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* LISTE */}
      <div className="p-3 relative overflow-hidden min-h-[280px]">
        {events.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">
            Aucun événement.
          </p>
        ) : (
          <div
            key={currentIndex}
            className="space-y-2.5 transition-all duration-500"
            style={{ animation: "fadeSlideIn 0.5s ease-in-out" }}
          >
            {visibleEvents.map((event) => (
              <AgendaItem
                key={event.id}
                event={event}
                highlight={highlight}
                onClick={() => onEventClick(event)}
              />
            ))}
          </div>
        )}
      </div>

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
  onClick,
}: {
  event: AgendaEvent;
  highlight?: boolean;
  onClick: () => void;
}) {
  const date = new Date(event.eventDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("fr-FR", { month: "short" });

  return (
    <div
      onClick={onClick}
      className={`
        group relative flex gap-2.5 p-2.5 rounded-xl cursor-pointer
        transition-all duration-300
        border-2 border-transparent
        ${
          highlight
            ? "bg-gradient-to-r from-[#00a8e8]/5 to-transparent hover:from-[#00a8e8]/10 hover:shadow-lg hover:border-[#00a8e8]/30"
            : "hover:bg-gray-50 hover:shadow-md hover:border-gray-200"
        }
      `}
    >
      <div
        className={`
          min-w-[44px] h-[44px] rounded-lg
          flex flex-col items-center justify-center
          font-bold transition-all duration-300
          group-hover:scale-110 group-hover:shadow-lg
          ${
            highlight
              ? "bg-[#00a8e8] text-white"
              : "bg-gray-100 text-gray-600"
          }
        `}
      >
        <span className="text-lg leading-none">{day}</span>
        <span className="text-[9px] uppercase">{month}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h5
            className={`
              text-xs font-bold mb-0.5 line-clamp-2 flex-1
              ${
                highlight
                  ? "text-gray-900 group-hover:text-[#00a8e8]"
                  : "text-gray-600 group-hover:text-gray-900"
              }
            `}
          >
            {event.title}
          </h5>

          {/* Badge "Plus" */}
          <div className={`
            flex-shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold
            transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-110
            ${
              highlight
                ? "bg-[#00a8e8]/20 text-[#00a8e8] group-hover:bg-[#00a8e8] group-hover:text-white"
                : "bg-gray-200 text-gray-600 group-hover:bg-gray-600 group-hover:text-white"
            }
          `}>
            <Info size={9} />
            <span>+</span>
          </div>
        </div>

        <p className="text-[11px] text-gray-600 line-clamp-2 mb-1">
          {event.description}
        </p>

        {event.location && (
          <div className="flex items-center gap-1 text-[10px] text-gray-500 group-hover:text-[#00a8e8]">
            <MapPin size={10} />
            <span>{event.location}</span>
          </div>
        )}

        {/* Indication "Cliquer pour voir plus" */}
        <div className={`
          flex items-center gap-1 mt-1.5 text-[9px] font-medium
          transition-all duration-300
          ${
            highlight
              ? "text-[#00a8e8]/70 group-hover:text-[#00a8e8]"
              : "text-gray-400 group-hover:text-gray-600"
          }
        `}>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            → Cliquer pour voir tous les détails
          </span>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* ================ MODAL DÉTAILS ================== */
/* ================================================= */

function EventDetailsModal({
  event,
  onClose,
}: {
  event: AgendaEvent;
  onClose: () => void;
}) {
  const date = new Date(event.eventDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00a8e8] to-[#0077A8] opacity-10" />
          <div className="relative flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00a8e8] to-[#0077A8] rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-[#00a8e8] to-[#0077A8] rounded-lg flex items-center justify-center shadow-lg">
                  <Calendar className="text-white" size={20} />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Détails de l'événement
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Titre */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {event.title}
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-[#00a8e8] to-[#0077A8] rounded-full" />
          </div>

          {/* Date et heure */}
          <div className="bg-gradient-to-r from-[#00a8e8]/10 to-transparent rounded-xl p-3 space-y-2">
            <div className="flex items-start gap-2">
              <Calendar size={18} className="text-[#00a8e8] mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-0.5">
                  Date de début
                </p>
                <p className="text-sm text-gray-900">
                  {formatDate(date)}
                </p>
                {event.startTime && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    À partir de {formatTime(new Date(`2000-01-01T${event.startTime}`))}
                  </p>
                )}
              </div>
            </div>

            {endDate && (
              <div className="flex items-start gap-2 pt-2 border-t border-gray-200">
                <Clock size={18} className="text-[#00a8e8] mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-0.5">
                    Date de fin
                  </p>
                  <p className="text-sm text-gray-900">
                    {formatDate(endDate)}
                  </p>
                  {event.endTime && (
                    <p className="text-xs text-gray-600 mt-0.5">
                      Jusqu'à {formatTime(new Date(`2000-01-01T${event.endTime}`))}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Lieu */}
          {event.location && (
            <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
              <MapPin size={18} className="text-[#00a8e8] mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-0.5">
                  Lieu
                </p>
                <p className="text-sm text-gray-900">
                  {event.location}
                </p>
              </div>
            </div>
          )}

          {/* Description complète */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">
              Description
            </p>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00a8e8] to-[#0077A8]
                       text-white font-medium text-sm
                       hover:shadow-lg hover:scale-105 active:scale-95
                       transition-all duration-200"
          >
            Fermer
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoom-in-95 {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .zoom-in-95 {
          animation: zoom-in-95 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
