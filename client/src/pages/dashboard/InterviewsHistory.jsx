import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardInfo } from '../services/api';
import { Calendar, Star, AlertOctagon, Zap, ChevronRight, Search, LayoutGrid, List } from 'lucide-react';

const InterviewsHistory = () => {
    const [data, setData] = useState(null);
    const [view, setView] = useState('list'); // 'list' or 'grid'
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDB = async () => {
            try {
                const res = await getDashboardInfo();
                setData(res.data);
            } catch (err) {
                console.error(err);
                if (err.response?.status === 401) navigate('/login');
            }
        };
        fetchDB();
    }, [navigate]);

    if (!data) return (
        <div className="h-full flex flex-col items-center justify-center p-20">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">fetching records...</p>
        </div>
    );

    const { recentInterviews } = data;

    return (
        <div className="animate-slide-up space-y-8 p-10">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 lowercase">interview history</h2>
                    <p className="text-slate-500 font-bold lowercase tracking-tight">track all your previous sessions and feedback.</p>
                </div>

                <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
                    <button
                        onClick={() => setView('list')}
                        className={`p-2 rounded-xl transition-all ${view === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
                    >
                        <List size={20} />
                    </button>
                    <button
                        onClick={() => setView('grid')}
                        className={`p-2 rounded-xl transition-all ${view === 'grid' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
                    >
                        <LayoutGrid size={20} />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            {recentInterviews.length === 0 ? (
                <div className="bg-white/50 border-2 border-dashed border-slate-100 rounded-[3rem] p-24 text-center">
                    <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
                        <Zap className="w-10 h-10 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 lowercase tracking-tighter mb-2">time for your first one.</h3>
                    <p className="text-slate-500 font-bold lowercase tracking-tight max-w-sm mx-auto mb-10">You haven't completed any sessions yet. start now to see your progress.</p>
                    <button onClick={() => navigate('/start-interview')} className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg hover:-translate-y-1 transition-all">Start Interview Free</button>
                </div>
            ) : (
                <div className={view === 'list' ? 'bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] overflow-hidden' : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'}>
                    {view === 'list' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                        <th className="px-10 py-6">Domain / Topic</th>
                                        <th className="px-10 py-6">Session Date</th>
                                        <th className="px-10 py-6">Final Performance</th>
                                        <th className="px-10 py-6">Proctoring Status</th>
                                        <th className="px-10 py-6"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentInterviews.map((int, idx) => (
                                        <tr key={idx} onClick={() => navigate(`/results/${int.id}`)} className="hover:bg-slate-50/50 transition-all group cursor-pointer">
                                            <td className="px-10 py-7">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        {int.domain[0].toUpperCase()}
                                                    </div>
                                                    <div className="font-black text-slate-900 text-lg lowercase tracking-tighter group-hover:text-indigo-600 transition-colors">{int.domain}</div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-7">
                                                <div className="flex items-center gap-2 text-slate-500 font-black lowercase text-sm tracking-tight">
                                                    <Calendar size={16} />
                                                    {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(int.createdAt))}
                                                </div>
                                            </td>
                                            <td className="px-10 py-7">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                                    <Star size={14} className="text-amber-400 fill-amber-400" />
                                                    <span className="text-lg font-black text-slate-900">{int.totalScore}/10</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-7">
                                                {int.alertCount > 0 ? (
                                                    <div className="flex items-center gap-2 text-rose-500 font-black lowercase text-xs tracking-tight bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100/50">
                                                        <AlertOctagon size={14} />
                                                        {int.alertCount} flags detected
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-emerald-600 font-black lowercase text-xs tracking-tight bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100/50">
                                                        clean session
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-10 py-7 text-right">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                                    <ChevronRight size={20} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        recentInterviews.map((int, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate(`/results/${int.id}`)}
                                className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center font-black text-xl shadow-inner italic">
                                        {int.domain[0].toUpperCase()}
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-1.5 text-amber-500 font-black text-lg mb-1">
                                            <Star size={18} fill="currentColor" /> {int.totalScore}/10
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">overall grade</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 lowercase tracking-tighter mb-4 group-hover:text-indigo-600 transition-colors">{int.domain}</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                                        <div className="flex items-center gap-3">
                                            <Calendar size={18} className="text-slate-400" />
                                            <span className="text-xs font-black text-slate-500 lowercase tracking-tight">Attempted on</span>
                                        </div>
                                        <span className="text-sm font-black text-slate-900 lowercase tracking-tight">
                                            {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(new Date(int.createdAt))}
                                        </span>
                                    </div>
                                </div>
                                <button className="w-full flex items-center justify-between bg-slate-900 text-white rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-indigo-600 transition-all shadow-lg group-hover:shadow-indigo-200">
                                    Full report <ChevronRight size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default InterviewsHistory;
