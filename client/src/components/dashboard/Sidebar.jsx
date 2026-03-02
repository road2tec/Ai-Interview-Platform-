import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    PlayCircle,
    History,
    BarChart3,
    FileText,
    ShieldAlert,
    ChevronRight,
    LogOut
} from 'lucide-react';

const Sidebar = ({ onItemClick }) => {
    const location = useLocation();

    const menuItems = [
        { id: 'overview', label: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'start', label: 'Start Interview', path: '/dashboard/start', icon: <PlayCircle size={20} /> },
        { id: 'history', label: 'History', path: '/dashboard/history', icon: <History size={20} /> },
        { id: 'analytics', label: 'Analytics', path: '/dashboard/analytics', icon: <BarChart3 size={20} /> },
        { id: 'reports', label: 'Reports', path: '/dashboard/reports', icon: <FileText size={20} /> },
        { id: 'alerts', label: 'Security Alerts', path: '/dashboard/alerts', icon: <ShieldAlert size={20} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-72 bg-white border-r border-slate-100 flex flex-col h-full overflow-y-auto">
            <div className="flex-grow py-8 px-4 space-y-2">
                <div className="px-4 mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Main Menu</p>
                </div>

                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        onClick={onItemClick}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${isActive(item.path)
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className={`${isActive(item.path) ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'} transition-colors`}>
                                {item.icon}
                            </span>
                            <span className="text-sm font-black lowercase tracking-tight">{item.label}</span>
                        </div>
                        {isActive(item.path) && <ChevronRight size={16} />}
                    </Link>
                ))}
            </div>

            <div className="p-6 border-t border-slate-50">
                <div className="bg-rose-50 rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:bg-rose-100 transition-colors" onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-500 shadow-sm transition-transform group-hover:rotate-12">
                            <LogOut size={18} />
                        </div>
                        <span className="text-xs font-black text-rose-600 uppercase tracking-widest">Logout</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
