import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Video, BarChart2, BrainCircuit, Mic, Lock, ShieldCheck, Zap, UserCheck, ArrowRight, PlayCircle, Star } from 'lucide-react';

const Landing = () => {
    return (
        <div className="bg-white flex flex-col items-center overflow-hidden font-sans text-slate-900">

            {/* 1. HERO SECTION (Premium Light Redesign) */}
            <section className="w-full relative min-h-screen flex items-center justify-center pt-40 pb-32">
                {/* Dynamic Colorful Accents */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-100/50 to-transparent rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-gradient-to-tl from-purple-100/50 to-transparent rounded-full blur-[100px]"></div>
                    <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-gradient-to-bl from-pink-50/40 to-transparent rounded-full blur-[80px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                    <div className="lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
                        <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-indigo-100 shadow-sm">
                            <Zap className="w-4 h-4 animate-pulse" />
                            <span>Prepare for your next interview</span>
                        </div>

                        <h1 className="animate-slide-up text-5xl md:text-8xl font-black text-slate-900 tracking-tighter max-w-2xl mb-8 leading-[0.95] [animation-delay:200ms]">
                            Crack Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                                Dream Job.
                            </span>
                        </h1>

                        <p className="animate-slide-up text-lg md:text-xl text-slate-500 mb-12 max-w-lg font-medium leading-relaxed [animation-delay:400ms]">
                            The simplest way to practice interviews. Talk to our AI, get your score, and improve every day until you get hired.
                        </p>

                        <div className="animate-slide-up flex flex-col sm:flex-row gap-5 w-full sm:w-auto [animation-delay:600ms]">
                            <Link to="/register" className="group flex items-center justify-center bg-slate-950 text-white font-black py-5 px-12 rounded-2xl shadow-xl hover:bg-black hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-xs">
                                Start Practicing Free
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a href="#how-it-works" className="flex items-center justify-center bg-white border border-slate-200 text-slate-600 font-black py-5 px-12 rounded-2xl shadow-sm hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">
                                <PlayCircle className="w-5 h-5 mr-2 text-indigo-500" />
                                Watch Demo
                            </a>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="lg:w-1/2 relative animate-slide-up [animation-delay:800ms] flex justify-center">
                        <div className="relative group w-full max-w-2xl">
                            {/* Modern Shadow/Glow */}
                            <div className="absolute -inset-10 bg-indigo-500/10 rounded-[4rem] blur-[80px] opacity-50"></div>

                            {/* Mockup Container */}
                            <div className="relative rounded-[2.5rem] bg-indigo-50/50 backdrop-blur-3xl border border-white p-4 shadow-[0_22px_70px_rgba(0,0,0,0.08)] transform group-hover:scale-[1.02] transition-all duration-700 ease-out">
                                <div className="absolute top-4 left-4 flex gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
                                </div>
                                <img
                                    src="/assets/dashboard-mockup.png"
                                    alt="Interview AI Dashboard"
                                    className="w-full rounded-[1.8rem] shadow-sm mt-6"
                                />

                                {/* Floating Element 1 (Success Rate) */}
                                <div className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 rounded-[2.5rem] animate-float hidden lg:block z-20">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner italic">88</div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Success Rate</p>
                                            <p className="text-sm text-slate-900 font-black">Top Talent</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Element 2 (Interview Ready) */}
                                <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-5 rounded-[2rem] hidden lg:flex items-center gap-4 animate-float-delayed border border-white z-20">
                                    <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl shadow-lg flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-white" />
                                    </div>
                                    <p className="text-sm font-black text-slate-900 pr-3 tracking-tight">Interview Ready</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. STATS & SOCIAL PROOF */}
            <section className="w-full relative py-20 overflow-hidden bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12 italic">Join thousands of students who dream big</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-24 opacity-20 hover:opacity-60 transition-opacity duration-700 grayscale">
                        <span className="text-2xl font-black text-slate-900 cursor-default">Google</span>
                        <span className="text-2xl font-black text-slate-900 cursor-default">Amazon</span>
                        <span className="text-2xl font-black text-slate-900 cursor-default">Meta</span>
                        <span className="text-2xl font-black text-slate-900 cursor-default">Microsoft</span>
                        <span className="text-2xl font-black text-slate-900 cursor-default">Netflix</span>
                    </div>
                </div>
            </section>

            {/* 3. FEATURES SECTION */}
            <section id="features" className="w-full py-40 relative overflow-hidden bg-white">
                <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-indigo-50/30 to-white -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto mb-24 relative">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-indigo-100 shadow-sm">
                            <Star className="w-3 h-3" /> Best Features
                        </div>
                        <h3 className="text-5xl md:text-8xl font-black text-slate-900 mb-10 tracking-[ -0.05em] leading-[0.9]">Unlock Your <br /> Potential.</h3>
                        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Modern tools built into one platform to give you the ultimate interview advantage.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            { title: 'AI Evaluation', icon: <BrainCircuit className="text-indigo-600 w-10 h-10" />, color: 'bg-indigo-50', border: 'hover:border-indigo-300', desc: 'Get deep technical feedback powered by the latest AI models.' },
                            { title: 'Real Proctoring', icon: <Video className="text-indigo-600 w-10 h-10" />, color: 'bg-indigo-50', border: 'hover:border-indigo-300', desc: 'Simulate the pressure of a real company interview with camera access.' },
                            { title: 'Smart Voice', icon: <Mic className="text-indigo-600 w-10 h-10" />, color: 'bg-indigo-50', border: 'hover:border-indigo-300', desc: 'Speak your answers naturally and let our AI analyze your communication.' },
                            { title: 'Fair Play', icon: <ShieldCheck className="text-indigo-600 w-10 h-10" />, color: 'bg-indigo-50', border: 'hover:border-indigo-300', desc: 'Advanced detection to ensure you get an honest evaluation of your skills.' },
                            { title: 'Growth Tracking', icon: <BarChart2 className="text-indigo-600 w-10 h-10" />, color: 'bg-indigo-50', border: 'hover:border-indigo-300', desc: 'Visualize your progress across different technical domains over time.' },
                            { title: '24/7 Access', icon: <Zap className="text-indigo-600 w-10 h-10" />, color: 'bg-indigo-50', border: 'hover:border-indigo-300', desc: 'Practice anytime, anywhere, at your own pace without needing a partner.' }
                        ].map((feature, idx) => (
                            <div key={idx} className={`group bg-white p-12 rounded-[3rem] border border-gray-100 shadow-[0_15px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_100px_rgba(0,0,0,0.1)] ${feature.border} transition-all duration-700 transform hover:-translate-y-4`}>
                                <div className={`w-24 h-24 ${feature.color} rounded-3xl flex items-center justify-center mb-12 shadow-inner group-hover:rotate-[15deg] transition-all duration-700`}>
                                    {feature.icon}
                                </div>
                                <h4 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{feature.title}</h4>
                                <p className="text-slate-500 font-medium text-lg leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. HOW IT WORKS SECTION */}
            <section id="how-it-works" className="w-full py-32 bg-gray-50 relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-bl from-indigo-100/80 to-purple-100/80 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
                                <Zap className="w-3 h-3" /> 4 Simple Steps
                            </div>
                            <h3 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">Easy to start. <br />Easy to finish.</h3>
                            <p className="text-lg text-gray-500 font-medium mb-12">No complicated setup. Just choose what you want to practice and start talking to the AI.</p>

                            <div className="space-y-10">
                                {[
                                    { num: '01', title: 'Choose your domain', text: 'Select from DSA, Web Dev, ML, HR, and more.' },
                                    { num: '02', title: 'Enter the strict environment', text: 'Allow camera & microphone permissions. The timer starts.' },
                                    { num: '03', title: 'Speak or type your answer', text: 'Face challenging questions and submit answers in your preferred format.' },
                                    { num: '04', title: 'Review your personalized report', text: 'Get instant feedback on clarity, technical depth, and overall performance.' }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-start group">
                                        <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-600 font-bold border border-primary-100 shadow-[0_4px_15px_rgba(0,0,0,0.05)] group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 text-xl">
                                            {step.num}
                                        </div>
                                        <div className="ml-6">
                                            <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{step.title}</h4>
                                            <p className="mt-2 text-gray-600 leading-relaxed">{step.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full animate-float-delayed">
                            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-[2rem] blur opacity-20 -z-10"></div>

                                <img src="/assets/video-mockup.png" alt="Interview Video Interface Mockup" className="w-full relative z-10 rounded-2xl shadow-sm border border-white/50" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. ABOUT US SECTION */}
            <section id="about-us" className="w-full py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-950"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

                {/* Glowing orbs */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-900 rounded-full blur-[120px] -z-0 opacity-50"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-900 rounded-full blur-[100px] -z-0 opacity-40"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-10 border border-slate-800 shadow-2xl animate-float">
                        <UserCheck className="w-10 h-10 text-indigo-400" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-10 text-white tracking-tighter leading-[1.1]">Helping students <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">get their dream job.</span></h2>
                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-16 font-medium max-w-3xl mx-auto">
                        Interviewing is hard. We built this tool to make it easy for everyone to practice and get high-quality feedback without any stress.
                    </p>
                    <div className="inline-block p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-[0_10px_40px_rgba(99,102,241,0.2)] hover:shadow-[0_10px_60px_rgba(99,102,241,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                        <Link to="/register" className="block bg-slate-950 hover:bg-black transition-colors px-12 py-6 rounded-3xl font-black text-white text-xs tracking-widest uppercase">Start Practice Today</Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Landing;
