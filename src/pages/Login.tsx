import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/LoginButton";
import { Navigate } from "react-router-dom";

// Implicit typing
export const Login: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center gradient-bg-vibrant'>
                <div className='glass-strong p-8 rounded-xl'>
                    <p className='text-ctp-text'>Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect authenticated users to the dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }


    return (
        <main className='min-h-screen gradient-bg-vibrant text-ctp-text flex items-center justify-center'>
            <div className='glass-strong rounded-xl p-8 sm:p-12 max-w-md text-center'>
                <h1 className='text-4xl font-bold text-ctp-mauve mb-4 drop-shadow-lg'>
                    Welcome to FocusQuest
                </h1>
                <p className='text-ctp-subtext0 mb-8'>
                    Gamified Productivity Tasking to help you stay focused and motivated
                </p>
                <LoginButton />
                <p className='text-xs text-ctp-overlay0 mt-6'>
                    Secure authentication powered by Auth0
                </p>
            </div>
        </main>
    );
};