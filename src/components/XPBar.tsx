// src/components/XPBar.tsx

import { useUserProgress } from '../hooks/useUserProgress';
import { getLevelProgress } from '../utils/gamification';

export function XPBar() {
    const { userProgress } = useUserProgress();
    const { level, currentXP, xpForNextLevel, progress } = getLevelProgress(userProgress.totalXP);

    return (
        <div className='glass-strong rounded-xl p-4 sm:p-6 shadow-lg'>
            {/* Level Display */}
            <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-ctp-mauve to-ctp-pink
                        flex items-center justify-center shadow-lg'>
                        <span className='text-ctp-base font-bold text-lg'>{level}</span>
                    </div>
                    <div>
                        <h3 className='text-sm font-medium text-ctp-subtext0'>Level {level}</h3>
                        <p className='text-xs text-ctp-overlay0'>
                            {currentXP} / {xpForNextLevel} XP
                        </p>
                    </div>
                </div>
                <div className='text-right'>
                    <p className='text-xs text-ctp-overlay0'>Total XP</p>
                    <p className='text-sm font-bold text-ctp-mauve'>{userProgress.totalXP}</p>
                </div>
            </div>

            {/* XP Progress Bar */}
            <div className='relative w-full h-3 bg-ctp-surface0 rounded-full overflow-hidden'>
                <div
                    className='absolute top-0 left-0 h-full bg-gradient-to-r from-ctp-blue via-ctp-mauve to-ctp-pink
                        transition-all duration-500 ease-out'
                    style={{ width: `${progress}%` }}
                />
                {/* Glow effect */}
                <div
                    className='absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                        animate-shimmer'
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Next Level Text */}
            <p className='text-xs text-center text-ctp-subtext0 mt-2'>
                {xpForNextLevel - currentXP} XP until Level {level + 1}
            </p>
        </div>
    );
}