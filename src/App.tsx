// src/App.tsx (Update)

import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Auth0Guard } from "./components/Auth0Guard";
import { Callback } from "./pages/Callback";
import { HomePage } from "./pages/HomePage";

export const App: React.FC = () => {
    const { isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center gradient-bg-vibrant'>
                <div className='glass-strong p-8 rounded-xl'>
                    <p className='text-ctp-text'>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        // No more TaskProvider or UserProgressProvider!
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path='/dashboard' element={<Auth0Guard component={Dashboard} />} />
            <Route path="/callback" element={<Callback />} />
        </Routes>
    );
}

export default App;