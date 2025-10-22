import { useAuth0 } from "@auth0/auth0-react";
import type { JSX } from "react";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps): JSX.Element | null => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    if (!isOpen || !isAuthenticated) {
        return null;
    }

    getAccessTokenSilently().then(token => {
        console.log("Access Token:", token);
    }).catch(err => {
        console.error("Error getting access token:", err);
    });


    return (
        <main
            className='fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm'
            onClick={onClose}
        >
            <div
                className='glass-strong rounded-t-2xl sm:rounded-xl w-full sm:max-w-lg
                shadow-2xl max-h-[90vh] overflow-y-auto'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <header className='flex justify-between items-center p-4 sm:p-6 border-b border-ctp-surface1/50 sticky
                    top-0 bg-ctp-surface0/90 backdrop-blur-xl z-10'>
                    <h2 className='text-xl sm:text-2xl font-bold text-ctp-mauve'>
                        Worthy Adventurer
                    </h2>
                    <button
                        onClick={onClose}
                        className='text-ctp-subtext0 hover:text-ctp-text transition-colors p-2 m-2'
                        aria-label='Close Profile Modal'
                    >
                        <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </header>

                {/* Modal Content */}
                <div className='p-4 sm:p-6'>
                    {isLoading ? (
                        <div className='text-center py-8'>
                            <p className='text-ctp-text'>Loading profile...</p>
                        </div>
                    ) : (
                        <>
                            {/* User Avatar & Name */}
                            <section className='flex items-center gap-4 mb-6'>
                                {user?.picture && (
                                    <img
                                        src={user.picture}
                                        alt={user.name}
                                        className='w-20 h-20 rounded-full border-2 border-ctp-mauve shadow-lg'
                                    />
                                )}
                                <div>
                                    <h3 className='text-xl font-bold text-ctp-text'>{user?.name}</h3>
                                    <p className='text-ctp-subtext0 text-sm'>{user?.email}</p>
                                </div>
                            </section>

                            {/* Profile Details */}
                            <section className='space-y-3'>
                                <article className='bg-ctp-mantle/60 backdrop-blur-md border border-ctp-surface2/50
                                    rounded-lg p-4'>
                                    <p className='text-xs text-ctp-overlay0 mb-1'>User ID</p>
                                    <p className='text-ctp-text font-mono text-sm break-all'>{user?.sub}</p>
                                </article>
                                <article className='bg-ctp-mantle/60 backdrop-blur-md border border-ctp-surface2/50
                                    rounded-lg p-4'>
                                    <p className='text-xs text-ctp-overlay0 mb-1'>Nickname</p>
                                    <p className='text-ctp-text'>{user?.nickname || 'Adventurer'}</p>
                                </article>
                                <article className='bg-ctp-mantle/60 backdrop-blur-md border border-ctp-surface2/50
                                    rounded-lg p-4'>
                                    <p className='text-xs text-ctp-overlay0 mb-1'>Email Verified</p>
                                    <p className='text-ctp-text'>
                                        {user?.email_verified ? (
                                            <span className='text-ctp-green'>✅ Verified</span>
                                        ) : (
                                            <span className='text-ctp-red'>❌ Not Verified</span>
                                        )}
                                    </p>
                                </article>
                            </section>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className='w-full mt-6 px-4 py-2.5 bg-ctp-surface1/60 backdrop-blur-md text-ctp-text
                                    rounded-lg font-medium hover:bg-ctp-surface2/60 transition-colors'
                            >
                                Close
                            </button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};