import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ProfileModal } from '../pages/ProfileModal';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { useNavigate } from 'react-router-dom';

export const NavBar: React.FC = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll to apply glass effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            {/* Navbar Container */}
            <nav className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-300 ${
                isScrolled ? 'glass-nav-scrolled' : 'glass-nav'}`}>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        {/* Logo / Brand Name */}
                        <div className='flex items-center'>
                            <img
                                src='/focusquest-logo.svg'
                                alt='FocusQuest Logo'
                                className='h-8 w-8 sm:w-10 sm:h-10 drop-shadow-lg'
                            />
                            <h1 className='text-2xl sm:text-3xl font-bold text-ctp-mauve logo-gradient drop-shadow-lg'>
                                FocusQuest
                            </h1>
                        </div>

                        {/* Right Side Buttons */}
                        <div className='flex items-center gap-3'>
                            {isLoading ? (
                                <div className='text-ctp-subtext0 text-sm'>Loading...</div>
                            ) : isAuthenticated ? (
                                <>
                                    {/* Home Button */}
                                    <button
                                        onClick={() => navigate('/')}
                                        className='bg-ctp-surface0/60 backdrop-blur-md
                                            border border-ctp-surface1/50 px-6 py-3 rounded-lg hover:border-ctp-mauve/50
                                            transition-all shadow-md text-ctp-text'
                                        aria-label='Go to Home'
                                    >
                                        Home
                                    </button>
                                    {/* Profile Button */}
                                    <button
                                        onClick={() => setIsProfileOpen(true)}
                                        className='flex items-center gap-2 bg-ctp-surface0/60 backdrop-blur-md
                                            border border-ctp-surface1/50 px-3 py-2.5 rounded-lg hover:border-ctp-mauve/50
                                            transition-all shadow-md'
                                        aria-label='View Profile'
                                    >
                                        {user?.picture ? (
                                            <img
                                                src={user.picture}
                                                alt={user.name}
                                                className='w-7 h-7 rounded-full border border-ctp-mauve object-cover'
                                            />
                                        ) : (
                                            <div className='w-7 h-7 rounded-full bg-ctp-mauve flex items-center justify-center
                                                text-ctp-base text-sm font-bold'>
                                                {user?.name?.[0]?.toUpperCase() || 'U'}
                                            </div>
                                        )}
                                        <span className='text-ctp-text text-sm font-medium hidden sm:inline'>
                                            Profile
                                        </span>
                                    </button>

                                    {/* Logout or Login Button */}
                                    <LogoutButton />
                                </>
                            ) : (
                                <LoginButton />
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Profile Modal */}
            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </>
    );
};