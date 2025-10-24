import { createContext } from 'react';
import { type UserProgress } from '../types/user';

export interface UserProgressContextType {
    userProgress: UserProgress;
    addXP: (amount: number) => void;
    loading: boolean;
}

export const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);