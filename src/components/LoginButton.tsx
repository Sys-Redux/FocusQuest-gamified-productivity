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
            className='bg-ctp-mauve hover:bg-ctp-mauve/80 text-ctp-base px-6 py-3 rounded-lg font-medium
                transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
            >
                {isLoading ? 'Loading...' : 'Log In'}
            </button>
    );
};