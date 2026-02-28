import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardInfo } from '../services/api';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Cell } from 'recharts';
import { Users, Award, TrendingUp, AlertOctagon, Plus, Calendar, Activity, Zap, Star } from 'lucide-react';

const Dashboard = () => {
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Loading your stats...</p>
        </div>
    );

    const { stats, recentInterviews, performanceData, domainData } = data;

    return (
        <div className="min-h-[calc(100vh-4rem)] pt-24 pb-12 relative overflow-hidden bg-gray-50/50">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[35rem] h-[35rem] bg-purple-200/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob [animation-delay:2s]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-slide-up">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-primary-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-white/60">
                            <Activity className="w-3 h-3 text-indigo-500" /> Performance Overview
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Dashboard</h1>
                    </div>
                    <button
                        onClick={() => navigate('/start-interview')}
                        className="group flex items-center bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-[0_10px_30px_rgba(99,102,241,0.3)] transition-all hover:-translate-y-0.5"
                    >
                        <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        New Interview
                    </button>
                </div>

                {/* Stat Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { title: "Total Interviews", value: stats.totalInterviews, desc: "Completed sessions", icon: <Users className="w-6 h-6 text-blue-600" />, bg: "from-blue-50 to-blue-100/50" },
                        { title: "Average Score", value: `${stats.avgScore}/10`, desc: "Across all domains", icon: <TrendingUp className="w-6 h-6 text-indigo-600" />, bg: "from-indigo-50 to-indigo-100/50" },
                        { title: "Best Score", value: `${stats.bestScore}/10`, desc: "Personal highest", icon: <Award className="w-6 h-6 text-amber-600" />, bg: "from-amber-50 to-amber-100/50" },
                        { title: "Total Alerts", value: stats.totalAlerts, desc: "Instances flagged", icon: <AlertOctagon className="w-6 h-6 text-rose-600" />, bg: "from-rose-50 to-rose-100/50" },
                    ].map((s, idx) => (
                        <div key={idx} className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all group relative overflow-hidden">
                            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${s.bg} rounded-full blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-500 -z-0`}></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${s.bg} shadow-sm inline-flex`}>{s.icon}</div>
                                </div>
                                <h4 className="text-gray-500 font-semibold mb-1">{s.title}</h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">{s.value}</span>
                                </div>
                                <p className="text-sm text-gray-400 font-medium mt-1">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity -z-10"></div>
                        <h3 className="text-xl font-extrabold text-gray-900 mb-2">Performance Trend</h3>
                        <p className="text-gray-500 font-medium text-sm mb-8">Your overall score progression over time.</p>

                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
                                    />
                                    <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" activeDot={{ r: 8, strokeWidth: 0, fill: '#4f46e5' }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity -z-10"></div>
                        <h3 className="text-xl font-extrabold text-gray-900 mb-2">Domain Proficiency</h3>
                        <p className="text-gray-500 font-medium text-sm mb-8">Average scores across different technical areas.</p>

                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={domainData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="domain" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="avgScore" radius={[8, 8, 8, 8]} barSize={40}>
                                        {domainData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#6366f1'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recent Interviews Table */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100/80 bg-white/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg"><Calendar className="w-5 h-5 text-indigo-600" /></div>
                            <h3 className="text-xl font-extrabold text-gray-900">Recent Sessions</h3>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-8 py-5">Topic / Domain</th>
                                    <th className="px-8 py-5">Date Taken</th>
                                    <th className="px-8 py-5">Final Score</th>
                                    <th className="px-8 py-5">Proctor Alerts</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentInterviews.map((int, idx) => (
                                    <tr key={idx} onClick={() => navigate(`/results/${int.id}`)} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                                        <td className="px-8 py-5">
                                            <div className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{int.domain}</div>
                                        </td>
                                        <td className="px-8 py-5 text-gray-500 font-medium">
                                            {new Date(int.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-sm">
                                                <Star className="w-3 h-3 mr-1" /> {int.totalScore}/10
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            {int.alertCount > 0 ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                                                    <AlertOctagon className="w-3 h-3 mr-1" /> {int.alertCount} Flags
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                    Clean
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {recentInterviews.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                    <Zap className="w-8 h-8 text-gray-300" />
                                                </div>
                                                <h3 className="text-gray-900 font-bold text-lg mb-1">No interviews yet</h3>
                                                <p className="text-gray-500">Kickstart your preparation by taking your first mock interview.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
