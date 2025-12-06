import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen'; // Import Login
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { ImportantDates } from './pages/ImportantDates';
import { CoursesList } from './pages/CoursesList';
import { Profile } from './pages/Profile';
import { AIAssistant } from './components/AIAssistant';
import { Course, ImportantDate, ViewState, UserProfile } from './types';

// Mock Data
const MOCK_COURSES: Course[] = [
    {
        id: '1',
        title: 'Análisis Matemático II',
        category: 'Grado',
        progress: 65,
        lessons: 24,
        color: 'bg-orange-100',
        image: 'https://picsum.photos/200/200?random=1'
    },
    {
        id: '2',
        title: 'Física I',
        category: 'CBC',
        progress: 30,
        lessons: 32,
        color: 'bg-blue-100',
        image: 'https://picsum.photos/200/200?random=2'
    },
    {
        id: '3',
        title: 'Inglés Técnico',
        category: 'Idiomas',
        progress: 90,
        lessons: 12,
        color: 'bg-purple-100',
        image: 'https://picsum.photos/200/200?random=3'
    },
    {
        id: '4',
        title: 'Sociedad y Estado',
        category: 'CBC',
        progress: 10,
        lessons: 18,
        color: 'bg-green-100',
        image: 'https://picsum.photos/200/200?random=4'
    }
];

const MOCK_DATES: ImportantDate[] = [
    {
        id: '1',
        title: 'Parcial de Análisis II',
        date: '15 Nov',
        type: 'exam',
        description: 'Aula 302, Pabellón 1. 18:00hs'
    },
    {
        id: '2',
        title: 'Día de la Soberanía',
        date: '20 Nov',
        type: 'holiday',
        description: 'Feriado nacional, no hay clases.'
    },
    {
        id: '3',
        title: 'Entrega TP Física',
        date: '23 Nov',
        type: 'administrative',
        description: 'Subir al campus antes de las 23:59.'
    }
];

const App: React.FC = () => {
    // 1. Initialize User from LocalStorage
    const [user, setUser] = useState<UserProfile | null>(() => {
        const savedUser = localStorage.getItem('user_profile');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 2. Determine Initial View based on user existence
    const [view, setView] = useState<ViewState>(() => {
        return user ? ViewState.HOME : ViewState.WELCOME;
    });

    const [isAiOpen, setIsAiOpen] = useState(false);
    const [selectedCourseForAi, setSelectedCourseForAi] = useState<Course | null>(null);

    // Save to localStorage whenever user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user_profile', JSON.stringify(user));
        }
    }, [user]);

    // Handle Start button from Welcome Screen
    const handleStartWelcome = () => {
        setView(ViewState.LOGIN);
    };

    // Handle Login Submit
    const handleLogin = (newUser: UserProfile) => {
        setUser(newUser);
        setView(ViewState.HOME);
    };

    const handleUpdateUser = (updatedUser: UserProfile) => {
        setUser(updatedUser);
    };

    const handleOpenAiWithCourse = (course: Course) => {
        setSelectedCourseForAi(course);
        setIsAiOpen(true);
    };

    const renderContent = () => {
        switch (view) {
            case ViewState.LOGIN:
                return <LoginScreen onLogin={handleLogin} />;
            case ViewState.HOME:
                return user ? <Home courses={MOCK_COURSES} onCourseClick={handleOpenAiWithCourse} userName={user.name} /> : null;
            case ViewState.DATES:
                return <ImportantDates dates={MOCK_DATES} />;
            case ViewState.COURSES:
                return <CoursesList courses={MOCK_COURSES} onOpenAi={handleOpenAiWithCourse} />;
            case ViewState.PROFILE:
                return user ? <Profile user={user} onUpdateUser={handleUpdateUser} /> : null;
            default:
                return null;
        }
    };

    // Determine if we should show the bottom nav (only when logged in and not in welcome/login)
    const showBottomNav = user && view !== ViewState.WELCOME && view !== ViewState.LOGIN;

    return (
        <Router>
            <div className="max-w-md mx-auto bg-gray-50 h-screen relative shadow-2xl overflow-hidden font-sans text-slate-800">
                {view === ViewState.WELCOME ? (
                    <WelcomeScreen onStart={handleStartWelcome} />
                ) : (
                    <>
                        <div className="h-full overflow-y-auto no-scrollbar scroll-smooth">
                            {renderContent()}
                        </div>
                        
                        {showBottomNav && (
                            <BottomNav currentView={view} onChangeView={setView} />
                        )}
                        
                        <AIAssistant 
                            isOpen={isAiOpen} 
                            onClose={() => setIsAiOpen(false)} 
                            activeCourse={selectedCourseForAi}
                        />
                    </>
                )}
            </div>
        </Router>
    );
};

export default App;