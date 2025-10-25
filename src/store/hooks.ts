import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Typed version of useDispatch - knows about thunks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Typed version of useSelector - autocompletes state shape
export const useAppSelector = useSelector.withTypes<RootState>();