// src/store/slices/userProgress/userProgressSelectors.ts

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { getLevelProgress } from '../../../utils/gamification';

export const selectUserProgress = (state: RootState) => state.userProgress;

export const selectLevel = (state: RootState) => state.userProgress.level;
export const selectCurrentXP = (state: RootState) => state.userProgress.currentXP;
export const selectTotalXP = (state: RootState) => state.userProgress.totalXP;

// Memoized selector for level progress calculation
export const selectLevelProgress = createSelector(
  [selectTotalXP],
  (totalXP) => getLevelProgress(totalXP)
);