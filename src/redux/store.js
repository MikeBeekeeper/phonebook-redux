import { configureStore } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage';

import { myContactsSlice, myFilterSlice } from '../redux/slice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedContactsReducer = persistReducer(
  persistConfig,
  myContactsSlice.reducer
);
const persistedFilterReducer = persistReducer(
  persistConfig,
  myFilterSlice.reducer
);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filter: persistedFilterReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);
