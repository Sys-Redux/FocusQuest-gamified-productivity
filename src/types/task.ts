export interface Task {
    id: string;
    user_id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    difficulty: 'easy' | 'medium' | 'hard';
    created_at: string;
    updated_at: string;
    completed_at: string | null;
    xp_awarded: boolean;
    due_date?: string | null; // ISO timestamp string
}

export type TaskFormData = Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'completed' | 'xp_awarded' | 'completed_at'>;