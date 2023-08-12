import { rootApi } from "./services/apiService";
import storage from "redux-persist/lib/storage";

import {
  PreloadedState,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";

import { setupListeners } from "@reduxjs/toolkit/query";
import storageSession from "redux-persist/lib/storage/session";

import uiReducer from "./slices/uiSlice";
import DDXSlice from "./slices/DDXSlice";
import authReducer from "./slices/authSlice";
import accountReducer from "./slices/accountSlice";
import orgUnitReducer from "./slices/orgUnitSlice";
import licensingReducer from "./slices/licensingSlice";

const persistConfig = {
  key: "auth",
  storage: storageSession,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  DDX: DDXSlice,
  ui: uiReducer,
  auth: authReducer,
  account: accountReducer,
  orgUnit: orgUnitReducer,
  licensing: licensingReducer,
  [rootApi.reducerPath]: rootApi.reducer,
});

// export const store = configureStore({
//   reducer: {
//     DDX: DDXSlice,
//     ui: uiReducer,
//     account: accountReducer,
//     orgUnit: orgUnitReducer,
//     auth: persistedAuthReducer,
//     licensing: licensingReducer,
//     [rootApi.reducerPath]: rootApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(rootApi.middleware),
// });

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
