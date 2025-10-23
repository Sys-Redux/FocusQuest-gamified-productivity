import { useState, useEffect, type ReactNode } from 'react';
import { UserProgressContext } from './UserProgressContext';
import { type UserProgress } from '../types/user';
import { calculateLevel } from '../utils/gamification';

interface UserProgressProviderProps {
    children: ReactNode;
}

const STORAGE_KEY = 'focusquest_user_progress';

export const UserProgressProvider = ({ children }: UserProgressProviderProps) => {
    const [userProgress, setUserProgress] = useState<UserProgress>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                level: parsed.level,
                currentXP: parsed.currentXP,
                totalXP: parsed.totalXP,
            };
        }
        return { level: 1, currentXP: 0, totalXP: 0 };
    });

    // Save to local storage when progress changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    }, [userProgress]);

    const addXP = (amount: number) => {
        setUserProgress(prev => {
            const newTotalXP = prev.totalXP + amount;
            const newLevel = calculateLevel(newTotalXP);

            return {
                level: newLevel,
                currentXP: prev.currentXP + amount,
                totalXP: newTotalXP,
            };
        });
    };

    const resetProgress = () => {
        setUserProgress({ level: 1, currentXP: 0, totalXP: 0 });
    };

    return (
        <UserProgressContext.Provider value={{ userProgress, addXP, resetProgress }}>
            {children}
        </UserProgressContext.Provider>
    );
};
