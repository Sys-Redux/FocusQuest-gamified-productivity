import { useContext } from 'react';
import { UserProgressContext } from '../context/UserProgressContext';

export const useUserProgress = () => {
    const context = useContext(UserProgressContext);
    if (!context) {
        throw new Error('useUserProgress must be used within a UserProgressProvider');
    }
    return context;
}