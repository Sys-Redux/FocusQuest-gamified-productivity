import { createContext } from 'react';
import { type Task } from '../types/task';

export interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (id: string, task: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    toggleTaskComplete: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);