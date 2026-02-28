import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, BrainCircuit, Activity, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';
import { getInterviewDetails } from '../services/api';

const Results = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [evaluations, setEvaluations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (id) {
                try {
                    const res = await getInterviewDetails(id);
                    setEvaluations(res.data.evaluations);
                } catch (err) {
                    console.error("Failed to fetch past results:", err);
                    setError(true);
                }
            } else {
                const resultsStr = localStorage.getItem('interviewResults');
                if (resultsStr) {
                    setEvaluations(JSON.parse(resultsStr));
                }
            }
            setLoading(false);
        };
        fetchResults();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center bg-gray-50/50">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-bold tracking-wide">Retrieving feedback...</p>
            </div>
        );
    }

    if (error || evaluations.length === 0) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-20 bg-gray-50/50">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-6">
                    <ShieldAlert className="w-10 h-10 text-gray-300" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">No Results Found</h2>
                <p className="text-gray-500 mb-8 max-w-md text-center">It looks like this interview session was not completed or the data was lost.</p>
                <button onClick={() => navigate('/dashboard')} className="flex items-center text-white bg-gray-900 hover:bg-gray-800 px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:-translate-y-0.5 group">
                    Return to Dashboard <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        );
    }

    const avgScore = (evaluations.reduce((acc, ev) => acc + (ev.result.technicalScore + ev.result.clarityScore + ev.result.depthScore) / 3, 0) / evaluations.length).toFixed(1);

    return (
        <div className="min-h-[calc(100vh-4rem)] pt-24 pb-20 relative overflow-hidden bg-gray-50/50">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[10%] w-[30rem] h-[30rem] bg-green-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
                <div className="absolute top-[20%] left-[-10%] w-[35rem] h-[35rem] bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob [animation-delay:2s]"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 animate-slide-up">

                {/* Hero Header */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/60 p-10 text-center mb-12 relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="inline-flex items-center justify-center p-4 bg-green-50 rounded-full mb-6 relative">
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                        <CheckCircle2 className="w-12 h-12 text-green-500 relative z-10" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Interview Completed!</h1>
                    <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">Excellent effort. Our Generative AI engine has analyzed your responses. Here is your detailed performance breakdown.</p>

                    <div className="inline-flex flex-col items-center bg-white px-10 py-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Activity className="w-3 h-3" /> Overall Ai Score</div>
                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
                            {avgScore}<span className="text-3xl text-gray-300">/10</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-8 px-2">
                    <BrainCircuit className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-2xl font-extrabold text-gray-900">Detailed Feedback Breakdown</h3>
                </div>

                <div className="space-y-8">
                    {evaluations.map((ev, idx) => {
                        const qScore = (((ev.result.technicalScore + ev.result.clarityScore + ev.result.depthScore) / 3).toFixed(1));

                        return (
                            <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white/60 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300">
                                <div className="bg-white/50 px-8 py-6 border-b border-gray-100/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                                            {idx + 1}
                                        </div>
                                        <h4 className="font-bold text-gray-800 text-lg leading-snug pt-1">{ev.question}</h4>
                                    </div>
                                    <div className="shrink-0 flex items-center justify-center px-4 py-2 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100/50">
                                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mr-2">Score</span>
                                        <span className="font-black text-xl text-emerald-600">{qScore}</span><span className="text-sm font-bold text-emerald-300">/10</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                        <div className="bg-blue-50/50 border border-blue-100/50 p-5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                                            <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Technical</span>
                                            <span className="text-2xl font-black text-blue-900">{ev.result.technicalScore}<span className="text-sm text-blue-300">/10</span></span>
                                        </div>
                                        <div className="bg-purple-50/50 border border-purple-100/50 p-5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                                            <div className="absolute inset-x-0 bottom-0 h-1 bg-purple-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                            <span className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">Clarity</span>
                                            <span className="text-2xl font-black text-purple-900">{ev.result.clarityScore}<span className="text-sm text-purple-300">/10</span></span>
                                        </div>
                                        <div className="bg-amber-50/50 border border-amber-100/50 p-5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                                            <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Depth</span>
                                            <span className="text-2xl font-black text-amber-900">{ev.result.depthScore}<span className="text-sm text-amber-300">/10</span></span>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 relative">
                                        <Zap className="absolute top-6 left-6 w-5 h-5 text-yellow-500" />
                                        <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 pl-8">AI Feedback & Insights</h5>
                                        <p className="text-gray-600 leading-relaxed pl-8">{ev.result.feedback}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16 text-center">
                    <button onClick={() => navigate('/dashboard')} className="group inline-flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-5 px-10 rounded-full hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300">
                        Return to Dashboard <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;
