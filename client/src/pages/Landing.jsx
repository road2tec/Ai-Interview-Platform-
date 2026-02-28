import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Video, BarChart2, BrainCircuit, Mic, Lock, ShieldCheck, Zap, UserCheck, ArrowRight, PlayCircle, Star } from 'lucide-react';

const Landing = () => {
    return (
        <div className="bg-white flex flex-col items-center pt-20 overflow-hidden font-sans">

            {/* 1. HERO SECTION */}
            <section className="w-full relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
                {/* Stunning Gradient Background FX */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
                    <div className="absolute top-20 -left-20 w-[24rem] h-[24rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob [animation-delay:2s]"></div>
                    <div className="absolute -bottom-40 left-1/2 w-[30rem] h-[30rem] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob [animation-delay:4s]"></div>
                </div>

                <div className="lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start z-10 pt-10">
                    <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md text-primary-700 text-sm font-semibold mb-8 border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                        <Zap className="w-4 h-4 text-purple-500 animate-pulse" />
                        <span>The Premier AI Interview Platform</span>
                    </div>

                    <h1 className="animate-slide-up text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight max-w-2xl mb-6 leading-tight [animation-delay:200ms]">
                        Master Your Interviews with <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-500 to-pink-500 animate-gradient-x">
                            Unmatched AI Precision
                        </span>
                    </h1>

                    <p className="animate-slide-up text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed [animation-delay:400ms]">
                        Practice in a real-world, proctored environment. Get instantly evaluated on technical depth, clarity, and communication by our advanced GPT-powered engine.
                    </p>

                    <div className="animate-slide-up flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-10 [animation-delay:600ms]">
                        <Link to="/register" className="group flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold py-4 px-8 rounded-full shadow-xl hover:shadow-primary-500/25 hover:-translate-y-1 transition-all duration-300">
                            Start Practicing Now
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#how-it-works" className="flex items-center justify-center bg-white/50 backdrop-blur-sm text-gray-700 border border-gray-200 font-semibold py-4 px-8 rounded-full shadow-sm hover:bg-white transition-colors duration-300">
                            <PlayCircle className="w-5 h-5 mr-2 text-indigo-500" />
                            See How it Works
                        </a>
                    </div>
                </div>

                {/* Dashboard Preview Image Placeholder (Animated) */}
                <div className="lg:w-1/2 mt-16 lg:mt-0 relative z-10 animate-slide-up [animation-delay:800ms] lg:pl-10">
                    <div className="w-full relative animate-float">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-400/20 to-purple-400/20 rounded-3xl blur-2xl transform scale-105"></div>
                        <div className="w-full rounded-2xl bg-white/40 backdrop-blur-lg border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-3 relative transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img src="/assets/dashboard-mockup.png" alt="Interview AI Dashboard Mockup" className="w-full rounded-xl shadow-inner border border-white/50" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. STATS & SOCIAL PROOF */}
            <section className="w-full relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 animate-gradient-x"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <p className="text-center text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-8">Trusted by candidates who landed offers at</p>
                    <div className="flex flex-wrap justify-center gap-12 sm:gap-20 opacity-80 mix-blend-overlay">
                        <span className="text-2xl font-black text-white hover:opacity-100 transition-opacity cursor-default">Google</span>
                        <span className="text-2xl font-black text-white hover:opacity-100 transition-opacity cursor-default">Amazon</span>
                        <span className="text-2xl font-black text-white hover:opacity-100 transition-opacity cursor-default">Meta</span>
                        <span className="text-2xl font-black text-white hover:opacity-100 transition-opacity cursor-default">Microsoft</span>
                        <span className="text-2xl font-black text-white hover:opacity-100 transition-opacity cursor-default">Netflix</span>
                    </div>
                </div>
            </section>

            {/* 3. FEATURES SECTION */}
            <section id="features" className="w-full py-24 relative overflow-hidden bg-white">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-white -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 relative">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-widest mb-4">
                            <Star className="w-3 h-3" /> Core Features
                        </div>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Built for absolute success</h3>
                        <p className="text-xl text-gray-600">Our platform meticulously tracks your performance across various dimensions to ensure you are consistently improving.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Generative AI Evaluation', icon: <BrainCircuit className="text-purple-600 w-8 h-8" />, color: 'bg-purple-100/50', border: 'hover:border-purple-300', desc: 'Detailed, highly accurate feedback powered by GPT models assessing technical correctness and clarity.' },
                            { title: 'Voice & Video Proctored', icon: <Video className="text-blue-600 w-8 h-8" />, color: 'bg-blue-100/50', border: 'hover:border-blue-300', desc: 'We enable camera and microphone access to simulate the exact pressure of a live online interview.' },
                            { title: 'Speech to Text Engine', icon: <Mic className="text-emerald-600 w-8 h-8" />, color: 'bg-emerald-100/50', border: 'hover:border-emerald-300', desc: 'Answer questions verbally. Our system transcribes your speech accurately in real-time for AI grading.' },
                            { title: 'Anti-Cheat Mechanics', icon: <ShieldCheck className="text-rose-600 w-8 h-8" />, color: 'bg-rose-100/50', border: 'hover:border-rose-300', desc: 'Tab-switch detection and strict environment guidelines guarantee genuine evaluations and honest prep.' },
                            { title: 'Deep Analytics Dashboard', icon: <BarChart2 className="text-indigo-600 w-8 h-8" />, color: 'bg-indigo-100/50', border: 'hover:border-indigo-300', desc: 'Track your domain proficiencies with beautiful interactive charts to visualize your growth over time.' },
                            { title: 'Secure & Private', icon: <Lock className="text-slate-700 w-8 h-8" />, color: 'bg-slate-100', border: 'hover:border-slate-300', desc: 'Fully encrypted connections and JWT authenticated sessions keep your data and interview history private.' }
                        ].map((feature, idx) => (
                            <div key={idx} className={`group bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] ${feature.border} transition-all duration-300 transform hover:-translate-y-2`}>
                                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
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
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
                                <Zap className="w-3 h-3" /> Process
                            </div>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-sans">4 Simple Steps to Perfection</h3>
                            <p className="text-xl text-gray-600 mb-12">We removed all friction so you can focus entirely on your answers. From selecting your domain to reading your feedback, the process is seamless.</p>

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
                    <div className="w-20 h-20 bg-gray-800/80 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gray-700/50 shadow-2xl">
                        <UserCheck className="w-10 h-10 text-primary-400" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-white tracking-tight">Built by engineers, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">for engineers.</span></h2>
                    <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-12 font-medium">
                        We realized that technical interviews are fundamentally broken. They are highly stressful and hard to practice for without a peer.
                        InterviewAI was born out of the need to provide accessible, high-quality, and realistic interview simulations using the power of Generative AI.
                    </p>
                    <div className="inline-block p-[1px] bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                        <Link to="/register" className="block bg-gray-950 hover:bg-gray-900 transition-colors px-10 py-5 rounded-full font-bold text-white text-lg tracking-wide">Join Our Mission</Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Landing;
