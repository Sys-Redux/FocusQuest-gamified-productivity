import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../features/tasks/taskSlice';
import userProgressReducer from '../features/userProgressReducer';

// The store combines all your reducers (state slices)
export const store = configureStore({
    reducer: {
        tasks: taskReducer, // State: state.tasks
        userProgress: userProgressReducer // State: state.userProgress
    },
    // Middleware for serialization check (dates, functions, etc.)
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for date serialization
                ignoredActions: ['tasks/addTask', 'tasks/updateTask'],
                ignoredPaths: ['tasks.tasks'],
            },
        }),
});

// TypeScript types for the store
// RootState = entire app state tree
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch = dispatch function type
export type AppDispatch = typeof store.dispatch;