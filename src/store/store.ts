// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasks/tasksSlice';
import userProgressReducer from './slices/userProgress/userProgressSlice';

// The store combines all your reducers (state slices)
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,        // State: state.tasks
    userProgress: userProgressReducer  // State: state.userProgress
  },
  // Middleware for serialization check (dates, functions, etc.)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths for date serialization warnings
        ignoredActions: ['tasks/addTask', 'tasks/updateTask'],
        ignoredPaths: ['tasks.tasks'],
      },
    }),
});

// TypeScript types for the store
// RootState = entire app state shape
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch = dispatch function type
export type AppDispatch = typeof store.dispatch;