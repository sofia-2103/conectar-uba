import React from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { ImportantDate } from '../types';

interface ImportantDatesProps {
    dates: ImportantDate[];
}

export const ImportantDates: React.FC<ImportantDatesProps> = ({ dates }) => {
    const currentMonth = "Noviembre 2024";

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'exam': return 'bg-red-100 text-red-600 border-red-200';
            case 'holiday': return 'bg-green-100 text-green-600 border-green-200';
            default: return 'bg-blue-100 text-blue-600 border-blue-200';
        }
    };

    return (
        <div className="pb-24 pt-6 px-6 bg-gray-50 min-h-screen">
             <h1 className="text-2xl font-bold text-slate-800 mb-6">Calendario Académico</h1>

             {/* Month Selector */}
             <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex justify-between items-center">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={20} className="text-gray-400" />
                </button>
                <span className="font-bold text-lg text-slate-800">{currentMonth}</span>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronRight size={20} className="text-gray-400" />
                </button>
             </div>

             {/* Days strip (Visual only for UI match) */}
             <div className="flex justify-between mb-8 text-center bg-white p-4 rounded-2xl shadow-sm">
                 {['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'].map((day, i) => (
                     <div key={day} className={`flex flex-col items-center gap-1 ${i === 3 ? 'text-yellow-600' : 'text-gray-400'}`}>
                         <span className="text-xs font-bold">{day}</span>
                         <span className={`text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full ${i === 3 ? 'bg-yellow-400 text-white shadow-md' : ''}`}>
                             {10 + i}
                         </span>
                     </div>
                 ))}
             </div>

             {/* Events List */}
             <div className="space-y-4">
                 <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-2">Próximos Eventos</h3>
                 {dates.map((event) => (
                     <div key={event.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${getTypeStyles(event.type)}`}>
                             {event.type === 'exam' ? <AlertCircle size={24} /> : <CalendarIcon size={24} />}
                         </div>
                         <div className="flex-1">
                             <div className="flex justify-between items-start">
                                 <h4 className="font-bold text-slate-800">{event.title}</h4>
                                 <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{event.date}</span>
                             </div>
                             <p className="text-xs text-gray-500 mt-1 line-clamp-1">{event.description}</p>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};