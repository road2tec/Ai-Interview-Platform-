import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startSession } from '../services/api';
import { Code, Layout, Brain, Database, Users, Server, Clock, AlertTriangle, ArrowRight, Video, Mic, Shield } from 'lucide-react';

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
        <div className="min-h-[calc(100vh-4rem)] pt-24 pb-12 relative overflow-hidden bg-gray-50/50 flex justify-center items-center">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-40 right-10 w-[40rem] h-[40rem] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
                <div className="absolute bottom-10 left-[-20%] w-[35rem] h-[35rem] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob [animation-delay:2s]"></div>
            </div>

            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10 animate-slide-up">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-primary-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-white/60">
                        <Video className="w-3 h-3 text-indigo-500" /> New Session
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Setup Mock Interview</h2>
                    <p className="mt-4 text-gray-500 text-lg">Configure your proctored environment before you begin.</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/60">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Domain Selection */}
                        <div>
                            <label className="flex items-center text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">
                                <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg mr-2"><Code className="w-4 h-4" /></span>
                                Select Domain
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {domains.map(d => (
                                    <button
                                        key={d.id}
                                        onClick={() => setDomain(d.id)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${domain === d.id
                                            ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 shadow-[0_0_20px_rgba(99,102,241,0.15)] scale-[1.02]'
                                            : 'border-gray-100 bg-white text-gray-500 hover:border-indigo-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`mb-2 ${domain === d.id ? 'text-indigo-600' : 'text-gray-400'}`}>
                                            {d.icon}
                                        </div>
                                        <span className="text-sm font-bold">{d.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Duration Section & Warnings */}
                        <div className="flex flex-col">
                            <label className="flex items-center text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">
                                <span className="p-1.5 bg-purple-100 text-purple-700 rounded-lg mr-2"><Clock className="w-4 h-4" /></span>
                                Select Duration
                            </label>
                            <div className="flex gap-3 mb-8">
                                {durations.map(d => (
                                    <button
                                        key={d.value}
                                        onClick={() => setDuration(d.value)}
                                        className={`flex-1 py-3 px-2 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${duration === d.value
                                            ? 'border-purple-500 bg-purple-50/50 text-purple-700 shadow-[0_0_20px_rgba(168,85,247,0.15)] scale-[1.02]'
                                            : 'border-gray-100 bg-white text-gray-500 hover:border-purple-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="font-black text-lg">{d.value}m</span>
                                        <span className="text-[10px] uppercase tracking-wider mt-1 opacity-70 font-bold">{d.desc}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Pre-flight Checklist */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-auto">
                                <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center"><Shield className="w-4 h-4 mr-2 text-green-600" /> Environment Checklist</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-sm font-medium text-gray-600">
                                        <Video className="w-4 h-4 mr-3 text-gray-400" /> Camera access required
                                    </li>
                                    <li className="flex items-center text-sm font-medium text-gray-600">
                                        <Mic className="w-4 h-4 mr-3 text-gray-400" /> Microphone enabled and tested
                                    </li>
                                    <li className="flex items-start text-sm font-medium text-red-600 mt-2 bg-red-50 p-2 rounded-lg border border-red-100">
                                        <AlertTriangle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                                        <span>Proctoring activated: Leaving the tab will immediately result in a failed session flag.</span>
                                    </li>
                                </ul>
                            </div>

                            <button
                                onClick={handleStart}
                                disabled={loading}
                                className="mt-8 w-full group relative flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-5 rounded-2xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:transform-none overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center text-lg">
                                    {loading ? 'Initializing Environment...' : 'Enter strict environment'}
                                    {!loading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartInterview;
