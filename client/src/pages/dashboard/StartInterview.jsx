import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startSession } from '../../services/api';
import { Code, Layout, Brain, Database, Users, Server, Clock, AlertTriangle, ArrowRight, Video, Mic, Shield, Sparkles } from 'lucide-react';

const StartInterview = () => {
    const [domain, setDomain] = useState('DSA');
    const [duration, setDuration] = useState(10);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleStart = async () => {
        setLoading(true);
        try {
            const res = await startSession({ domain, duration });
            localStorage.setItem('currentInterview', JSON.stringify({
                session: res.data.session,
                firstQuestion: res.data.firstQuestion
            }));
            navigate('/chat');
        } catch (err) {
            alert('Failed to start interview: ' + err.message);
            setLoading(false);
        }
    };

    const domains = [
        { id: "DSA", name: "Data Structures", icon: <Code className="w-5 h-5" /> },
        { id: "Web Development", name: "Web Dev", icon: <Layout className="w-5 h-5" /> },
        { id: "Machine Learning", name: "Machine Learning", icon: <Brain className="w-5 h-5" /> },
        { id: "Data Science", name: "Data Science", icon: <Database className="w-5 h-5" /> },
        { id: "HR", name: "HR & Behavioral", icon: <Users className="w-5 h-5" /> },
        { id: "DBMS", name: "Database", icon: <Server className="w-5 h-5" /> }
    ];

    const durations = [
        { value: 10, label: "10 Minutes", desc: "Short mock" },
        { value: 15, label: "15 Minutes", desc: "Standard session" },
        { value: 30, label: "30 Minutes", desc: "Deep dive" }
    ];

    return (
        <div className="animate-slide-up space-y-10 p-10 max-w-6xl">
            {/* Header Section */}
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-4 border border-indigo-100/50">
                    <Video size={12} className="text-indigo-500" /> Session Setup
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 lowercase italic">Preparation Chamber.</h2>
                <p className="text-slate-500 font-bold lowercase tracking-tight">Configure your proctored environment before you begin.</p>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.02)] transition-all">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">

                    {/* Left: Domain & Duration */}
                    <div className="space-y-12">
                        {/* Domain Selection */}
                        <div className="space-y-6">
                            <label className="flex items-center text-xs font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">
                                <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl mr-3 shadow-inner italic">01</span>
                                Select domain
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                {domains.map(d => (
                                    <button
                                        key={d.id}
                                        onClick={() => setDomain(d.id)}
                                        className={`flex items-center gap-4 p-5 rounded-[1.8rem] border-2 transition-all duration-300 ${domain === d.id
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-[0_10px_30px_rgba(99,102,241,0.1)] scale-[1.05] relative z-10'
                                            : 'border-slate-50 bg-white text-slate-400 hover:border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-2xl ${domain === d.id ? 'bg-white text-indigo-600 shadow-sm' : 'bg-gray-50'}`}>
                                            {d.icon}
                                        </div>
                                        <span className="text-sm font-black lowercase tracking-tight truncate">{d.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Duration Selection */}
                        <div className="space-y-6">
                            <label className="flex items-center text-xs font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">
                                <span className="p-2 bg-purple-50 text-purple-600 rounded-xl mr-3 shadow-inner italic">02</span>
                                Session duration
                            </label>
                            <div className="flex gap-4">
                                {durations.map(d => (
                                    <button
                                        key={d.value}
                                        onClick={() => setDuration(d.value)}
                                        className={`flex-1 flex flex-col items-center justify-center py-6 rounded-[1.8rem] border-2 transition-all duration-300 ${duration === d.value
                                            ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-[0_10px_30px_rgba(168,85,247,0.1)] scale-[1.05] relative z-10'
                                            : 'border-slate-50 bg-white text-slate-400 hover:border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        <span className="text-2xl font-black italic mb-1 leading-none">{d.value}m</span>
                                        <span className="text-[9px] uppercase tracking-widest font-black opacity-60">{d.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Checklist & Start */}
                    <div className="flex flex-col h-full bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen blur-[100px] opacity-10 -z-0"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-md">
                                    <Shield size={24} className="text-indigo-400" />
                                </div>
                                <h4 className="text-2xl font-black lowercase tracking-tighter">Integrity check.</h4>
                            </div>

                            <div className="space-y-6 flex-grow">
                                {[
                                    { icon: <Video className="w-5 h-5 text-indigo-400" />, text: "Camera access is absolutely required for evaluation." },
                                    { icon: <Mic className="w-5 h-5 text-purple-400" />, text: "Microphone must be enabled and tested for voice input." },
                                    { icon: <Sparkles className="w-5 h-5 text-amber-400" />, text: "Google Gemini AI will grade your answers in real-time." },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 p-2 bg-white/5 rounded-xl border border-white/5">{item.icon}</div>
                                        <p className="text-sm font-bold text-slate-300 leading-relaxed lowercase tracking-tight">{item.text}</p>
                                    </div>
                                ))}

                                <div className="p-6 bg-rose-500/10 rounded-3xl border border-rose-500/20 text-rose-300 flex items-start gap-4 mt-4">
                                    <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
                                    <p className="text-[13px] font-black lowercase leading-tight tracking-tight">
                                        Strict Proctoring: Switching tabs or closing window will result in an immediate flag.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleStart}
                                disabled={loading}
                                className="mt-12 w-full group relative flex items-center justify-center bg-white text-slate-900 font-black py-6 rounded-[1.8rem] hover:shadow-indigo-500/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 disabled:opacity-50 disabled:translate-y-0 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center text-xs uppercase tracking-[0.2em] italic">
                                    {loading ? 'Initializing AI Engine...' : 'Enter strict environment'}
                                    {!loading && <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" />}
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StartInterview;
