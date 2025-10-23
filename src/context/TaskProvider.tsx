import { type ReactNode, useState } from 'react';
import { TaskContext, type TaskContextType } from './TaskContext';
import { type Task } from '../types/task';
import { useUserProgress } from '../hooks/useUserProgress';
import { calculateTaskXP } from '../utils/gamification';

// This will wrap its children with TaskContext.Provider
export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { addXP } = useUserProgress();

    const addTask = (task: Task) => {
        setTasks(prev => [...prev, task]);
    };

    const updateTask = (id: string, updatedTask: Partial<Task>) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, ...updatedTask, updatedAt: new Date() }
                    : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const toggleTaskComplete = (id: string) => {
        setTasks(prev =>
            prev.map(task => {
                if (task.id === id) {
                    const nowCompleted = !task.completed;

                    // Only award XP when completing AND XP hasn't been awarded yet
                    if (nowCompleted && !task.xpAwarded) {
                        const xpReward = calculateTaskXP(task.difficulty, task.priority);
                        addXP(xpReward);
                        alert(`Awarded ${xpReward} XP for completing task "${task.title}"`);
                        return { ...task, completed: nowCompleted, xpAwarded: true };
                    }

                    return { ...task, completed: nowCompleted };
                }
                return task;
            })
        );
    };

    // The value object contains the current tasks and the functions to manipulate them
    // This allows any component within the TaskProvider to access and modify tasks w/o prop drilling
    const value: TaskContextType = {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
    };


    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}