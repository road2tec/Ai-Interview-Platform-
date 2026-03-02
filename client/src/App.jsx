import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StartInterview from './pages/StartInterview';
import InterviewScreen from './pages/InterviewScreen';
import Results from './pages/Results';

import InterviewChat from './pages/InterviewChat';

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const location = useLocation();
    const hideNav = ['/chat', '/interview'].includes(location.pathname);
    const hideFooter = ['/chat', '/interview', '/login', '/register'].includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col">
            {!hideNav && <Navbar />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/start-interview" element={<StartInterview />} />
                    <Route path="/interview" element={<InterviewScreen />} />
                    <Route path="/chat" element={<InterviewChat />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/results/:id" element={<Results />} />
                </Routes>
            </main>
            {!hideFooter && <Footer />}
        </div>
    );
}

export default App;
