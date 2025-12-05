import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MedicationManager from './pages/Medication';
import HealthAnalytics from './pages/Analytics';
import TCMConstitution from './pages/TCM';
import DoctorConsultation from './pages/Doctors';
import HelpCenter from './pages/Help';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard />;
            case 'medication':
                return <MedicationManager />;
            case 'analytics':
                return <HealthAnalytics />;
            case 'tcm':
                return <TCMConstitution />;
            case 'doctors':
                return <DoctorConsultation />;
            case 'help':
                return <HelpCenter />;
            default:
                return <Dashboard />;
        }
    };

    const getPageTitle = () => {
        switch (currentPage) {
            case 'dashboard': return '健康概览';
            case 'medication': return '用药管理';
            case 'analytics': return '数据看板';
            case 'tcm': return '体质辨识';
            case 'doctors': return '医生咨询';
            case 'help': return '帮助中心';
            default: return '首页';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
            
            {/* Mobile Sidebar */}
            <div className={`md:hidden fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <Sidebar currentPage={currentPage} setCurrentPage={(page) => { setCurrentPage(page); setSidebarOpen(false); }} />
            </div>

            {/* Desktop Sidebar */}
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="bg-white shadow-sm border-b border-gray-100 p-4 flex items-center justify-between md:hidden sticky top-0 z-10">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(true)} className="p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-lg font-bold text-gray-800">{getPageTitle()}</h1>
                    </div>
                    <img src="https://picsum.photos/32/32" alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />
                </header>

                <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;