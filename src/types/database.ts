export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    auth0_id: string
                    email: string | null
                    name: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    auth0_id: string
                    email?: string | null
                    name?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    auth0_id?: string
                    email?: string | null
                    name?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            user_progress: {
                Row: {
                    id: string
                    user_id: string
                    current_xp: number
                    total_xp: number
                    level: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    current_xp?: number
                    total_xp?: number
                    level?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    current_xp?: number
                    total_xp?: number
                    level?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            tasks: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    description: string | null
                    priority: 'low' | 'medium' | 'high'
                    difficulty: 'easy' | 'medium' | 'hard'
                    completed: boolean
                    xp_awarded: boolean
                    created_at: string
                    updated_at: string
                    due_date: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    description?: string | null
                    priority: 'low' | 'medium' | 'high'
                    difficulty: 'easy' | 'medium' | 'hard'
                    completed?: boolean
                    xp_awarded?: boolean
                    created_at?: string
                    updated_at?: string
                    completed_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    description?: string | null
                    priority?: 'low' | 'medium' | 'high'
                    difficulty?: 'easy' | 'medium' | 'hard'
                    completed?: boolean
                    xp_awarded?: boolean
                    created_at?: string
                    updated_at?: string
                    due_date?: string | null
                }
            }
        }
    }
}