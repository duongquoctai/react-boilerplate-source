import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import apiSlice from './slices/apiSlice';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  }).concat([apiSlice.middleware])
});

export { store };
