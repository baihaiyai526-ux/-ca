import React from 'react';
import { 
    LayoutDashboard, 
    Activity, 
    Pill, 
    Stethoscope, 
    LineChart, 
    HelpCircle, 
    Settings,
    UserCircle
} from 'lucide-react';

interface SidebarProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
    const menuItems = [
        { id: 'dashboard', label: '健康概览', icon: LayoutDashboard },
        { id: 'records', label: '健康档案', icon: Activity },
        { id: 'tcm', label: '体质辨识', icon: UserCircle },
        { id: 'medication', label: '用药管理', icon: Pill },
        { id: 'analytics', label: '数据看板', icon: LineChart },
        { id: 'doctors', label: '医生咨询', icon: Stethoscope },
        { id: 'help', label: '帮助中心', icon: HelpCircle },
    ];

    return (
        <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg z-20 flex flex-col hidden md:flex">
            <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <Activity className="text-white w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">中医颐养健康</h1>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.id;
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => setCurrentPage(item.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                        isActive 
                                            ? 'bg-emerald-50 text-emerald-600 font-medium' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center space-x-3 px-4 py-3 w-full text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span>系统设置</span>
                </button>
                <div className="mt-4 flex items-center space-x-3 px-4">
                    <img src="https://picsum.photos/40/40" alt="User" className="w-10 h-10 rounded-full border border-gray-200" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">张大爷</p>
                        <p className="text-xs text-gray-500 truncate">VIP 会员</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;