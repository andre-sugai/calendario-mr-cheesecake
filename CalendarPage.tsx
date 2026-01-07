
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowLeft, ArrowRight, Info, X, Lightbulb, Filter, XCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { EVENTS_2026, WEEKDAYS, MONTHS } from './constants';
import { CalendarEvent, DayData, EventType } from './types';

// Helper to determine styles based on event type
const getEventStyles = (type?: string) => {
  switch (type) {
    case 'holiday':
      return 'bg-cal-holiday text-cal-holidayText border-cal-holiday';
    case 'commemorative':
      return 'bg-cal-commemorative text-cal-commemorativeText border-cal-commemorative';
    case 'special':
      return 'bg-cal-special text-cal-specialText border-cal-special';
    default:
      return 'bg-white text-gray-500 hover:bg-slate-50 border-transparent';
  }
};

const getEventColorRaw = (type?: string) => {
  switch (type) {
    case 'holiday': return '#bae6fd'; // sky-200
    case 'commemorative': return '#fef08a'; // yellow-200
    case 'special': return '#e9d5ff'; // purple-200
    default: return '#f1f5f9'; // slate-100
  }
}

const CalendarPage: React.FC = () => {
  // Start in January 2026
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<EventType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Ref for modal focus management
  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDayClick = (dayEvents: CalendarEvent[]) => {
    if (dayEvents && dayEvents.length > 0) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setSelectedDayEvents(dayEvents);
    }
  };

  const closeModal = () => {
    setSelectedDayEvents(null);
    // Return focus to the element that opened the modal
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  };

  const toggleFilter = (type: EventType) => {
    setActiveFilter(prev => prev === type ? null : type);
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedDayEvents) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDayEvents]);

  // Focus modal close button when opened
  useEffect(() => {
    if (selectedDayEvents && modalCloseButtonRef.current) {
      modalCloseButtonRef.current.focus();
    }
  }, [selectedDayEvents]);

  // Calendar Grid Logic
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'yyyy-MM-dd';
    const daysInInterval = eachDayOfInterval({ start: startDate, end: endDate });

    return daysInInterval.map((day) => {
      const formattedDate = format(day, dateFormat);
      
      // First get all events for this day
      let dayEvents = EVENTS_2026.filter((e) => e.date === formattedDate);

      // Then apply filter if active
      if (activeFilter) {
        dayEvents = dayEvents.filter(e => e.type === activeFilter);
      }

      return {
        date: day,
        isCurrentMonth: isSameMonth(day, monthStart),
        isToday: isSameDay(day, new Date()),
        events: dayEvents,
      } as DayData;
    });
  }, [currentDate, activeFilter]); // Re-calculate when filter changes

  return (
    <div className="min-h-screen bg-[#f8fafc] text-brand-dark p-4 md:p-8 flex flex-col lg:flex-row gap-8">
      
      {/* LEFT CONTENT: CALENDAR */}
      <main className="flex-1 flex flex-col gap-6 w-full max-w-[100vw] overflow-hidden" role="main">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
            <h1 className="text-3xl md:text-5xl font-bold text-brand-dark tracking-tight capitalize">
              {format(currentDate, 'MMMM', { locale: ptBR })}
            </h1>
            
            {/* Navigation Pill */}
            <nav className="flex items-center bg-white border border-brand-dark/20 rounded-full px-2 py-1 shadow-sm" aria-label="Navegação de meses">
              <button 
                onClick={prevMonth}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                aria-label="Mês anterior"
              >
                <ArrowLeft size={20} />
              </button>
              <span className="w-px h-6 bg-slate-200 mx-1" aria-hidden="true"></span>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                aria-label="Próximo mês"
              >
                <ArrowRight size={20} />
              </button>
            </nav>
          </div>

          <div className="text-left md:text-right hidden md:block">

            <h2 className="text-xl text-slate-600 font-light">Calendário de Conteúdo 2026</h2>
          </div>
        </header>

        {/* Mobile Title View */}
        <div className="md:hidden flex justify-between items-center text-sm px-1">

           <span className="text-slate-600">2026</span>
        </div>

        {/* Calendar Container */}
        <div className="bg-white/50 rounded-3xl p-2 md:p-6 shadow-sm border border-slate-100 flex flex-col">
          
          {/* Scrollable Area Wrapper for Mobile Readability */}
          <div className="overflow-x-auto pb-2 scrollbar-hide">
            <div className="min-w-[800px] md:min-w-0">
              
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 mb-4" role="row">
                {WEEKDAYS.map((day) => (
                  <div key={day} role="columnheader" aria-label={day} className="text-center text-lg md:text-xl font-medium text-brand-dark/80 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2 md:gap-4 auto-rows-fr" role="grid">
                {calendarDays.map((dayData, idx) => {
                  const hasEvent = dayData.events.length > 0;
                  const mainEvent = dayData.events[0];
                  
                  // Formatted date string for labels
                  const dateLabel = format(dayData.date, "d 'de' MMMM", { locale: ptBR });
                  const eventsLabel = hasEvent 
                    ? `, ${dayData.events.length} evento${dayData.events.length > 1 ? 's' : ''}: ${dayData.events.map(e => e.title).join(', ')}`
                    : '';
                  
                  // If it's not current month, show plain faded number
                  if (!dayData.isCurrentMonth) {
                    return (
                      <div 
                        key={idx} 
                        className="min-h-[100px] md:min-h-[140px] p-3 rounded-2xl bg-slate-50/50 flex flex-col justify-start opacity-40"
                        aria-hidden="true"
                      >
                        <span className="text-lg font-medium text-slate-400">{format(dayData.date, 'd')}</span>
                      </div>
                    );
                  }

                  const cardColorClass = hasEvent 
                    ? getEventStyles(mainEvent.type) + ' cursor-pointer hover:brightness-95 active:scale-[0.98]' 
                    : 'bg-white border border-slate-100 hover:border-brand-primary/30 hover:shadow-md transition-all';
                  
                  const commonClasses = `
                    relative min-h-[100px] md:min-h-[140px] p-3 md:p-4 rounded-[20px] flex flex-col justify-between transition-all duration-200 text-left w-full
                    ${cardColorClass}
                    ${hasEvent ? 'border-0' : ''}
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary
                  `;

                  // Use button for interactive days (with events), div for others
                  if (hasEvent) {
                    return (
                      <button 
                        key={idx}
                        onClick={() => handleDayClick(dayData.events)}
                        className={`${commonClasses} group`}
                        aria-label={`${dateLabel}${eventsLabel}. Clique para ver detalhes.`}
                      >
                        <span className="text-xl md:text-2xl font-medium">
                          {format(dayData.date, 'd')}
                        </span>

                        <div className="flex flex-col gap-1 mt-2 w-full">
                          {dayData.events.map((evt, i) => (
                            <span 
                              key={i} 
                              className="text-[11px] md:text-xs leading-tight font-medium opacity-90 line-clamp-3 text-left"
                            >
                              {evt.title}
                            </span>
                          ))}
                        </div>

                        {/* Tooltip on Hover */}
                        <div 
                          className="absolute bottom-[105%] left-1/2 -translate-x-1/2 w-max max-w-[200px] hidden group-hover:flex flex-col gap-2 bg-slate-800 text-white text-xs p-3 rounded-xl shadow-xl z-20 pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 origin-bottom"
                          role="tooltip"
                        >
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
                          {dayData.events.map((evt, i) => (
                            <div key={i} className="flex items-start gap-2 text-left">
                               <Info size={14} className="mt-0.5 text-brand-primary shrink-0" />
                               <span className="font-medium leading-tight">{evt.title}</span>
                            </div>
                          ))}
                        </div>
                      </button>
                    );
                  } else {
                    return (
                      <div key={idx} className={commonClasses}>
                        <span className="text-xl md:text-2xl font-medium text-brand-dark">
                          {format(dayData.date, 'd')}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>

            </div>
          </div>
          
          {/* Mobile Swipe Hint */}
          <div className="lg:hidden text-center mt-2 text-slate-400 text-xs flex items-center justify-center gap-2" aria-hidden="true">
             <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
             <span>Deslize horizontalmente para ver a semana inteira</span>
             <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          </div>

        </div>

      </main>

      {/* RIGHT SIDEBAR: LEGEND */}
      <aside className={`transition-all duration-300 ease-in-out relative ${isSidebarOpen ? 'w-full lg:w-80' : 'w-full lg:w-0'} flex-shrink-0`} aria-label="Filtros e Legenda">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-8 -left-4 z-20 bg-white border border-slate-100 text-slate-400 hover:text-brand-dark p-1.5 rounded-full shadow-sm hidden lg:flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          title={isSidebarOpen ? "Recolher painel" : "Expandir painel"}
        >
          {isSidebarOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <div className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden lg:block lg:pointer-events-none'}`}>
          <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100 sticky top-8 w-full lg:w-80">
            <div className="mb-8 text-center">
              <h3 className="text-brand-dark text-lg font-medium flex items-center justify-center gap-2">
                <Filter size={18} aria-hidden="true" /> Filtrar por Tipo
              </h3>
              {activeFilter && (
                <button 
                  onClick={() => setActiveFilter(null)}
                  className="text-xs text-red-500 flex items-center justify-center gap-1 mx-auto mt-2 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1"
                  aria-label="Limpar filtro"
                >
                  <XCircle size={12} aria-hidden="true" /> Limpar filtro
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4" role="group" aria-label="Filtros de eventos">
              <button
                onClick={() => toggleFilter('holiday')}
                aria-pressed={activeFilter === 'holiday'}
                className={`
                  w-full py-3 px-6 rounded-2xl text-center text-sm font-medium shadow-sm transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cal-holiday
                  ${activeFilter === 'holiday' || activeFilter === null 
                    ? 'bg-cal-holiday text-cal-holidayText opacity-100' 
                    : 'bg-slate-50 text-slate-400 opacity-60 hover:opacity-100'}
                  ${activeFilter === 'holiday' ? 'ring-2 ring-cal-holidayText ring-offset-2 scale-[1.02]' : ''}
                `}
              >
                Feriados
              </button>
              
              <button
                onClick={() => toggleFilter('commemorative')}
                aria-pressed={activeFilter === 'commemorative'}
                className={`
                  w-full py-3 px-6 rounded-2xl text-center text-sm font-medium shadow-sm transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cal-commemorative
                  ${activeFilter === 'commemorative' || activeFilter === null 
                    ? 'bg-cal-commemorative text-cal-commemorativeText opacity-100' 
                    : 'bg-slate-50 text-slate-400 opacity-60 hover:opacity-100'}
                  ${activeFilter === 'commemorative' ? 'ring-2 ring-cal-commemorativeText ring-offset-2 scale-[1.02]' : ''}
                `}
              >
                Datas Comemorativas
              </button>

              <button
                onClick={() => toggleFilter('special')}
                aria-pressed={activeFilter === 'special'}
                className={`
                  w-full py-3 px-6 rounded-2xl text-center text-sm font-medium shadow-sm transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cal-special
                  ${activeFilter === 'special' || activeFilter === null 
                    ? 'bg-cal-special text-cal-specialText opacity-100' 
                    : 'bg-slate-50 text-slate-400 opacity-60 hover:opacity-100'}
                  ${activeFilter === 'special' ? 'ring-2 ring-cal-specialText ring-offset-2 scale-[1.02]' : ''}
                `}
              >
                Datas Especiais
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100">
               <h4 className="text-brand-dark/70 text-sm font-medium mb-4 flex items-center gap-2">
                 <Info size={16} aria-hidden="true" /> Navegação Rápida
               </h4>
               <div className="grid grid-cols-3 gap-2" role="group" aria-label="Meses do ano">
                  {MONTHS.map((m, i) => (
                    <button 
                      key={m}
                      onClick={() => setCurrentDate(new Date(2026, i, 1))}
                      aria-label={`Ir para ${m}`}
                      aria-current={currentDate.getMonth() === i ? 'date' : undefined}
                      className={`
                        text-xs py-2 px-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50
                        ${currentDate.getMonth() === i 
                          ? 'bg-brand-dark text-white' 
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}
                      `}
                    >
                      {m.substring(0, 3)}
                    </button>
                  ))}
               </div>
            </div>

             <div className="mt-8 text-center">
                <p className="text-xs text-slate-400">
                  Feriados regionais aplicados para: <br/>
                  <strong className="text-slate-600">Estado de São Paulo</strong>
                </p>
             </div>

             <div className="mt-8 text-center text-xs text-slate-400 pt-4 border-t border-slate-100">
                <p>2026 - Desenvolvido por <a href="https://instagram.com/orbee360" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors font-medium">Orbee360</a></p>
             </div>
          </div>
        </div>
      </aside>

      {/* MODAL */}
      {selectedDayEvents && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-brand-dark/30 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          ></div>

          {/* Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {selectedDayEvents.map((evt, idx) => (
              <div key={idx} className={idx > 0 ? "border-t border-slate-100" : ""}>
                 {/* Header Color Strip */}
                 <div 
                  className="h-3 w-full" 
                  style={{ backgroundColor: getEventColorRaw(evt.type) }}
                  aria-hidden="true"
                 ></div>
                 
                 <div className="p-6 md:p-8">
                   <div className="flex justify-between items-start mb-4">
                      <h3 id={idx === 0 ? "modal-title" : undefined} className="text-2xl font-bold text-brand-dark leading-tight">
                        {evt.title}
                      </h3>
                      {idx === 0 && (
                        <button 
                          ref={modalCloseButtonRef}
                          onClick={closeModal} 
                          className="text-slate-400 hover:text-brand-dark transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          aria-label="Fechar detalhes"
                        >
                          <X size={24} aria-hidden="true" />
                        </button>
                      )}
                   </div>

                   <div className="space-y-6">
                      {/* Description Section */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Info size={14} aria-hidden="true" /> Sobre a data
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          {evt.description || "Sem descrição disponível."}
                        </p>
                      </div>

                      {/* Business Tip Section */}
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                        <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Lightbulb size={14} aria-hidden="true" /> Dica para o comércio
                        </h4>
                        <p className="text-brand-dark/80 text-sm leading-relaxed font-medium">
                          {evt.businessTip || "Planeje uma promoção temática para este dia."}
                        </p>
                      </div>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default CalendarPage;
