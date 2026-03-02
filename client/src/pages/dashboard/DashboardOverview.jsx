import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardInfo } from '../services/api';
import { Users, Award, TrendingUp, AlertOctagon, Plus, Calendar, Activity, Zap, Star, Monitor, ShieldAlert, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DashboardOverview = () => {
    const [data, setData] = useState(null);
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
            <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">building overview...</p>
        </div>
    );

    const { stats, recentInterviews, performanceData } = data;

    const cards = [
        { title: "Sessions Taken", value: stats.totalInterviews, desc: "Total sessions", icon: <Users className="w-7 h-7 text-indigo-600" />, bg: "from-indigo-50 to-indigo-100/50" },
        { title: "Average Score", value: `${stats.avgScore}/10`, desc: "Your overall average", icon: <TrendingUp className="w-7 h-7 text-amber-600" />, bg: "from-amber-50 to-amber-100/50" },
        { title: "Best Score", value: `${stats.bestScore}/10`, desc: "Your highest score", icon: <Award className="w-7 h-7 text-emerald-600" />, bg: "from-emerald-50 to-emerald-100/50" },
        { title: "Total Alerts", value: stats.totalAlerts, desc: "Rules broken", icon: <AlertOctagon className="w-7 h-7 text-rose-600" />, bg: "from-rose-50 to-rose-100/50" },
    ];

    return (
        <div className="animate-slide-up space-y-10 p-10 max-w-7xl">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm border border-indigo-100">
                        <Activity className="w-3 h-3 text-indigo-500" /> Welcome back
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 lowercase">Dashboard overview</h2>
                    <p className="text-slate-500 font-bold lowercase tracking-tight">track your performance at a glance.</p>
                </div>
                <button
                    onClick={() => navigate('/dashboard/start')}
                    className="group flex items-center bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-gray-200 hover:shadow-indigo-200 hover:bg-slate-950 hover:-translate-y-1 transition-all"
                >
                    <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-500" />
                    New Interview
                </button>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((s, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-[0_15px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden">
                        <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${s.bg} rounded-full blur-[60px] opacity-40 group-hover:scale-200 transition-transform duration-500 -z-0`}></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-[1.5rem] bg-gradient-to-br ${s.bg} shadow-sm inline-flex group-hover:-translate-y-1 transition-transform`}>{s.icon}</div>
                            </div>
                            <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">{s.title}</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-slate-900 italic">{s.value}</span>
                            </div>
                            <p className="text-xs text-slate-400 font-bold lowercase tracking-tight mt-1">{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Simplified Growth Chart */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.02)] group hover:shadow-[0_20px_80px_rgba(0,0,0,0.04)] transition-all overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-indigo-50/50 rounded-full mix-blend-multiply blur-[100px] opacity-40 group-hover:scale-110 transition-transform -z-10"></div>

                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 lowercase tracking-tighter mb-1">Growth Curve</h3>
                            <p className="text-sm font-bold text-slate-400 lowercase tracking-tight">Recent progress over time.</p>
                        </div>
                        <button onClick={() => navigate('/dashboard/analytics')} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                            <ArrowRight size={20} />
                        </button>
                    </div>

                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontStyle: 'italic', fontWeight: 'black' }} dy={10} />
                                <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontStyle: 'italic', fontWeight: 'black' }} />
                                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#colorScore)" activeDot={{ r: 8, strokeWidth: 0, fill: '#4f46e5' }} />
                                <Tooltip
                                    cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }}
                                    contentStyle={{ backgroundColor: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Info Card or Tip Section */}
                <div className="bg-slate-900 rounded-[3rem] p-10 flex flex-col justify-between group overflow-hidden relative text-white shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen blur-[100px] opacity-20 group-hover:scale-120 transition-transform -z-0"></div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white rounded-[2rem] flex items-center justify-center text-slate-900 shadow-xl shadow-black/20 mb-10 group-hover:rotate-6 transition-transform">
                            <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
                        </div>
                        <h3 className="text-3xl font-black lowercase tracking-tighter mb-4 italic leading-tight">your best is yet to come.</h3>
                        <p className="text-slate-400 font-bold lowercase tracking-tight leading-relaxed">Each interview session refines your thinking. review your weak areas in the reports section to improve faster.</p>
                    </div>

                    <button
                        onClick={() => navigate('/dashboard/reports')}
                        className="relative z-10 mt-12 bg-white text-slate-900 px-8 py-4 rounded-2xl flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:-translate-y-1 hover:shadow-indigo-500/20 transition-all group/btn"
                    >
                        Review reports
                        <ArrowRight size={18} className="translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Quick Session Table (Condensed) */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="px-10 py-7 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 lowercase tracking-tighter italic">Recent Activity</h3>
                    <button onClick={() => navigate('/dashboard/history')} className="text-indigo-600 font-black text-[10px] uppercase tracking-widest lowercase">view all history</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-slate-50">
                            {recentInterviews.slice(0, 3).map((int, idx) => (
                                <tr key={idx} onClick={() => navigate(`/results/${int.id}`)} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-sm italic border border-indigo-100/50 shadow-inner group-hover:scale-110 transition-transform">
                                                {int.domain[0].toUpperCase()}
                                            </div>
                                            <span className="font-black text-slate-800 lowercase tracking-tight text-lg group-hover:text-indigo-600 transition-colors uppercase">{int.domain}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <div className="text-[11px] text-slate-400 font-black uppercase tracking-[0.1em]">{new Date(int.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-100 shadow-sm text-sm font-black text-slate-800">
                                            <Star size={12} className="text-amber-400 fill-amber-400" />
                                            {int.totalScore}/10
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
