// src/store/hooks.ts

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Typed version of useDispatch - knows about thunks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Typed version of useSelector - autocompletes state
export const useAppSelector = useSelector.withTypes<RootState>();