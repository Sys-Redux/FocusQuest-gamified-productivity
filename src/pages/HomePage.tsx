import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { NavBar } from '../components/NavBar';
import dino from '../assets/dino.png';
import quest from '../assets/quest.png';
import phone from '../assets/phone.png';

export const HomePage: React.FC = () => {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();


    return (
        <>
            {/* Only show NavBar if user is logged in */}
            {isAuthenticated && <NavBar />}
            <main className='min-h-screen gradient-bg-vibrant text-ctp-text'>
                {/* Hero Section */}
                <section className='container mx-auto px-4 sm:px-6 lg:px-8 pt-32'>
                    <div className='text-center max-w-4xl mx-auto'>
                        {/* Hero Heading */}
                        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold mb-6
                            text-ctp-mauve drop-shadow-lg animate-fade-in'>
                            Level Up Your Productivity
                        </h1>
                        {/* Hero Subheading */}
                        <p className='text-xl sm:text-2xl text-subtext0 mb-8 leading-relaxed'>
                            Transform your tasks into epic quests. Stay focused, track progress, and conquer your goals with
                            <span className='text-ctp-pink font-semibold logo-gradient'> FocusQuest</span>.
                        </p>
                        {/* CTA Button */}
                        <button
                            onClick={() => navigate('/login')}
                            className='bg-ctp-mauve hover:bg-ctp-pink text-ctp-base px-8 py-4 rounded-xl
                                text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-ctp-mauve/50
                                hover:scale-115 active:scale-95'>
                                Start Your Quest
                            </button>
                    </div>
                </section>
                {/* Features Section */}
                <section className='container mx-auto px-4 sm:px-6 lg:px-8 py-20'>
                    <h2 className='text-4xl sm:text-5xl font-bold text-center text-ctp-lavender mb-16'>
                        Your Adventure Awaits
                    </h2>
                    {/* Features Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'>
                        {/* Feature 1: Gamified Tasks */}
                        <article className='glass-strong rounded-2xl p-8 hover:scale-105 transition-all duration-300
                            hover:border-ctp-mauve/60 group'>
                            <div className='mb-6 overflow-hidden rounded-xl'>
                                <img
                                    src={dino}
                                    alt='Gamified Task Management'
                                    className='w-full h-full object-cover group-hover:scale-110
                                        transition-transform duration-500'
                                />
                            </div>
                            <h3 className='text-2xl font-bold text-ctp-blue mb-4'>
                                Gamified Tasks
                            </h3>
                            <p className='text-ctp-subtext0 leading-relaxed'>
                                Turn mundane ✅ to-dos into exciting quests 🗡️. Earn rewards and level up as you
                                complete quests, increasing your IRL productivity while having fun!
                            </p>
                        </article>
                        {/* Feature 2: Track Your Progress */}
                        <article className='glass-strong rounded-2xl p-8 hover:scale-105 transition-all duration-300
                            hover:border-ctp-green/60 group'>
                            <div className='mb-6 overflow-hidden rounded-xl'>
                                <img
                                    src={quest}
                                    alt='Track Your Progress'
                                    className='w-full h-full object-cover group-hover:scale-110
                                        transition-transform duration-500'
                                />
                            </div>
                            <h3 className='text-2xl font-bold text-ctp-green mb-4'>
                                Track Your Progress
                            </h3>
                            <p className='text-ctp-subtext0 leading-relaxed'>
                                Watch your achievements 📈 grow with real-time stats 📊. See completed
                                quests, pending tasks, and celebrate 🎉 every victory!
                            </p>
                        </article>
                        {/* Feature 3: Stay Focused */}
                        <article className='glass-strong rounded-2xl p-8 hover:scale-105 transition-all duration-300
                            hover:border-ctp-pink/60 group'>
                            <div className='mb-6 overflow-hidden rounded-xl'>
                                <img
                                    src={phone}
                                    alt='Stay Focused'
                                    className='w-full h-full object-cover group-hover:scale-110
                                        transition-transform duration-500'
                                />
                            </div>
                            <h3 className='text-2xl font-bold text-ctp-pink mb-4'>
                                Stay Focused
                            </h3>
                            <p className='text-ctp-subtext0 leading-relaxed'>
                                FocusQuest is designed fully responsive 📱. Manage your quests from your
                                desktop, tablet, or mobile device, so you can stay productive wherever you go!
                            </p>
                        </article>
                    </div>
                </section>
                {/* Call to Action Section */}
                <section className='container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center'>
                    <div className='glass-strong rounded-2xl p-12 max-w-3xl mx-auto'>
                        <h2 className='text-4xl font-bold text-ctp-mauve mb-6'>
                            Ready to Embark on Your Journey?
                        </h2>
                        <p className='text-xl text-ctp-subtext0 mb-8'>
                            Join FocusQuest today and transform the way you tackle your tasks.
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className='bg-ctp-blue hover:bg-ctp-sapphire text-ctp-base px-10 py-4 rounded-xl
                                text-lg font-bold transition-all duration-300 shadow-2xl
                                hover:shadow-ctp-blue/50 hover:scale-115 active:scale-95'>
                            Get Started
                        </button>
                    </div>
                </section>
                {/* Footer */}
                <footer className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center'>
                    <p className='text-ctp-overlay0 text-sm'>
                        &copy; {new Date().getFullYear()} FocusQuest -- Sys-Redux Tech. All rights reserved.
                    </p>
                </footer>
            </main>
        </>
    );
};