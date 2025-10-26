import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Task } from '../../../types/task';

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
};

const tasksSlice = createSlice({
    name: 'tasks', // Prefix for action types
    initialState,
    reducers: {
        // RTK uses Immer.js so you can mutate state directly
        addTask: (state, action: PayloadAction<Task>) => {
            // Just push - Immer makes it immutable under the hood
            state.tasks.push(action.payload);
        },

        updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
            const { id, updates } = action.payload;
            const task = state.tasks.find(t => t.id === id);
            if (task) {
                // Mutate the task
                Object.assign(task, updates, { updatedAt: new Date() });
            }
        },

        deleteTask: (state, action: PayloadAction<string>) => {
            // Filter out the task to delete
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },

        toggleTaskComplete: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },

        markXPAwarded: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) {
                task.xpAwarded = true;
            }
        },
    },
});

export const {
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    markXPAwarded,
} = tasksSlice.actions;

export default tasksSlice.reducer;