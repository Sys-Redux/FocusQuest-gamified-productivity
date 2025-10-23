export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    difficulty: 'easy' | 'medium' | 'hard';
    createdAt: Date;
    updatedAt: Date;
    dueDate?: Date;
    xpAwarded?: boolean; // Track if XP has been awarded for this task
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>;