import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from '../../index';
import { type Task } from '../../../types/task';

// Selector to get tasks state
export const selectTasksState = (state: RootState) => state.tasks;

export const selectAllTasks = createSelector(
    [selectTasksState],
    (tasksState) => tasksState.tasks
);

export const selectCompletedTasks = createSelector(
    [selectAllTasks],
    (tasks) => tasks.filter((t: Task) => t.completed)
);

export const selectPendingTasks = createSelector(
    [selectAllTasks],
    (tasks) => tasks.filter((t: Task) => !t.completed)
);

export const selectTaskById = (taskId: string) => createSelector(
    [selectAllTasks],
    (tasks) => tasks.find((t: Task) => t.id === taskId)
);

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