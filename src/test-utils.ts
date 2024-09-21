// src/test-utils.ts
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootState } from '@/app/redux/store';

export function createMockStore(initialState: Partial<RootState> = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState as RootState
  });
}