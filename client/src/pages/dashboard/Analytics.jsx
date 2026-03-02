import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardInfo } from '../services/api';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Activity, Star, Calendar, PieChart, TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';

const Analytics = () => {
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
            <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">analyzing your growth...</p>
        </div>
    );

    const { performanceData, domainData } = data;

    // Additional radar chart data for a professional look
    const skillData = [
        { subject: 'Technical', A: 85, fullMark: 100 },
        { subject: 'Communication', A: 90, fullMark: 100 },
        { subject: 'Clarity', A: 75, fullMark: 100 },
        { subject: 'Confidence', A: 80, fullMark: 100 },
        { subject: 'Speed', A: 70, fullMark: 100 },
    ];

    return (
        <div className="animate-slide-up space-y-10 p-10 max-w-7xl">
            {/* Header */}
            <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 lowercase">performance analytics</h2>
                <p className="text-slate-500 font-bold lowercase tracking-tight">visualize your interview progress and domain mastery.</p>
            </div>

            {/* Main Growth Tracker */}
            <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.03)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-50/50 rounded-full mix-blend-multiply blur-[100px] opacity-60 group-hover:scale-110 transition-transform duration-700 -z-10"></div>

                <div className="flex justify-between items-start mb-12">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-indigo-50 rounded-3xl border border-indigo-100/50 shadow-sm transition-transform group-hover:scale-110">
                            <TrendingUp className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 lowercase tracking-tighter mb-1">Growth Journey</h3>
                            <p className="text-sm font-bold text-slate-400 lowercase tracking-tight">how your score is moving session after session.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-600 px-6 py-2.5 rounded-2xl text-white shadow-lg">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-0.5 opacity-80">Final Grade</p>
                            <span className="text-xl font-black italic">8.5/10</span>
                        </div>
                    </div>
                </div>

                <div className="h-[400px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorScoreV2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} dy={15} />
                            <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px' }}
                                itemStyle={{ color: '#4f46e5', fontWeight: '900', fontSize: '16px' }}
                                cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }}
                            />
                            <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#colorScoreV2)" activeDot={{ r: 10, strokeWidth: 0, fill: '#4f46e5', shadow: '0 10px 10px rgba(79,70,229,0.5)' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Grid for small charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Domain Mastery */}
                <div className="bg-white/80 p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.02)] group overflow-hidden relative">
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply blur-[80px] -z-10"></div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 bg-purple-50 rounded-3xl border border-purple-100/50 shadow-sm group-hover:rotate-6 transition-transform">
                            <Target className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 lowercase tracking-tighter">Domain Mastery</h3>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={domainData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="domain" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'black' }} dy={10} />
                                <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'black' }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc', radius: 16 }}
                                    contentStyle={{ backgroundColor: 'white', borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                                />
                                <Bar dataKey="avgScore" barSize={32} radius={12}>
                                    {domainData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#a855f7'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Radar Skill View */}
                <div className="bg-white/80 p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.02)] group overflow-hidden relative">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-50 rounded-full mix-blend-multiply blur-[80px] -z-10"></div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 bg-emerald-50 rounded-3xl border border-emerald-100/50 shadow-sm group-hover:-rotate-6 transition-transform">
                            <Activity className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 lowercase tracking-tighter">Core Competencies</h3>
                    </div>

                    <div className="h-[300px] w-full flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                <PolarGrid stroke="#f1f5f9" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'black' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Score"
                                    dataKey="A"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fill="#10b981"
                                    fillOpacity={0.1}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
