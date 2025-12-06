import React from 'react';
import { Search, Bell, TrendingUp, Clock, Globe, FileText, Coffee, Building2 } from 'lucide-react';
import { Course } from '../types';

interface HomeProps {
    courses: Course[];
    onCourseClick: (course: Course) => void;
    userName: string;
}

export const Home: React.FC<HomeProps> = ({ courses, onCourseClick, userName }) => {
    
    // Split name to get first name
    const firstName = userName.split(' ')[0];

    const quickActions = [
        { icon: Globe, label: 'SIU', color: 'bg-blue-50 text-blue-600' },
        { icon: Building2, label: 'Campus', color: 'bg-orange-50 text-orange-600' },
        { icon: FileText, label: 'Trámites', color: 'bg-green-50 text-green-600' },
        { icon: Coffee, label: 'Menú', color: 'bg-purple-50 text-purple-600' },
    ];

    const news = [
        { id: 1, title: 'Inscripciones abiertas', subtitle: '2do Cuatrimestre', color: 'bg-slate-800 text-white' },
        { id: 2, title: 'Becas Sarmiento', subtitle: 'Fecha límite: 20 Oct', color: 'bg-white border border-gray-200 text-slate-800' },
        { id: 3, title: 'Taller de Diseño', subtitle: 'Aula Magna', color: 'bg-uba-yellow text-uba-dark' },
    ];

    return (
        <div className="pb-24 pt-6 bg-gray-50 min-h-screen">
            {/* Header Sticky */}
            <div className="sticky top-0 bg-gray-50/95 backdrop-blur-sm z-40 px-6 pb-2 pt-2">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-gray-500 text-sm font-medium">¡Buenos días!</h2>
                        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            {firstName}
                            <span className="text-2xl">👋</span>
                        </h1>
                    </div>
                    <div className="bg-white p-2.5 rounded-full shadow-sm border border-gray-100 relative cursor-pointer hover:bg-gray-50 transition-colors">
                        <Bell size={22} className="text-gray-600" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-2">
                    <input 
                        type="text" 
                        placeholder="Buscar materias, aulas, sedes..." 
                        className="w-full bg-white border-none py-3.5 pl-11 pr-4 rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-yellow-400 outline-none placeholder-gray-400 transition-shadow"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </div>

            <div className="px-6">
                
                {/* News Horizontal Scroll */}
                <div className="mb-8 overflow-x-auto no-scrollbar -mx-6 px-6 pt-2">
                    <div className="flex gap-3">
                        {news.map(item => (
                            <div key={item.id} className={`flex-shrink-0 w-40 p-4 rounded-2xl flex flex-col justify-between h-24 shadow-sm ${item.color}`}>
                                <p className="font-bold text-sm leading-tight">{item.title}</p>
                                <p className="text-[10px] opacity-80 font-medium uppercase tracking-wide">{item.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <h3 className="font-bold text-slate-800 text-lg mb-4">Accesos Rápidos</h3>
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {quickActions.map((action, idx) => (
                        <button key={idx} className="flex flex-col items-center gap-2 group">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-active:scale-95 ${action.color}`}>
                                <action.icon size={24} />
                            </div>
                            <span className="text-xs font-medium text-gray-500 group-hover:text-slate-800">{action.label}</span>
                        </button>
                    ))}
                </div>

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-uba-yellow to-yellow-500 rounded-3xl p-6 mb-8 text-uba-dark shadow-lg shadow-yellow-200">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-bold text-lg">Tu Progreso Semestral</p>
                            <p className="text-sm opacity-80">Mantén el ritmo 🔥</p>
                        </div>
                        <div className="bg-white/30 p-2 rounded-full">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                    <div className="flex gap-4 mt-2">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl flex-1 text-center">
                            <span className="block text-2xl font-bold">85%</span>
                            <span className="text-xs font-medium">Asistencia</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl flex-1 text-center">
                            <span className="block text-2xl font-bold">4</span>
                            <span className="text-xs font-medium">Materias</span>
                        </div>
                    </div>
                </div>

                {/* Popular Courses Header */}
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-xl font-bold text-slate-800">Cursos Populares</h3>
                    <button className="text-yellow-600 text-sm font-semibold hover:text-yellow-700">Ver todos</button>
                </div>
            </div>

            {/* Horizontal Scroll Courses (Full Bleed) */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-6 mb-4">
                {courses.map((course) => (
                    <div 
                        key={course.id}
                        onClick={() => onCourseClick(course)}
                        className="bg-white p-4 rounded-3xl shadow-sm min-w-[200px] border border-gray-100 flex flex-col active:scale-95 transition-transform"
                    >
                        <div className={`h-24 w-full rounded-2xl mb-3 ${course.color} relative overflow-hidden`}>
                           <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                           <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-lg text-[10px] font-bold uppercase">
                                {course.category}
                           </div>
                        </div>
                        <h4 className="font-bold text-slate-800 mb-1 line-clamp-1">{course.title}</h4>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                            <Clock size={12} />
                            <span>{course.lessons} lecciones</span>
                        </div>
                        <div className="mt-auto pt-2 border-t border-gray-50 flex justify-between items-center">
                             <div className="text-xs font-bold text-slate-400">Progreso</div>
                             <div className="text-xs font-bold text-yellow-600">{course.progress}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};