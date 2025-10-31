// src/store/slices/userProgress/userProgressSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProgress } from '../../../types/user';
import { calculateLevel } from '../../../utils/gamification';

interface UserProgressState extends UserProgress {
  loading: boolean;
  error: string | null;
}

// Load from localStorage on init
const loadProgressFromStorage = (): UserProgress => {
  const stored = localStorage.getItem('focusquest_user_progress');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { level: 1, currentXP: 0, totalXP: 0 };
    }
  }
  return { level: 1, currentXP: 0, totalXP: 0 };
};

const initialState: UserProgressState = {
  ...loadProgressFromStorage(),
  loading: false,
  error: null,
};

const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {
    addXP: (state, action: PayloadAction<number>) => {
      const amount = action.payload;
      const newTotalXP = state.totalXP + amount;
      const newLevel = calculateLevel(newTotalXP);

      state.totalXP = newTotalXP;
      state.currentXP = state.currentXP + amount;
      state.level = newLevel;

      // Save to localStorage
      localStorage.setItem('focusquest_user_progress', JSON.stringify({
        level: state.level,
        currentXP: state.currentXP,
        totalXP: state.totalXP,
      }));
    },

    resetProgress: (state) => {
      state.level = 1;
      state.currentXP = 0;
      state.totalXP = 0;
      localStorage.removeItem('focusquest_user_progress');
    },

    // For loading saved progress
    setProgress: (state, action: PayloadAction<UserProgress>) => {
      state.level = action.payload.level;
      state.currentXP = action.payload.currentXP;
      state.totalXP = action.payload.totalXP;
    },
  },
});

export const { addXP, resetProgress, setProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;