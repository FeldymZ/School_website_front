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

const PRIMARY_COLOR = "#00a8e8";

export default function Agenda({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
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
      <div className="bg-man rounded-2xl shadow-md p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  return (
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
  headerStyle,
}: {
  title: string;
  icon: React.ReactNode;
  events: AgendaEvent[];
  highlight?: boolean;
  headerClass: string;
  headerStyle?: React.CSSProperties;
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
}: {
  event: AgendaEvent;
  highlight?: boolean;
}) {
  const date = new Date(event.eventDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("fr-FR", { month: "short" });

  return (
    <div
      className={`
        group flex gap-2.5 p-2.5 rounded-xl cursor-pointer
        transition-all duration-300
        ${
          highlight
            ? "bg-gradient-to-r from-[#00a8e8]/5 to-transparent hover:from-[#00a8e8]/10 hover:shadow-md"
            : "hover:bg-gray-50 hover:shadow-sm"
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

      <div className="flex-1">
        <h5
          className={`
            text-xs font-bold mb-0.5 line-clamp-2
            ${
              highlight
                ? "text-gray-900 group-hover:text-[#00a8e8]"
                : "text-gray-600 group-hover:text-gray-900"
            }
          `}
        >
          {event.title}
        </h5>

        <p className="text-[11px] text-gray-600 line-clamp-2 mb-1">
          {event.description}
        </p>

        {event.location && (
          <div className="flex items-center gap-1 text-[10px] text-gray-500 group-hover:text-[#00a8e8]">
            <MapPin size={10} />
            <span>{event.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
