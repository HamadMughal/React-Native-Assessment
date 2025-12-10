import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseApi } from './services/baseApi';
import authReducer from './slices/authSlice';
import fcmReducer from './slices/fcmSlice';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  version: 1,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    fcm: fcmReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

// Debug: Log state changes
store.subscribe(() => {
  const state = store.getState();
  console.log('🔄 Store updated:', {
    isAuthenticated: state.auth.isAuthenticated,
    hasToken: !!state.auth.token,
    hasUser: !!state.auth.user,
  });
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
