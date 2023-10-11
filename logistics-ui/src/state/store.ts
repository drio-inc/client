import { rootApi } from "./services/apiService";

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
} from "redux-persist";

import { setupListeners } from "@reduxjs/toolkit/query";

import uiReducer from "./slices/uiSlice";
import quotesReducer from "./slices/quotesSlice";
import productsReducer from "./slices/productsSlice";
import shimpentReducer from "./slices/shipmentSlice";
import trackingReducer from "./slices/trackingSlice";

const rootReducer = combineReducers({
  ui: uiReducer,
  quotes: quotesReducer,
  shipment: shimpentReducer,
  products: productsReducer,
  tracking: trackingReducer,
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
