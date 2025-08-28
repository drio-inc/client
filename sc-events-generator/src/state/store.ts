import { persistReducer } from "redux-persist";
import { rootApi } from "./services/apiService";

import { setupListeners } from "@reduxjs/toolkit/query";
import { PreloadedState, configureStore, combineReducers } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PURGE, PERSIST, REGISTER, REHYDRATE, persistStore } from "redux-persist";

import uiReducer from "./slices/uiSlice";
import eventReducer from "./slices/eventSlice";
import storage from "redux-persist/lib/storage";

const persistedEventConfig = {
  key: "events",
  storage: storage,
};

const persistedEventReducer = persistReducer(persistedEventConfig, eventReducer);

const rootReducer = combineReducers({
  ui: uiReducer,
  event: persistedEventReducer,
  [rootApi.reducerPath]: rootApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      const defaultMiddleware = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });
      return defaultMiddleware.concat(rootApi.middleware);
    },
  });

export const store = setupStore();

setupListeners(store.dispatch);

export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type ApplicationState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export const removePersistedState = async () => {
  await persistor.purge();
};
