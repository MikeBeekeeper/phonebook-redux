import { combineReducers, configureStore } from '@reduxjs/toolkit';
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

const rootReducer = combineReducers({
    contacts: myContactsSlice.reducer,
    filter: myFilterSlice.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts']
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer)

// const persistedContactsReducer = persistReducer(
//   persistConfig,
//   myContactsSlice.reducer
// );
// const persistedFilterReducer = persistReducer(
//   persistConfig,
//   myFilterSlice.reducer
// );

export const store = configureStore({
  reducer: persistedRootReducer,
//   {
//     contacts: persistedContactsReducer,
//     filter: persistedFilterReducer,
//   },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);
