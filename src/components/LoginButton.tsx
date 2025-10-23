import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton: React.FC = () => {
    const { loginWithRedirect, isLoading } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: { returnTo: '/dashboard', },
            authorizationParams: { prompt: 'login' },
        });
    };

    return (
        <button
            onClick={() => handleLogin()}
            disabled={isLoading}
            className='bg-ctp-mauve/60 backdrop-blur-md border border-ctp-lavender px-6 py-3 rounded-lg
                hover:border-ctp-mauve/50 transition-all shadow-md text-ctp-text'
            >
                {isLoading ? 'Loading...' : 'Log In'}
            </button>
    );
};