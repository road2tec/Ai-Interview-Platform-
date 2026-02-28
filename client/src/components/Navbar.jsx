import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const isLanding = location.pathname === '/';

    const NavLinks = () => (
        <>
            {isLanding && (
                <>
                    <a href="#features" className="text-gray-600 hover:text-primary-600 px-4 py-2 rounded-full text-sm font-bold transition-all hover:bg-primary-50">Features</a>
                    <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 px-4 py-2 rounded-full text-sm font-bold transition-all hover:bg-primary-50">How it Works</a>
                    <a href="#about-us" className="text-gray-600 hover:text-primary-600 px-4 py-2 rounded-full text-sm font-bold transition-all hover:bg-primary-50">About Us</a>
                </>
            )}
        </>
    );

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ease-out ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-xl">I</span>
                            </div>
                            <span className="text-2xl font-black text-gray-900 tracking-tight">
                                Interview<span className="text-primary-600">AI</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        <NavLinks />
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        {token ? (
                            <>
                                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-full text-sm font-bold transition-all hover:bg-primary-50">Dashboard</Link>
                                <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-rose-600 px-4 py-2 rounded-full text-sm font-bold transition-all hover:bg-rose-50 border border-transparent hover:border-rose-100">
                                    <LogOut className="w-4 h-4 mr-1.5" /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-gray-100">Sign In</Link>
                                <Link to="/register" className="group flex items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-black hover:to-gray-900 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
                                    Get Started <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 hover:text-gray-900 p-2">
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-4 flex flex-col space-y-4">
                    <NavLinks />
                    <div className="h-px bg-gray-100 my-2 w-full"></div>
                    {token ? (
                        <>
                            <Link to="/dashboard" className="text-gray-600 font-semibold px-3 py-2">Dashboard</Link>
                            <button onClick={handleLogout} className="text-red-600 font-semibold px-3 py-2 flex items-center"><LogOut className="w-4 h-4 mr-2" /> Logout</button>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-3">
                            <Link to="/login" className="text-center text-gray-600 font-semibold py-2 border border-gray-200 rounded-lg">Sign In</Link>
                            <Link to="/register" className="text-center bg-primary-600 text-white font-semibold py-2 rounded-lg">Get Started Free</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
