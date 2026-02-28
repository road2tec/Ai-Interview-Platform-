import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-950 pt-16 pb-8 border-t border-gray-900 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-bold text-white mb-4 block">
                            Interview<span className="text-primary-500">AI</span>
                        </span>
                        <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
                            Empowering developers and professionals with AI-driven mock interviews, real-time feedback, and advanced performance analytics to land their dream jobs.
                        </p>
                        <div className="flex space-x-5">
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">Product</h3>
                        <ul className="space-y-3">
                            <li><a href="/#features" className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium">Features</a></li>
                            <li><a href="/#how-it-works" className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium">How it Works</a></li>
                            <li><a href="/register" className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium">Start Practicing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">Company</h3>
                        <ul className="space-y-3">
                            <li><a href="/#about-us" className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} InterviewAI. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex items-center text-gray-500 text-sm">
                        Crafted with <Heart className="w-4 h-4 text-red-500 mx-1.5 fill-current" /> by the InterviewAI Team
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
