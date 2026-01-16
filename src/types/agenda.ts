export interface AgendaEvent {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  endDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  location?: string | null;
}
