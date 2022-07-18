import { combineReducers } from 'redux';
import darkModeReducer from './slices/dark-mode';
import userReducer from './slices/user';
import authReducer from './slices/auth';
import apiSlice from './slices/apiSlice';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  keyPrefix: 'redux-',
  version: 1,
  whitelist: ['theme']
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  theme: darkModeReducer,
  user: userReducer,
  auth: authReducer,
});

export { rootReducer };
