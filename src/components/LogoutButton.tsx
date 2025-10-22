import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton: React.FC = () => {
    const { logout, isLoading } = useAuth0();


    return (
        <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            disabled={isLoading}
            className='bg-ctp-mauve hover:bg-ctp-mauve/80 text-ctp-base px-6 py-3 rounded-lg font-medium
                transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
            >
                {isLoading ? (
                    'Loading...'
                ) : (
                    <>
                        <span className='hidden sm:inline'>Log Out</span>
                        <span className='sm:hidden'>
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                            </svg>
                        </span>
                    </>
                )}
        </button>
    );
};