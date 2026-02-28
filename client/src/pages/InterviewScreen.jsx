import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { evaluateQuestion, sendAlert, endSession as endSessionAPI } from '../services/api';
import { Mic, MicOff, Send, Clock, AlertTriangle, ShieldAlert, Monitor, Type, Video, Activity } from 'lucide-react';

const InterviewScreen = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);

    const [interviewData, setInterviewData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answerText, setAnswerText] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [loadingEval, setLoadingEval] = useState(false);
    const [evaluations, setEvaluations] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [audioLevel, setAudioLevel] = useState(0);

    const recognitionRef = useRef(null);

    useEffect(() => {
        const data = localStorage.getItem('currentInterview');
        if (!data) return navigate('/dashboard');

        const parsed = JSON.parse(data);
        setInterviewData(parsed);
        setTimeLeft(parsed.duration * 60);

        // Webcam init
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
            .catch(err => console.error("Webcam issue", err));

        // Tab proctoring
        const handleVisibilityChange = () => {
            if (document.hidden) {
                triggerAlert('Warning: Tab switch detected. Focus lost.');
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Speech recognition init
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.onresult = (e) => {
                let transcript = '';
                for (let i = 0; i < e.results.length; i++) {
                    transcript += e.results[i][0].transcript;
                }
                setAnswerText(transcript);

                // Simulate audio level jumping when speaking
                setAudioLevel(Math.random() * 80 + 20);
                setTimeout(() => setAudioLevel(10), 200);
            };
        }

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            const stream = videoRef.current?.srcObject;
            if (stream) stream.getTracks().forEach(track => track.stop());
        };
    }, [navigate]);

    useEffect(() => {
        if (!interviewData) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) { clearInterval(timer); endSession(); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [interviewData]);

    const triggerAlert = (msg) => {
        setAlertMsg(msg);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
        if (interviewData) {
            sendAlert({ interviewId: interviewData.sessionId, message: msg }).catch(e => console.error(e));
        }
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setAudioLevel(0);
        } else {
            recognitionRef.current?.start();
            setAudioLevel(15);
        }
        setIsListening(!isListening);
    };

    const submitAnswer = async () => {
        setLoadingEval(true);
        const question = interviewData.questions[currentIndex];

        try {
            const res = await evaluateQuestion({
                interviewId: interviewData.sessionId,
                questionId: question._id,
                question: question.question,
                userAnswer: answerText
            });

            const newTotalEvaluations = [...evaluations, { question: question.question, result: res.data.evaluation }];
            setEvaluations(newTotalEvaluations);

            // Next question or end
            if (currentIndex < interviewData.questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setAnswerText('');
                if (isListening) toggleListening();
            } else {
                // If it's the last question, we must pass the accumulated evaluations to endSession
                await endSession(newTotalEvaluations);
            }
        } catch (err) {
            alert('Failed to submit answer');
        } finally {
            setLoadingEval(false);
        }
    };

    // Modified endSession to accept evaluations array as parameter
    const endSession = async (finalEvaluations = evaluations) => {
        try {
            await endSessionAPI({ interviewId: interviewData.sessionId });
            localStorage.setItem('interviewResults', JSON.stringify(finalEvaluations));
            navigate('/results');
        } catch (err) {
            alert('Error ending session');
        }
    };

    if (!interviewData) return null;

    if (!interviewData.questions || interviewData.questions.length === 0) {
        return (
            <div className="bg-[#0f1115] min-h-[calc(100vh-4rem)] p-4 md:p-8 flex flex-col justify-center items-center">
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                    <ShieldAlert className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-3">No Questions Available</h2>
                <p className="text-gray-400 text-center max-w-md mb-8 leading-relaxed">
                    There are no questions in the system for this specific domain yet. Please try another domain or contact the administrator to add questions.
                </p>
                <button onClick={() => navigate('/dashboard')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                    Return to Dashboard
                </button>
            </div>
        );
    }

    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    return (
        <div className="bg-[#0f1115] min-h-[calc(100vh-4rem)] p-4 md:p-8 relative pt-20">
            {showAlert && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-rose-600/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(225,29,72,0.4)] z-50 flex items-center animate-slide-up border border-rose-500/50">
                    <ShieldAlert className="w-6 h-6 mr-3 animate-pulse" />
                    <span className="font-bold tracking-wide">{alertMsg}</span>
                </div>
            )}

            <div className="max-w-[1400px] mx-auto h-[80vh] flex flex-col lg:flex-row gap-6">

                {/* Left Panel: Camera & Question */}
                <div className="w-full lg:w-[40%] flex flex-col gap-6 h-full">

                    {/* User Camera Feed */}
                    <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800 h-[45%] lg:h-[50%] group">
                        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1]"></video>

                        {/* Camera Overlays */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-700/50 flex items-center">
                                <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                                <span className="text-white text-xs font-bold tracking-widest">LIVE</span>
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl text-white border border-gray-700/50">
                                <div className="text-xs text-gray-400 font-bold tracking-wider mb-1 flex items-center"><Monitor className="w-3 h-3 mr-1" />Candidate Feed</div>
                                <div className="font-medium text-sm">System Proctored Env</div>
                            </div>

                            {/* Visualizer for mic */}
                            {isListening && (
                                <div className="flex items-end gap-1 h-8 px-3 py-2 bg-black/50 backdrop-blur-md rounded-xl border border-gray-700/50">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-1.5 bg-indigo-500 rounded-full animate-pulse transition-all duration-100" style={{ height: `${Math.max(20, audioLevel * (Math.random() * 0.5 + 0.5))}%` }}></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="flex-1 bg-[#1a1c23] rounded-3xl p-8 border border-gray-800 shadow-2xl flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-0"></div>

                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <div className="inline-flex items-center bg-gray-800/80 border border-gray-700 px-4 py-2 rounded-full">
                                <Activity className="w-4 h-4 text-indigo-400 mr-2" />
                                <span className="text-gray-300 text-sm font-bold tracking-wider uppercase">Question {currentIndex + 1} of {interviewData.questions.length}</span>
                            </div>
                            <div className={`flex items-center px-4 py-2 rounded-full border font-bold ${timeLeft < 120 ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                                <Clock className="w-4 h-4 mr-2" />
                                {mins}:{secs < 10 ? '0' : ''}{secs}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-wide">
                                {interviewData.questions[currentIndex].question}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Answer Area */}
                <div className="flex-1 bg-[#1a1c23] rounded-3xl border border-gray-800 shadow-xl flex flex-col relative overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-800/80 flex items-center gap-3 bg-[#1e2129]">
                        <div className="p-2 bg-indigo-500/20 rounded-lg"><Type className="w-5 h-5 text-indigo-400" /></div>
                        <h2 className="text-lg font-bold text-white tracking-wide">Your Response</h2>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 p-8 flex flex-col">
                        <textarea
                            className="flex-1 w-full bg-[#0f1115] border border-gray-800 rounded-2xl p-6 text-gray-200 text-lg focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none resize-none shadow-inner placeholder-gray-600 custom-scrollbar leading-relaxed"
                            placeholder="Type your answer here, or click 'Speak Answer' to transcribe your voice..."
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Controls Footer */}
                    <div className="px-8 py-6 bg-[#1e2129] border-t border-gray-800/80 flex flex-col sm:flex-row gap-4 items-center justify-between">

                        <button
                            onClick={toggleListening}
                            className={`w-full sm:w-auto flex items-center justify-center px-6 py-4 rounded-xl font-bold transition-all duration-300 border ${isListening
                                ? 'bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                                : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            {isListening ? (
                                <><MicOff className="w-5 h-5 mr-3 animate-pulse" /> Stop Transcription</>
                            ) : (
                                <><Mic className="w-5 h-5 mr-3" /> Voice Answer</>
                            )}
                        </button>

                        <button
                            onClick={submitAnswer}
                            disabled={loadingEval || !answerText.trim()}
                            className="w-full sm:w-auto relative group overflow-hidden flex items-center justify-center bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:hover:shadow-none transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center">
                                {loadingEval ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                        Analyzing Response...
                                    </>
                                ) : (
                                    <>
                                        Submit Answer <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                            {!loadingEval && !(!answerText.trim()) && (
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0"></div>
                            )}
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default InterviewScreen;
