import { createContext } from 'react';
import { type Task } from '../types/task';

export interface TaskContextType {
    tasks: Task[];
    addTask: (task: { title: string; description: string; priority: 'low' | 'medium' | 'high'; difficulty: 'easy' | 'medium' | 'hard'; due_date?: string }) => Promise<void>;
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    toggleTaskComplete: (id: string) => Promise<void>;
    loading: boolean;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);