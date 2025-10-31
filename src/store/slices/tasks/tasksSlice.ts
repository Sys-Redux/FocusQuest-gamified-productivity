// src/store/slices/tasks/tasksSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../../../types/task';
import type { AppDispatch, RootState } from '../../store';
import { addXP } from '../userProgress/userProgressSlice';
import { calculateTaskXP } from '../../../utils/gamification';

// Define the shape of this slice's state
interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Initial state when app loads
const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// Create the slice
const tasksSlice = createSlice({
  name: 'tasks',  // Prefix for action types
  initialState,
  reducers: {
    // Reducer functions - handle state updates
    // RTK uses Immer so you can "mutate" state directly

    addTask: (state, action: PayloadAction<Task>) => {
      // Just push - Immer makes it immutable behind the scenes
      state.tasks.push(action.payload);
    },

    updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        // "Mutate" the task - Immer handles immutability
        Object.assign(task, updates, { updatedAt: new Date() });
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      // Filter out the task with matching id
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },

    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    // Mark XP as awarded when task completed
    markXPAwarded: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.xpAwarded = true;
      }
    },
  },
});

// Thunk action to handle task completion with XP reward
// This is an async action that dispatches multiple synchronous actions
export const toggleTaskCompleteWithXP = (taskId: string) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const task = state.tasks.tasks.find(t => t.id === taskId);

    if (!task) return;

    // Toggle the task completion
    dispatch(toggleTaskComplete(taskId));

    // Award XP only when completing (not un-completing) and XP hasn't been awarded yet
    if (!task.completed && !task.xpAwarded) {
      const xpReward = calculateTaskXP(task.difficulty, task.priority);
      dispatch(addXP(xpReward));
      dispatch(markXPAwarded(taskId));

      // Optional: Show notification (you can remove this if you don't want alerts)
      alert(`🎉 Quest Complete! +${xpReward} XP`);
    }
  };
};

// Export actions - these are action creators
// Usage: dispatch(addTask(newTask))
export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  markXPAwarded,
} = tasksSlice.actions;

// Export reducer - goes into store
export default tasksSlice.reducer;