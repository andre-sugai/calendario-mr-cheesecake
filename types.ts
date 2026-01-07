export type EventType = 'holiday' | 'commemorative' | 'special';

export interface CalendarEvent {
  date: string; // Format YYYY-MM-DD
  title: string;
  type: EventType;
  description?: string;
  businessTip?: string;
}

export interface DayData {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}