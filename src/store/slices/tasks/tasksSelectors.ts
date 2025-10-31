// src/store/slices/tasks/tasksSelectors.ts

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Basic selector - just returns tasks array
export const selectAllTasks = (state: RootState) => state.tasks.tasks;

// Memoized selector - only recalculates when tasks change
export const selectCompletedTasks = createSelector(
  [selectAllTasks],  // Input selectors
  (tasks) => tasks.filter(t => t.completed)  // Calculation
);

export const selectPendingTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter(t => !t.completed)
);

// Selector with parameters - returns a function
export const selectTaskById = (taskId: string) =>
  createSelector(
    [selectAllTasks],
    (tasks) => tasks.find(t => t.id === taskId)
  );

// Computed statistics
export const selectTaskStats = createSelector(
  [selectAllTasks, selectCompletedTasks, selectPendingTasks],
  (all, completed, pending) => ({
    total: all.length,
    completed: completed.length,
    pending: pending.length,
    completionRate: all.length > 0
      ? Math.round((completed.length / all.length) * 100)
      : 0,
  })
);