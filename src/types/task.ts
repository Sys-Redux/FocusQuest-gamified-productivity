export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    updatedAt: Date;
    dueDate?: Date;
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>;